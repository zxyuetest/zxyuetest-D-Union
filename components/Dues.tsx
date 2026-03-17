"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Dues({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">会费缴纳</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Current Due */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">2026年度工会会费</h2>
              <p className="text-sm text-gray-500 mt-1">所属工会：研发中心工会委员会</p>
            </div>
            <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-md flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" /> 待缴纳
            </span>
          </div>
          <div className="py-4 border-t border-b border-gray-50 mb-4 flex justify-center">
            <div className="text-center">
              <span className="text-sm text-gray-500">应缴金额</span>
              <div className="text-3xl font-bold text-gray-800 mt-1"><span className="text-lg">¥</span>120.00</div>
            </div>
          </div>
          <button className="w-full bg-red-600 text-white font-bold py-3 rounded-xl active:bg-red-700 transition-colors shadow-md shadow-red-200">
            立即缴纳
          </button>
        </motion.div>

        {/* History */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3 ml-1">缴费记录</h3>
          <div className="space-y-3">
            {[2025, 2024, 2023].map((year, i) => (
              <motion.div key={year} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{year}年度工会会费</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{year}-01-15 10:23:00</p>
                  </div>
                </div>
                <span className="font-bold text-gray-800">¥120.00</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
