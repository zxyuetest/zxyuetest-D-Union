"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ShoppingBag, FileText, TrendingUp } from 'lucide-react';

export default function Points({ onBack }: { onBack: () => void }) {
  const history = [
    { id: 1, title: '每日登录', time: '今天 08:30', points: '+5', type: 'earn' },
    { id: 2, title: '参与“春季徒步大会”', time: '昨天 14:00', points: '+50', type: 'earn' },
    { id: 3, title: '提交建言献策并被采纳', time: '3月12日 10:15', points: '+100', type: 'earn' },
    { id: 4, title: '兑换【定制保温杯】', time: '3月10日 09:00', points: '-500', type: 'spend' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-red-600 text-white p-4 sticky top-0 z-20 flex items-center">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-red-700 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">工会积分</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto pb-6">
        {/* Top Card */}
        <div className="bg-red-600 px-6 pb-8 pt-2 rounded-b-[2.5rem] shadow-md text-center text-white relative z-10">
          <p className="text-red-100 text-sm mb-1">当前可用积分</p>
          <h2 className="text-5xl font-bold tracking-tight">1,250</h2>
          <div className="mt-6 flex justify-center space-x-8">
            <button className="flex flex-col items-center space-y-1 active:opacity-70 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">积分商城</span>
            </button>
            <button className="flex flex-col items-center space-y-1 active:opacity-70 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">赚取积分</span>
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-gray-800 text-base">积分明细</h3>
            <button className="text-xs text-gray-500 flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1" /> 全部
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            {history.map((item, i) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.1 }} 
                className={`flex justify-between items-center p-3 ${i !== history.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                </div>
                <span className={`font-bold text-base ${item.type === 'earn' ? 'text-green-500' : 'text-gray-800'}`}>
                  {item.points}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
