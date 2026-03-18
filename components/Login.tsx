"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, ArrowRight, ShieldCheck, Users, ChevronLeft, CheckCircle2 } from 'lucide-react';

export type UserType = {
  id: string;
  name: string;
  role: 'member' | 'leader';
  unionName: string;
  branchName: string;
};

export default function Login({ onLogin }: { onLogin: (user: UserType) => void }) {
  const [view, setView] = useState<'login' | 'register' | 'success'>('login');
  const [username, setUsername] = useState('leader');
  const [password, setPassword] = useState('123456');

  // Registration form state
  const [regForm, setRegForm] = useState({
    name: '',
    gender: '男',
    phone: '',
    idCard: '',
    union: '',
    department: '',
    position: '',
    education: '本科',
    politicalStatus: '群众'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'leader') {
      onLogin({ id: 'u1', name: '王建国', role: 'leader', unionName: '星火科技集团工会委员会', branchName: '工会主席办' });
    } else {
      onLogin({ id: 'u2', name: '李明', role: 'member', unionName: '星火科技集团工会委员会', branchName: '研发中心第一分工会' });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone || !regForm.union || !regForm.department) {
      alert('请填写必填项');
      return;
    }
    setView('success');
  };

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <AnimatePresence mode="wait">
        {view === 'login' && (
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            <div className="bg-gray-50 p-8 text-center border-b border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <ShieldCheck className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-wider">数字工会</h1>
              <p className="text-sm text-gray-500 mt-2">欢迎登录工会服务平台</p>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">账号</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none"
                      placeholder="请输入账号"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">密码</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none"
                      placeholder="请输入密码"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 active:scale-[0.98] transition-all"
                >
                  登录 <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className="w-full flex items-center justify-center py-3.5 px-4 border border-red-200 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 active:scale-[0.98] transition-all"
                >
                  注册新会员
                </button>
              </div>

              {/* Test Accounts Info */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h3 className="text-xs font-bold text-blue-800 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-1" /> 测试账号 (点击切换)
                </h3>
                <div className="space-y-2">
                  <button 
                    type="button"
                    onClick={() => { setUsername('leader'); setPassword('123456'); }}
                    className={`w-full text-left text-xs p-2 rounded-lg transition-colors ${username === 'leader' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-600 hover:bg-white'}`}
                  >
                    👑 领导账号: leader / 123456
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setUsername('member'); setPassword('123456'); }}
                    className={`w-full text-left text-xs p-2 rounded-lg transition-colors ${username === 'member' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-600 hover:bg-white'}`}
                  >
                    👤 会员账号: member / 123456
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {view === 'register' && (
          <motion.div 
            key="register"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center sticky top-0 z-20">
              <button onClick={() => setView('login')} className="p-2 -ml-2 text-gray-500 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-200">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold text-gray-800 ml-2">会员注册</h1>
            </div>

            <div className="overflow-y-auto p-6">
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">姓名 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={regForm.name}
                      onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                      className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none"
                      placeholder="请输入姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">性别</label>
                    <select
                      value={regForm.gender}
                      onChange={(e) => setRegForm({...regForm, gender: e.target.value})}
                      className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none appearance-none"
                    >
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">手机号 <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                      className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none"
                      placeholder="请输入手机号"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">身份证号</label>
                    <input
                      type="text"
                      value={regForm.idCard}
                      onChange={(e) => setRegForm({...regForm, idCard: e.target.value})}
                      className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none"
                      placeholder="请输入身份证号"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">所属工会 <span className="text-red-500">*</span></label>
                    <select
                      required
                      value={regForm.union}
                      onChange={(e) => setRegForm({...regForm, union: e.target.value})}
                      className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none appearance-none"
                    >
                      <option value="" disabled>请选择工会</option>
                      <option value="星火科技集团工会委员会">星火科技集团工会委员会</option>
                      <option value="申朴AI科技工会">申朴AI科技工会</option>
                      <option value="创新研发分工会">创新研发分工会</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">部门 <span className="text-red-500">*</span></label>
                    <select
                      required
                      value={regForm.department}
                      onChange={(e) => setRegForm({...regForm, department: e.target.value})}
                      className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none appearance-none"
                    >
                      <option value="" disabled>请选择部门</option>
                      <option value="技术部">技术部</option>
                      <option value="产品部">产品部</option>
                      <option value="人事部">人事部</option>
                      <option value="财务部">财务部</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">职务</label>
                    <select
                      value={regForm.position}
                      onChange={(e) => setRegForm({...regForm, position: e.target.value})}
                      className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none appearance-none"
                    >
                      <option value="" disabled>请选择职务</option>
                      <option value="前端工程师">前端工程师</option>
                      <option value="后端工程师">后端工程师</option>
                      <option value="产品经理">产品经理</option>
                      <option value="设计师">设计师</option>
                      <option value="部门经理">部门经理</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">学历</label>
                    <select
                      value={regForm.education}
                      onChange={(e) => setRegForm({...regForm, education: e.target.value})}
                      className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none appearance-none"
                    >
                      <option value="大专">大专</option>
                      <option value="本科">本科</option>
                      <option value="硕士">硕士</option>
                      <option value="博士">博士</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">政治面貌</label>
                  <select
                    value={regForm.politicalStatus}
                    onChange={(e) => setRegForm({...regForm, politicalStatus: e.target.value})}
                    className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-gray-50 transition-all outline-none appearance-none"
                  >
                    <option value="中共党员">中共党员</option>
                    <option value="中共预备党员">中共预备党员</option>
                    <option value="共青团员">共青团员</option>
                    <option value="群众">群众</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 active:scale-[0.98] transition-all"
                  >
                    提交注册
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {view === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">提交成功</h2>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              您的注册信息已提交成功。<br/>
              <span className="text-red-600 font-medium">会员的账号将由后台进行审核</span>，<br/>
              审核通过后即可登录使用。
            </p>
            <button
              onClick={() => setView('login')}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 active:scale-[0.98] transition-all"
            >
              返回登录
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
