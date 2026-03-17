"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Receipt, Upload, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Insurance({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('apply');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = [
    { id: 1, title: '住院医疗互助金申请', date: '2026-02-15', amount: '¥1,500.00', status: '已打款', color: 'text-green-600', bg: 'bg-green-50' },
    { id: 2, title: '意外伤害互助金申请', date: '2026-03-10', amount: '¥800.00', status: '审核中', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('报销申请提交成功！');
      setActiveTab('history');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">保险报销</h1>
      </header>

      <div className="bg-white border-b border-gray-200 flex px-4 sticky top-[60px] z-10">
        {['报销申请', '进度查询'].map((t, i) => {
          const keys = ['apply', 'history'];
          const key = keys[i];
          return (
            <button key={key} onClick={() => setActiveTab(key)} className={`flex-1 py-3 text-sm font-medium relative ${activeTab === key ? 'text-teal-600' : 'text-gray-500'}`}>
              {t}
              {activeTab === key && <motion.div layoutId="ins-tab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-teal-600 rounded-t-full" />}
            </button>
          );
        })}
      </div>

      <main className="flex-1 overflow-y-auto p-4">
        {activeTab === 'apply' ? (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6 text-teal-600">
              <Receipt className="w-5 h-5" />
              <h2 className="font-bold text-gray-800">填写报销信息</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">报销类别</label>
                <select className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500">
                  <option>职工住院医疗互助</option>
                  <option>重大疾病互助</option>
                  <option>意外伤害互助</option>
                  <option>女职工特殊疾病互助</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">申请金额 (元)</label>
                <input required type="number" placeholder="0.00" className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">上传凭证 (发票/病历等)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                  <Upload className="w-8 h-8 mb-2 text-teal-400" />
                  <span className="text-xs">点击或拖拽上传图片</span>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-teal-600 text-white font-bold py-3 rounded-xl active:bg-teal-700 transition-colors shadow-md shadow-teal-200 flex justify-center items-center disabled:opacity-70">
                {isSubmitting ? '提交中...' : '提交申请'}
              </button>
            </form>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {history.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 text-sm flex-1">{item.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${item.bg} ${item.color}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-50 pt-2">
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {item.date}</span>
                  <span className="font-bold text-gray-800">{item.amount}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
