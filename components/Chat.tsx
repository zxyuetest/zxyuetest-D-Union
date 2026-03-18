"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Send, Image as ImageIcon, Smile, Mic, PlusCircle, MoreHorizontal, FileText, Camera } from 'lucide-react';
import { UserType } from './Login';

interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
  type: 'text' | 'image' | 'system';
}

export default function Chat({ onBack, user }: { onBack: () => void, user: UserType }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_0',
      senderName: '系统',
      senderAvatar: '',
      content: `欢迎来到${user.unionName}交流群！大家可以在这里畅所欲言，交流工作与生活。请遵守群规，文明发言。`,
      timestamp: '10:00',
      isSelf: false,
      type: 'system'
    },
    {
      id: 'msg_1',
      senderName: `李主席 (${user.unionName})`,
      senderAvatar: 'https://picsum.photos/seed/li/100/100',
      content: '各位同事上午好！本周五下午工会将组织羽毛球比赛，欢迎大家踊跃报名参加！🏸',
      timestamp: '10:05',
      isSelf: false,
      type: 'text'
    },
    {
      id: 'msg_2',
      senderName: `王建国 (${user.unionName})`,
      senderAvatar: 'https://picsum.photos/seed/wang/100/100',
      content: '太棒了！我已经报名了，有没有一起组队双打的？',
      timestamp: '10:08',
      isSelf: false,
      type: 'text'
    },
    {
      id: 'msg_3',
      senderName: `赵小雅 (${user.unionName})`,
      senderAvatar: 'https://picsum.photos/seed/zhao/100/100',
      content: '算我一个！不过我打得不太好，求带飞~ 😂',
      timestamp: '10:12',
      isSelf: false,
      type: 'text'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [showActions, setShowActions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderName: `${user.name} (${user.unionName})`,
      senderAvatar: `https://picsum.photos/seed/${user.id || 'user'}/100/100`,
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setShowActions(false);

    // Simulate a reply after a short delay
    setTimeout(() => {
      const replies = [
        '收到！',
        '赞同👍',
        '哈哈，有道理！',
        '大家注意劳逸结合哦~',
        '期待大家的表现！'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        senderName: `工会小助手 (${user.unionName})`,
        senderAvatar: 'https://picsum.photos/seed/bot/100/100',
        content: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false,
        type: 'text'
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (action: string) => {
    alert(`[${action}] 功能正在开发中，敬请期待！`);
    setShowActions(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
      {/* Header */}
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold leading-tight">{user.unionName}交流群 (128)</h1>
            <p className="text-[10px] text-green-500 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
              大家都在畅所欲言
            </p>
          </div>
        </div>
        <button className="p-1 active:bg-gray-100 rounded-full transition-colors text-gray-500">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <span className="bg-gray-200 text-gray-500 text-[10px] px-3 py-1 rounded-full max-w-[80%] text-center leading-relaxed">
                  {msg.content}
                </span>
              </div>
            );
          }

          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'} items-end space-x-2`}
            >
              {!msg.isSelf && (
                <img 
                  src={msg.senderAvatar} 
                  alt={msg.senderName} 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200 mb-1"
                  referrerPolicy="no-referrer"
                />
              )}
              
              <div className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'} max-w-[70%]`}>
                {!msg.isSelf && (
                  <span className="text-[10px] text-gray-400 mb-1 ml-1">{msg.senderName}</span>
                )}
                
                <div className={`relative px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                  msg.isSelf 
                    ? 'bg-red-500 text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
                }`}>
                  <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                </div>
                
                <span className="text-[9px] text-gray-400 mt-1 mx-1">{msg.timestamp}</span>
              </div>

              {msg.isSelf && (
                <img 
                  src={msg.senderAvatar} 
                  alt={msg.senderName} 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200 mb-1"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 pb-safe z-20 absolute bottom-0 w-full">
        <div className="p-3 flex items-end space-x-2">
          <button 
            onClick={() => handleActionClick('语音')}
            className="p-2 text-gray-500 hover:text-gray-700 active:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <Mic className="w-6 h-6" />
          </button>
          
          <div className="flex-1 bg-gray-100 rounded-2xl flex items-center min-h-[40px] px-3 py-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="说点什么..."
              className="w-full bg-transparent border-none focus:outline-none text-sm resize-none max-h-24 py-1.5"
              rows={1}
              style={{ height: 'auto' }}
            />
            <button 
              onClick={() => handleActionClick('表情')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {inputText.trim() ? (
            <button 
              onClick={handleSendMessage}
              className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md active:bg-red-600 transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          ) : (
            <button 
              onClick={() => setShowActions(!showActions)}
              className="p-2 text-gray-500 hover:text-gray-700 active:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <PlusCircle className={`w-6 h-6 transition-transform ${showActions ? 'rotate-45' : ''}`} />
            </button>
          )}
        </div>

        {/* Expandable Actions Panel */}
        <AnimatePresence>
          {showActions && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 overflow-hidden bg-gray-50"
            >
              <div className="grid grid-cols-4 gap-4 p-6">
                {[
                  { icon: ImageIcon, label: '相册', color: 'text-blue-500', bg: 'bg-blue-100' },
                  { icon: Camera, label: '拍摄', color: 'text-gray-700', bg: 'bg-gray-200' },
                  { icon: FileText, label: '文件', color: 'text-orange-500', bg: 'bg-orange-100' },
                ].map((action, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleActionClick(action.label)}
                    className="flex flex-col items-center space-y-2 group"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.bg} group-active:scale-95 transition-transform`}>
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <span className="text-[10px] text-gray-500">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
