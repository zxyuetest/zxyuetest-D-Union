"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Send, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Suggestions({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('submit'); // 'submit' | 'history'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const historyList = [
    { id: 1, title: '关于增加办公区绿植的建议', date: '2026-03-10', status: '已采纳', type: '职工福利', color: 'text-green-600', bg: 'bg-green-50' },
    { id: 2, title: '建议优化食堂排队动线', date: '2026-02-15', status: '处理中', type: '后勤保障', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 3, title: '希望工会组织更多单身联谊活动', date: '2025-11-20', status: '已回复', type: '文体活动', color: 'text-gray-600', bg: 'bg-gray-100' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('提交成功！感谢您的建言献策。');
      setActiveTab('history');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">建言献策</h1>
      </header>

      <div className="bg-white border-b border-gray-200 flex px-4 sticky top-[60px] z-10">
        {['我要建言', '我的提交'].map((t, i) => {
          const keys = ['submit', 'history'];
          const key = keys[i];
          return (
            <button key={key} onClick={() => setActiveTab(key)} className={`flex-1 py-3 text-sm font-medium relative ${activeTab === key ? 'text-red-600' : 'text-gray-500'}`}>
              {t}
              {activeTab === key && <motion.div layoutId="sug-tab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-red-600 rounded-t-full" />}
            </button>
          );
        })}
      </div>
      
      <main className="flex-1 overflow-y-auto p-4">
        {activeTab === 'submit' ? (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6 text-red-600">
              <MessageSquare className="w-5 h-5" />
              <h2 className="font-bold text-gray-800">倾听您的声音</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">建议分类</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all">
                  <option>职工福利</option>
                  <option>业务发展</option>
                  <option>组织建设</option>
                  <option>文体活动</option>
                  <option>后勤保障</option>
                  <option>其他建议</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input required type="text" placeholder="请输入简短的标题" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">详细内容</label>
                <textarea required rows={5} placeholder="请详细描述您的建议或意见..." className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"></textarea>
              </div>

              <div className="flex items-center mt-2">
                <input type="checkbox" id="anonymous" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                <label htmlFor="anonymous" className="ml-2 text-sm text-gray-600">匿名提交</label>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-red-600 text-white font-bold py-3 rounded-xl active:bg-red-700 transition-colors shadow-md shadow-red-200 flex justify-center items-center disabled:opacity-70">
                {isSubmitting ? '提交中...' : <><Send className="w-4 h-4 mr-2" /> 提交建议</>}
              </button>
            </form>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {historyList.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 text-sm leading-snug flex-1 pr-4">{item.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${item.bg} ${item.color}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-50 pt-2">
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {item.date}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
