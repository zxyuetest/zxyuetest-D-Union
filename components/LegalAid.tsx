"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Scale, MessageSquare, FileText, BookOpen, ShieldAlert, Heart } from 'lucide-react';

export default function LegalAid({ onBack }: { onBack: () => void }) {
  const articles = [
    { id: 1, title: '《劳动合同法》核心条款解读，保护你的合法权益', views: '1.2k' },
    { id: 2, title: '工伤认定标准与赔偿流程详解', views: '856' },
    { id: 3, title: '女职工孕产期权益保护指南', views: '2.3k' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">法律援助</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
          <Scale className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-20" />
          <h2 className="text-xl font-bold mb-2 relative z-10">工会法律援助中心</h2>
          <p className="text-sm opacity-90 relative z-10">依法维权，工会做你的坚强后盾</p>
          <div className="mt-4 flex space-x-3 relative z-10">
            <button className="bg-white text-indigo-600 text-xs font-bold px-4 py-2 rounded-full shadow-sm active:bg-gray-50 flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" /> 在线咨询
            </button>
            <button className="bg-indigo-400/30 border border-indigo-300 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm active:bg-indigo-400/50 flex items-center">
              <FileText className="w-3 h-3 mr-1" /> 援助申请
            </button>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-gray-800 text-base mb-3 px-1">常见问题分类</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: '劳动纠纷', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
              { title: '婚姻家庭', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
              { title: '房产物业', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
            ].map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-2 active:bg-gray-50 cursor-pointer">
                <div className={`w-10 h-10 rounded-full ${cat.bg} flex items-center justify-center`}>
                  <cat.icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <span className="text-xs font-medium text-gray-700">{cat.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div>
          <div className="flex justify-between items-end px-1 mb-3">
            <h3 className="font-bold text-gray-800 text-base">普法微课堂</h3>
            <span className="text-xs text-gray-500">更多</span>
          </div>
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            {articles.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className={`p-3 flex items-start space-x-3 ${i !== articles.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm leading-snug">{article.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1.5">{article.views} 阅读</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
