"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export type UserType = {
  id: string;
  name: string;
  role: 'member' | 'leader';
  unionName: string;
  branchName: string;
};

export default function Login({ onLogin }: { onLogin: (user: UserType) => void }) {
  const [username, setUsername] = useState('leader');
  const [password, setPassword] = useState('123456');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'leader') {
      onLogin({ id: 'u1', name: '王建国', role: 'leader', unionName: '星火科技集团工会委员会', branchName: '工会主席办' });
    } else {
      onLogin({ id: 'u2', name: '李明', role: 'member', unionName: '星火科技集团工会委员会', branchName: '研发中心第一分工会' });
    }
  };

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
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

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 active:scale-[0.98] transition-all"
          >
            登录 <ArrowRight className="ml-2 w-4 h-4" />
          </button>

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
    </div>
  );
}
