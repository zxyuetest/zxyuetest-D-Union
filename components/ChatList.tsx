"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, User, MessageCircle } from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatarColor: string;
  avatarBg: string;
}

export default function ChatList({ onNavigateToChat }: { onNavigateToChat: (chatId: string, chatName: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: ChatContact[] = [
    {
      id: 'chat_1',
      name: '匿名用户 8921',
      lastMessage: '你好！',
      time: '10:00',
      unreadCount: 2,
      avatarColor: 'text-pink-500',
      avatarBg: 'bg-pink-100'
    },
    {
      id: 'chat_2',
      name: '匿名用户 3452',
      lastMessage: '周末有空一起去爬山吗？',
      time: '昨天',
      unreadCount: 0,
      avatarColor: 'text-blue-500',
      avatarBg: 'bg-blue-100'
    },
    {
      id: 'chat_3',
      name: '匿名用户 9901',
      lastMessage: '那家餐厅确实不错',
      time: '星期二',
      unreadCount: 0,
      avatarColor: 'text-green-500',
      avatarBg: 'bg-green-100'
    },
    {
      id: 'chat_4',
      name: '匿名用户 1123',
      lastMessage: '好的，到时候见',
      time: '星期一',
      unreadCount: 0,
      avatarColor: 'text-purple-500',
      avatarBg: 'bg-purple-100'
    },
    {
      id: 'chat_5',
      name: '匿名用户 5567',
      lastMessage: '哈哈哈哈',
      time: '3月10日',
      unreadCount: 0,
      avatarColor: 'text-orange-500',
      avatarBg: 'bg-orange-100'
    }
  ];

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center justify-center shadow-sm">
        <div className="flex items-center space-x-2 text-red-600">
          <MessageCircle className="w-6 h-6" />
          <h1 className="text-lg font-bold">聊天</h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 bg-gray-50">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors shadow-sm"
            placeholder="搜索联系人"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <main className="flex-1 overflow-y-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigateToChat(contact.id, contact.name)}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                index !== filteredContacts.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${contact.avatarBg} ${contact.avatarColor}`}>
                <User className="w-6 h-6" />
              </div>

              {/* Content */}
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-sm font-bold text-gray-900 truncate">
                    {contact.name}
                  </h2>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                    {contact.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 truncate">
                    {contact.lastMessage}
                  </p>
                  {contact.unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-[10px] font-bold text-white bg-red-500 rounded-full flex-shrink-0">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredContacts.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">
              没有找到相关联系人
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
