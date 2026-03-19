"use client";
import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, ChevronRight, Award, CreditCard, FileText, HelpCircle, LogOut, Bell } from 'lucide-react';

export default function Profile({ 
  onNavigate, 
  unreadCount = 0, 
  onShowNotifications 
}: { 
  onNavigate: (view: string) => void;
  unreadCount?: number;
  onShowNotifications?: () => void;
}) {
  const menuGroups = [
    {
      title: '我的服务',
      items: [
        { id: 'dues', icon: CreditCard, label: '会费缴纳', color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'points', icon: Award, label: '我的积分', color: 'text-purple-500', bg: 'bg-purple-50' },
      ]
    },
    {
      title: '其他',
      items: [
        { id: 'activities', icon: FileText, label: '我的活动', color: 'text-green-500', bg: 'bg-green-50' },
        { id: 'help', icon: HelpCircle, label: '帮助与反馈', color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'settings', icon: Settings, label: '设置', color: 'text-gray-500', bg: 'bg-gray-50' },
      ]
    }
  ];

  return (
    <div className="flex flex-col flex-1 relative bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 sticky top-0 z-20 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold flex items-center">
          <User className="w-5 h-5 mr-1.5 text-white" /> 我的
        </h1>
        <div className="relative p-2 cursor-pointer" onClick={onShowNotifications}>
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-white text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
              {unreadCount}
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-6">
        {/* User Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-10 -mt-10 blur-2xl opacity-50"></div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center p-1 shadow-md">
              <img src="https://picsum.photos/seed/user_avatar/150/150" alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-white" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-800 text-xl">张三</h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                研发部 · 软件工程师
              </p>
              <div className="mt-2 inline-flex items-center bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                正式会员
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-50 relative z-10">
            <div className="text-center cursor-pointer active:scale-95 transition-transform" onClick={() => onNavigate('points')}>
              <p className="text-xl font-bold text-gray-800">1,250</p>
              <p className="text-[10px] text-gray-500 mt-1">可用积分</p>
            </div>
            <div className="text-center cursor-pointer active:scale-95 transition-transform" onClick={() => onNavigate('activities')}>
              <p className="text-xl font-bold text-gray-800">12</p>
              <p className="text-[10px] text-gray-500 mt-1">参与活动</p>
            </div>
            <div className="text-center cursor-pointer active:scale-95 transition-transform" onClick={() => onNavigate('suggestions')}>
              <p className="text-xl font-bold text-gray-800">3</p>
              <p className="text-[10px] text-gray-500 mt-1">我的建言</p>
            </div>
          </div>
        </motion.div>

        {/* Menu Groups */}
        <div className="space-y-4">
          {menuGroups.map((group, groupIdx) => (
            <motion.div key={groupIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + groupIdx * 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 pt-4 pb-2">{group.title}</h3>
              <div className="flex flex-col">
                {group.items.map((item, itemIdx) => (
                  <div 
                    key={item.id} 
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${itemIdx !== group.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.bg}`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logout Button */}
        <motion.button 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-center space-x-2 text-red-500 font-bold text-sm active:bg-gray-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>退出登录</span>
        </motion.button>
      </main>
    </div>
  );
}
