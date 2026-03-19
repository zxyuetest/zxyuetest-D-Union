"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Eye, MessageCircle, Calendar, Settings, User, Star, ShieldCheck } from 'lucide-react';

export default function MyMatchmaking({ onBack }: { onBack: () => void }) {
  const stats = [
    { label: '喜欢我', value: 12, icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: '我喜欢', value: 34, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: '互相喜欢', value: 5, icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { label: '最近访客', value: 89, icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const menuItems = [
    { id: 'profile', icon: User, label: '我的交友资料', desc: '完善资料，提高匹配率' },
    { id: 'certification', icon: ShieldCheck, label: '实名认证', desc: '已认证，增加信任度' },
    { id: 'activities', icon: Calendar, label: '我的线下联谊', desc: '已报名 2 场活动' },
    { id: 'settings', icon: Settings, label: '交友设置', desc: '隐私与偏好设置' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">我的鹊桥</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-8">
        {/* Profile Card */}
        <div className="bg-white p-6 shadow-sm mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-100">
              <img src="https://picsum.photos/seed/user_avatar/150/150" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">张三</h2>
                <span className="bg-pink-50 text-pink-600 text-xs px-2 py-1 rounded-full font-medium">寻觅中</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">28岁 · 175cm · 本科</p>
              <p className="text-sm text-gray-500">软件工程师 · 研发部</p>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">喜欢运动</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">电影迷</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">厨艺达人</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">性格开朗</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-white p-4 shadow-sm mb-4">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                <span className="text-xs text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white shadow-sm">
          {menuItems.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-4">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{item.label}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
