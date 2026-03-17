"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, FileText, Receipt, CheckCircle2, Clock, Building, User, CreditCard, ArrowRight, X, FolderKanban, Check, XCircle } from 'lucide-react';

const StatusBadge = ({ status }: { status: string }) => {
  let color = 'bg-gray-100 text-gray-600';
  if (status === '已通过') color = 'bg-green-100 text-green-700';
  if (status === '待审批') color = 'bg-orange-100 text-orange-700';
  if (status === '已驳回') color = 'bg-red-100 text-red-700';
  
  return (
    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${color}`}>
      {status}
    </span>
  );
};

export default function Finance({ onBack, defaultTab = 'fund' }: { onBack: () => void, defaultTab?: 'fund' | 'expense' }) {
  const [activeTab, setActiveTab] = useState<'fund' | 'expense'>(defaultTab);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Mock Data
  const [funds, setFunds] = useState([
    { id: 'F2026031501', project: '2026春季员工徒步大会', applicant: '李四', amount: '¥5,000.00', date: '2026-03-15', status: '待审批', department: '文体部', desc: '购买矿泉水、横幅、急救包等物资' },
    { id: 'F2026031602', project: '三八妇女节慰问活动', applicant: '王五', amount: '¥12,800.00', date: '2026-03-16', status: '已通过', department: '女工部', desc: '采购节日慰问品及鲜花' },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 'E2026031705', project: '青年员工心理健康讲座', applicant: '赵六', amount: '¥2,000.00', date: '2026-03-17', status: '待审批', department: '宣传部', desc: '外部专家劳务费支付' },
    { id: 'E2026031001', project: '2026春季员工徒步大会', applicant: '李四', amount: '¥850.00', date: '2026-03-10', status: '已通过', department: '文体部', desc: '徒步大会横幅及矿泉水报销' },
  ]);

  const handleApprove = (id: string, type: 'fund' | 'expense', isApproved: boolean) => {
    const updateList = (list: any[]) => list.map(item => item.id === id ? { ...item, status: isApproved ? '已通过' : '已驳回' } : item);
    if (type === 'fund') setFunds(updateList(funds));
    else setExpenses(updateList(expenses));
    setSelectedItem(null);
  };

  const currentList = activeTab === 'fund' ? funds : expenses;

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">财务审批</h1>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 flex px-4 sticky top-[60px] z-10">
        {[
          { id: 'fund', label: '经费审批', icon: FileText },
          { id: 'expense', label: '报销审批', icon: Receipt }
        ].map((t) => (
          <button 
            key={t.id} 
            onClick={() => setActiveTab(t.id as any)} 
            className={`flex-1 py-3 text-sm font-medium relative flex items-center justify-center gap-1.5 ${activeTab === t.id ? 'text-red-600' : 'text-gray-500'}`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
            {activeTab === t.id && <motion.div layoutId="finance-tab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-red-600 rounded-t-full" />}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: activeTab === 'fund' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: activeTab === 'fund' ? 10 : -10 }} className="space-y-4">
            
            {/* Summary Card */}
            <div className={`rounded-2xl p-4 border flex justify-between items-center shadow-sm ${activeTab === 'fund' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
              <div>
                <h3 className={`font-bold text-lg mb-1 ${activeTab === 'fund' ? 'text-red-800' : 'text-blue-800'}`}>
                  {activeTab === 'fund' ? '待审批经费' : '待审批报销'}
                </h3>
                <p className={`text-xs ${activeTab === 'fund' ? 'text-red-600/80' : 'text-blue-600/80'}`}>
                  共 {currentList.filter(i => i.status === '待审批').length} 笔待处理
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeTab === 'fund' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                {activeTab === 'fund' ? <FileText className="w-6 h-6" /> : <Receipt className="w-6 h-6" />}
              </div>
            </div>

            <h4 className="font-bold text-gray-800 text-sm mt-6 mb-2">审批列表</h4>
            {currentList.map((req, i) => (
              <div key={req.id} onClick={() => setSelectedItem(req)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer active:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-4">
                    <h5 className="font-bold text-gray-800 text-sm mb-1 flex items-center gap-1.5">
                      <FolderKanban className="w-4 h-4 text-gray-400" /> {req.project}
                    </h5>
                    <p className="text-xs text-gray-400 font-mono">单号: {req.id}</p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-gray-50">
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {req.applicant} ({req.department})
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {req.date}
                    </div>
                  </div>
                  <span className={`font-bold text-lg ${activeTab === 'fund' ? 'text-red-600' : 'text-blue-600'}`}>{req.amount}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-white flex flex-col"
          >
            <header className="bg-white text-gray-800 p-4 flex items-center border-b border-gray-100">
              <button onClick={() => setSelectedItem(null)} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold flex-1 text-center mr-8">审批详情</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Amount Header */}
              <div className="text-center py-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">申请金额</p>
                <p className={`text-3xl font-bold ${activeTab === 'fund' ? 'text-red-600' : 'text-blue-600'}`}>{selectedItem.amount}</p>
                <div className="mt-3 flex justify-center">
                  <StatusBadge status={selectedItem.status} />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-xs text-gray-500">关联项目</span>
                    <span className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                      <FolderKanban className="w-4 h-4 text-gray-400" /> {selectedItem.project}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-xs text-gray-500">申请人</span>
                    <span className="text-sm font-medium text-gray-800">{selectedItem.applicant} ({selectedItem.department})</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-xs text-gray-500">申请单号</span>
                    <span className="text-sm font-mono text-gray-800">{selectedItem.id}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-xs text-gray-500">申请时间</span>
                    <span className="text-sm font-medium text-gray-800">{selectedItem.date}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-2">详细说明</span>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl leading-relaxed">{selectedItem.desc}</p>
                  </div>
                </div>

                {/* Attachments Mock */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <h4 className="text-xs font-bold text-gray-700 mb-3">附件及凭证</h4>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 flex flex-col items-center justify-center border border-gray-200">
                      <FileText className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-[10px] text-gray-500">预算表.pdf</span>
                    </div>
                    {activeTab === 'expense' && (
                      <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 flex flex-col items-center justify-center border border-gray-200">
                        <Receipt className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-[10px] text-gray-500">发票.jpg</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions (Only if pending) */}
            {selectedItem.status === '待审批' && (
              <div className="p-4 border-t border-gray-100 bg-white pb-safe flex gap-3">
                <button 
                  onClick={() => handleApprove(selectedItem.id, activeTab, false)}
                  className="flex-1 py-3.5 rounded-xl font-bold text-red-600 bg-red-50 border border-red-100 active:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" /> 驳回
                </button>
                <button 
                  onClick={() => handleApprove(selectedItem.id, activeTab, true)}
                  className="flex-1 py-3.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" /> 同意
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
