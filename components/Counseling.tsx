"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Smile, MessageCircle, Bot, Sparkles, Send, ShieldCheck } from 'lucide-react';

export default function Counseling({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: '你好！我是你的专属AI心理倾听者。无论你是遇到了职场压力、生活烦恼，还是仅仅想找个人聊聊，我都在这里。今天过得怎么样？' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { id: Date.now(), type: 'user', text: input };
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: '我理解你的感受。在这个快节奏的环境中，有这样的情绪是很正常的。你能多跟我说说具体是什么让你感到困扰吗？我会在这里倾听并陪伴你。' 
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">AI 心理疏导</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4 pb-20">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-teal-400 to-emerald-400 rounded-3xl p-5 text-white shadow-md relative overflow-hidden flex-shrink-0">
          <Bot className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-20" />
          <div className="relative z-10 flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI 心灵伴侣</h2>
              <p className="text-xs opacity-90">24小时在线，绝对隐私保护</p>
            </div>
          </div>
          <div className="relative z-10 flex items-center text-[10px] bg-white/20 w-max px-2 py-1 rounded-full mt-2">
            <ShieldCheck className="w-3 h-3 mr-1" /> 聊天记录端到端加密，不留存
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col space-y-4 mt-4">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <Bot className="w-5 h-5 text-teal-600" />
                </div>
              )}
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.type === 'user' 
                  ? 'bg-teal-500 text-white rounded-tr-sm' 
                  : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-100 sticky bottom-0 z-20 pb-safe">
        <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1.5 border border-gray-200 focus-within:border-teal-300 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="倾诉你的烦恼..." 
            className="flex-1 bg-transparent border-none focus:outline-none text-sm px-3 text-gray-700"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:bg-gray-300 transition-colors"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
