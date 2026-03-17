"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Newspaper, Users, Heart, PlayCircle, ChevronRight, MessageSquare, Star, Send, X } from 'lucide-react';

export default function Discover({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [likedMoments, setLikedMoments] = useState<Record<number, boolean>>({});
  const [favoritedMoments, setFavoritedMoments] = useState<Record<number, boolean>>({});
  const [favoritedNews, setFavoritedNews] = useState<Record<number, boolean>>({});
  
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageTarget, setMessageTarget] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleLike = (id: number) => {
    setLikedMoments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFavoriteMoment = (id: number) => {
    setFavoritedMoments(prev => ({ ...prev, [id]: !prev[id] }));
    showToast(favoritedMoments[id] ? '已取消收藏' : '收藏成功');
  };

  const handleFavoriteNews = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavoritedNews(prev => ({ ...prev, [id]: !prev[id] }));
    showToast(favoritedNews[id] ? '已取消收藏' : '收藏成功');
  };

  const openMessageModal = (user: string) => {
    setMessageTarget(user);
    setMessageContent('');
    setShowMessageModal(true);
  };

  const sendMessage = () => {
    if (!messageContent.trim()) return;
    setShowMessageModal(false);
    showToast(`已发送消息给 ${messageTarget}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const news = [
    { id: 1, title: '2026年度市总工会“春送岗位”大型招聘会圆满落幕', date: '2026-03-15', views: 1250, img: 'https://picsum.photos/seed/news1/400/200' },
    { id: 2, title: '关于开展职工医疗互助保障活动的最新通知', date: '2026-03-14', views: 3420, img: 'https://picsum.photos/seed/news2/400/200' },
  ];

  const moments = [
    { id: 1, user: '李华', avatar: 'https://picsum.photos/seed/user1/100/100', content: '周末参加了工会组织的徒步活动，认识了很多新朋友，风景也很美！', img: 'https://picsum.photos/seed/moment1/400/300', likes: 45, comments: 12 },
    { id: 2, user: '王建国', avatar: 'https://picsum.photos/seed/user2/100/100', content: '今天在职工书屋借到了心仪已久的书，环境真不错。', img: null, likes: 23, comments: 5 },
  ];

  return (
    <div className="flex flex-col flex-1 relative overflow-hidden">
      {/* Header */}
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex justify-center items-center shadow-sm">
        <h1 className="text-lg font-bold flex items-center">
          <Compass className="w-5 h-5 mr-1.5 text-red-600" /> 发现
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-6">
        {/* Quick Links */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Newspaper, label: '工会资讯', color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: Users, label: '职工风采', color: 'text-green-500', bg: 'bg-green-50' },
            { icon: Heart, label: '互助圈子', color: 'text-pink-500', bg: 'bg-pink-50' },
            { icon: PlayCircle, label: '视频专区', color: 'text-purple-500', bg: 'bg-purple-50' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center justify-center space-y-2 cursor-pointer active:scale-95 transition-transform">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Latest News */}
        <div>
          <div className="flex justify-between items-end px-1 mb-3">
            <h3 className="font-bold text-gray-800 text-base">工会头条</h3>
            <button className="text-xs text-gray-500 flex items-center hover:text-red-600 transition-colors">
              更多 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {news.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:bg-gray-50">
                <img src={item.img} alt={item.title} className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
                <div className="p-3">
                  <h4 className="font-medium text-gray-800 text-sm leading-snug line-clamp-2">{item.title}</h4>
                  <div className="flex justify-between items-center mt-2 text-[10px] text-gray-400">
                    <div className="flex space-x-2">
                      <span>{item.date}</span>
                      <span>{item.views} 阅读</span>
                    </div>
                    <button 
                      onClick={(e) => handleFavoriteNews(e, item.id)} 
                      className={`p-1 rounded-full transition-colors ${favoritedNews[item.id] ? 'text-yellow-500 bg-yellow-50' : 'hover:bg-gray-100'}`}
                    >
                      <Star className={`w-3.5 h-3.5 ${favoritedNews[item.id] ? 'fill-yellow-500' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Moments */}
        <div>
          <div className="flex justify-between items-end px-1 mb-3">
            <h3 className="font-bold text-gray-800 text-base">互助圈子</h3>
            <button className="text-xs text-gray-500 flex items-center hover:text-red-600 transition-colors">
              更多 <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {moments.map((moment, i) => (
              <motion.div key={moment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <img src={moment.avatar} alt={moment.user} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{moment.user}</h4>
                    <p className="text-[10px] text-gray-400">刚刚</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{moment.content}</p>
                {moment.img && (
                  <img src={moment.img} alt="Moment" className="w-full h-40 object-cover rounded-xl mb-3" referrerPolicy="no-referrer" />
                )}
                <div className="flex items-center justify-between space-x-6 text-gray-400 border-t border-gray-50 pt-3">
                  <div className="flex space-x-6">
                    <button 
                      onClick={() => handleLike(moment.id)}
                      className={`flex items-center text-xs transition-colors ${likedMoments[moment.id] ? 'text-red-500' : 'hover:text-red-500'}`}
                    >
                      <Heart className={`w-4 h-4 mr-1.5 ${likedMoments[moment.id] ? 'fill-red-500' : ''}`} /> 
                      {moment.likes + (likedMoments[moment.id] ? 1 : 0)}
                    </button>
                    <button 
                      onClick={() => openMessageModal(moment.user)}
                      className="flex items-center text-xs hover:text-blue-500 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 mr-1.5" /> {moment.comments}
                    </button>
                  </div>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => handleFavoriteMoment(moment.id)}
                      className={`flex items-center text-xs transition-colors ${favoritedMoments[moment.id] ? 'text-yellow-500' : 'hover:text-yellow-500'}`}
                    >
                      <Star className={`w-4 h-4 ${favoritedMoments[moment.id] ? 'fill-yellow-500' : ''}`} />
                    </button>
                    <button 
                      onClick={() => openMessageModal(moment.user)}
                      className="flex items-center text-xs hover:text-green-500 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">发消息给 {messageTarget}</h3>
                <button onClick={() => setShowMessageModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="说点什么..."
                  className="w-full h-24 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
                  autoFocus
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={sendMessage}
                    disabled={!messageContent.trim()}
                    className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4 mr-1.5" /> 发送
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-xs shadow-lg whitespace-nowrap"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
