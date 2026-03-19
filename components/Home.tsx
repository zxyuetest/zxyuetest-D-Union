"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, CalendarDays, MessageSquarePlus, HeartHandshake, Award, Home as HomeIcon, Compass, User, Bell, ChevronRight, CreditCard, Receipt, Smile, Scale, Megaphone, FileCheck, LogOut, X, ChevronLeft, ClipboardList, MessageCircle } from 'lucide-react';
import Discover from './Discover';
import Profile from './Profile';
import ChatList from './ChatList';
import { UserType } from './Login';

export default function Home({ onNavigate, user, onLogout }: { onNavigate: (view: string) => void, user: UserType, onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: '会费缴纳提醒', content: '您本月的工会会费尚未缴纳，请及时处理。', time: '10分钟前', unread: true },
    { id: 2, title: '活动报名成功', content: '您已成功报名"2026春季员工徒步大会"。', time: '2小时前', unread: true },
    { id: 3, title: '系统通知', content: '数字工会APP版本更新至v2.0，欢迎体验新功能！', time: '昨天', unread: true },
    { id: 4, title: '积分到账', content: '您参与的"建言献策"活动已获得50积分奖励。', time: '2天前', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const baseMenuItems = [
    { id: 'dues', title: '会费缴纳', icon: <Wallet className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50' },
    { id: 'activities', title: '工会活动', icon: <CalendarDays className="w-6 h-6 text-green-500" />, bg: 'bg-green-50' },
    { id: 'suggestions', title: '建言献策', icon: <MessageSquarePlus className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50' },
    { id: 'surveys', title: '调查问卷', icon: <ClipboardList className="w-6 h-6 text-cyan-500" />, bg: 'bg-cyan-50' },
    { id: 'matchmaking', title: '数字鹊桥', icon: <HeartHandshake className="w-6 h-6 text-pink-500" />, bg: 'bg-pink-50' },
    { id: 'points', title: '工会积分', icon: <Award className="w-6 h-6 text-purple-500" />, bg: 'bg-purple-50' },
    { id: 'insurance', title: '保险报销', icon: <Receipt className="w-6 h-6 text-teal-500" />, bg: 'bg-teal-50' },
    { id: 'counseling', title: '心理咨询', icon: <Smile className="w-6 h-6 text-yellow-500" />, bg: 'bg-yellow-50' },
    { id: 'legal_aid', title: '法律援助', icon: <Scale className="w-6 h-6 text-indigo-500" />, bg: 'bg-indigo-50' },
  ];

  const leaderItems = [
    { id: 'fund_approval', title: '业务审批', icon: <FileCheck className="w-6 h-6 text-red-500" />, bg: 'bg-red-50' }
  ];

  const menuItems = user.role === 'leader' 
    ? [...baseMenuItems.slice(0, 4), ...leaderItems, ...baseMenuItems.slice(4)]
    : baseMenuItems;

  const activities = [
    { title: '2026春季员工徒步大会', date: '3月20日', status: '报名中', type: '体育健身', color: 'text-red-600', bg: 'bg-red-50' },
    { title: '青年员工心理健康讲座', date: '3月25日', status: '预告', type: '关爱讲堂', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: '工会杯篮球联赛开幕式', date: '4月01日', status: '筹备中', type: '体育健身', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const handleMenuClick = (id: string) => {
    if (['dues', 'activities', 'suggestions', 'surveys', 'points', 'matchmaking', 'insurance', 'counseling', 'legal_aid', 'fund_approval'].includes(id)) {
      onNavigate(id);
    } else {
      alert('该功能正在开发中，敬请期待！');
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      {activeTab === 'home' && (
        <header className="bg-red-600 text-white p-4 sticky top-0 z-20 flex justify-between items-center shadow-md">
          <div>
            <h1 className="text-xl font-bold tracking-wider">数字工会</h1>
            <p className="text-xs text-red-100 mt-0.5 opacity-90">贴心服务，温暖你我</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 cursor-pointer" onClick={() => setShowNotifications(true)}>
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-white text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {unreadCount}
                </span>
              )}
            </div>
            <button onClick={onLogout} className="p-2 cursor-pointer hover:bg-red-700 rounded-full transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>
      )}

      {/* Scrollable Main Content */}
      {activeTab === 'home' && (
        <main className="flex-1 overflow-y-auto pb-24">
          {/* Top Background Arc */}
          <div className="bg-red-600 h-24 w-full absolute top-0 left-0 rounded-b-[2.5rem] z-0"></div>

          <div className="relative z-10 p-4 space-y-6">
              {/* User Summary Card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
                      <User className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 text-lg flex items-baseline gap-2">
                        {user.name}
                        <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          星火科技集团工会
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-0.5">可用积分</p>
                    <p className="text-2xl font-bold text-red-600">1,250</p>
                  </div>
                </div>
                
                <div onClick={() => onNavigate('dues')} className="flex bg-gray-50 rounded-xl p-3 justify-between items-center border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span>本年度会费已缴清</span>
                  </div>
                  <button className="text-xs text-red-600 font-medium flex items-center">
                    查看明细 <ChevronRight className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              </motion.div>

              {/* Grid Menu */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex flex-col items-center justify-center space-y-2 group"
                    >
                      <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center ${item.bg} group-active:scale-95 transition-transform`}>
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-700">{item.title}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                  <h3 className="font-bold text-gray-800 text-lg">近期活动</h3>
                  <button onClick={() => onNavigate('activities')} className="text-sm text-gray-500 flex items-center hover:text-red-600 transition-colors">
                    查看全部 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {activities.map((activity, i) => (
                    <motion.div 
                      key={i}
                      onClick={() => onNavigate('activities')}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex space-x-4 active:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-gray-50 rounded-xl flex-shrink-0 flex flex-col items-center justify-center text-gray-400 border border-gray-100">
                        <CalendarDays className="w-6 h-6 mb-1" />
                        <span className="text-[9px] font-medium">{activity.type}</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <h4 className="font-medium text-gray-800 text-sm leading-snug line-clamp-2">{activity.title}</h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500 font-medium">{activity.date}</span>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${activity.bg} ${activity.color}`}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
        </main>
      )}
      
      {activeTab === 'discover' && <Discover onNavigate={onNavigate} />}
      {activeTab === 'chat' && <ChatList onNavigateToChat={(chatId, chatName) => onNavigate(`chat_${chatId}_${chatName}`)} />}
      {activeTab === 'profile' && <Profile onNavigate={onNavigate} unreadCount={unreadCount} onShowNotifications={() => setShowNotifications(true)} />}

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-safe z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {[
          { id: 'home', icon: HomeIcon, label: '首页' },
          { id: 'discover', icon: Compass, label: '发现' },
          { id: 'chat', icon: MessageCircle, label: '聊天' },
          { id: 'profile', icon: User, label: '我的' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === tab.id ? 'text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="relative">
              <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'fill-red-50' : ''} transition-colors`} />
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-1/2 w-1 h-1 bg-red-600 rounded-full -translate-x-1/2"
                />
              )}
            </div>
            <span className={`text-[10px] ${activeTab === tab.id ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-gray-50 flex flex-col"
          >
            <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <button onClick={() => setShowNotifications(false)} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold">消息通知</h1>
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-xs text-gray-500 hover:text-red-600 transition-colors">
                  全部已读
                </button>
              )}
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((note) => (
                <div 
                  key={note.id} 
                  onClick={() => markAsRead(note.id)}
                  className={`bg-white p-4 rounded-2xl shadow-sm border cursor-pointer transition-colors ${note.unread ? 'border-red-100 bg-red-50/10' : 'border-gray-100'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold text-sm flex items-center ${note.unread ? 'text-gray-800' : 'text-gray-500'}`}>
                      {note.unread && <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>}
                      {note.title}
                    </h3>
                    <span className="text-[10px] text-gray-400">{note.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
