# Ubuntu 服务器部署指南 (Next.js 项目)

本文档将指导您如何在 Ubuntu 服务器上从零开始部署当前的“数字工会” (Digital Union) Next.js 应用程序。

## 1. 环境准备

首先，确保您的 Ubuntu 服务器已更新并安装了必要的依赖项。

### 1.1 更新系统包
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 安装 Node.js 和 npm
推荐使用 Node.js 20.x 或更高版本（LTS）。我们将使用 NodeSource 仓库来安装：

```bash
# 安装 curl
sudo apt install curl -y

# 添加 Node.js 20.x 仓库
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# 安装 Node.js
sudo apt install -y nodejs

# 验证安装
node -v
npm -v
```

### 1.3 安装 Git
如果您的代码托管在 GitHub 等平台上，需要使用 Git 来拉取代码：
```bash
sudo apt install git -y
```

### 1.4 安装 PM2 (进程管理器)
PM2 用于在后台运行 Next.js 应用，并在服务器重启或应用崩溃时自动重启应用。
```bash
sudo npm install -g pm2
```

### 1.5 安装 Nginx (反向代理)
Nginx 将用于接收外部 HTTP/HTTPS 请求，并将其转发到本地运行的 Next.js 应用。
```bash
sudo apt install nginx -y
```

---

## 2. 获取代码并安装依赖

### 2.1 获取代码
您可以将代码克隆到 `/var/www` 目录下（假设您的项目名为 `d-union`）：

```bash
cd /var/www
# 如果代码在 GitHub 上，请替换为您的仓库地址
sudo git clone https://github.com/zxyuetest/D-Union.git d-union

# 进入项目目录
cd d-union

# 更改目录权限（将 ubuntu 替换为您的实际用户名）
sudo chown -R $USER:$USER /var/www/d-union
```

*(如果代码不在 Git 上，您也可以通过 `scp` 或 `sftp` 将本地代码上传到服务器的 `/var/www/d-union` 目录中。)*

### 2.2 安装依赖
在项目根目录下运行：
```bash
npm install
```

---

## 3. 构建与运行项目

### 3.1 构建生产版本
Next.js 需要先构建出优化后的生产环境静态文件和服务器代码：
```bash
npm run build
```

### 3.2 使用 PM2 启动应用
构建完成后，使用 PM2 启动 Next.js 服务（默认运行在 3000 端口）：
```bash
pm2 start npm --name "d-union" -- start
```

### 3.3 配置 PM2 开机自启
为了让应用在服务器重启后自动运行：
```bash
pm2 startup
# 运行上一条命令后，终端会输出一行命令，请复制并执行那行命令（例如：sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu）

# 保存当前的 PM2 进程列表
pm2 save
```

---

## 4. 配置 Nginx 反向代理

为了让用户可以通过域名（或 80 端口）访问您的应用，需要配置 Nginx。

### 4.1 创建 Nginx 配置文件
```bash
sudo nano /etc/nginx/sites-available/d-union
```

在文件中粘贴以下内容（请将 `your_domain.com` 替换为您的实际域名或服务器 IP）：

```nginx
server {
    listen 80;
    server_name your_domain.com; # 替换为您的域名或 IP

    location / {
        proxy_pass http://localhost:3000; # 转发到 Next.js 默认端口
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # 传递真实 IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
保存并退出 (`Ctrl+O`, `Enter`, `Ctrl+X`)。

### 4.2 启用配置并重启 Nginx
```bash
# 创建软链接启用配置
sudo ln -s /etc/nginx/sites-available/d-union /etc/nginx/sites-enabled/

# 测试 Nginx 配置是否正确
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

---

## 5. 常见维护命令

- **查看应用日志**: `pm2 logs d-union`
- **重启应用**: `pm2 restart d-union`
- **停止应用**: `pm2 stop d-union`
- **更新代码并重新部署**:
  ```bash
  cd /var/www/d-union
  git pull
  npm install
  npm run build
  pm2 restart d-union
  ```

## 6. (可选) 配置 HTTPS
如果您有域名，强烈建议使用 Let's Encrypt 配置免费的 HTTPS 证书：
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your_domain.com
```
按照提示完成配置即可，Certbot 会自动修改 Nginx 配置以支持 HTTPS 并设置自动续期。
