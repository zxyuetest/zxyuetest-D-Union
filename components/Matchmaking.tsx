"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Heart, Sparkles, ShieldCheck, Lock, MessageCircle, 
  UserCheck, Bot, User, Target, EyeOff, Settings, Send, Image as ImageIcon,
  Edit3, Save, Coffee, Users, X, MapPin, Briefcase, GraduationCap, Ruler, Activity, Compass, Eye, CheckCircle2, CreditCard, ChevronRight, Home, Utensils, Calendar, Check
} from 'lucide-react';

const GUESTS = [
  {
    id: 'g1',
    name: '林静',
    age: 26,
    height: '165cm',
    location: '市中心区',
    job: '小学教师',
    education: '硕士研究生',
    mbti: 'ENFJ (主人公)',
    hobbies: ['摄影', '探店', '滑雪', '做饭'],
    intro: '平时喜欢去各个城市旅行，记录生活的美好。希望能遇到一个愿意陪我一起看世界的人。性格开朗，情绪稳定。',
    tags: ['温柔', '喜欢阅读', '热爱生活'],
    matchScore: 95,
    aiReason: '价值观高度一致，都喜欢户外运动，性格互补。',
    verified: true,
    image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
    assets: '市区全款房，代步车',
    creditScore: 780,
    socialMatch: '门当户对指数 95% (家庭背景、教育水平高度匹配)',
    scoreDetails: [
      { label: '心动指数', value: 98, color: 'bg-rose-500', bg: 'bg-rose-100', text: 'text-rose-700' },
      { label: '合拍指数', value: 95, color: 'bg-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-700' },
      { label: '幸福指数', value: 92, color: 'bg-emerald-500', bg: 'bg-emerald-100', text: 'text-emerald-700' }
    ]
  },
  {
    id: 'g2',
    name: '陈宇',
    age: 28,
    height: '180cm',
    location: '高新区',
    job: '软件工程师',
    education: '本科',
    mbti: 'INTJ (建筑师)',
    hobbies: ['健身', '科幻电影', '数码', '自驾游'],
    intro: '工作比较忙碌但很充实，对待感情认真负责。希望另一半有自己的事业追求，能互相独立又互相扶持。',
    tags: ['阳光', '运动达人', '幽默'],
    matchScore: 92,
    aiReason: '双方都有较强的事业心，能够互相理解工作节奏，智力层面的交流会非常契合。',
    verified: true,
    image: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=400&q=80',
    assets: '按揭房，有车',
    creditScore: 810,
    socialMatch: '门当户对指数 92% (高知家庭，收入水平匹配)',
    scoreDetails: [
      { label: '心动指数', value: 90, color: 'bg-rose-500', bg: 'bg-rose-100', text: 'text-rose-700' },
      { label: '合拍指数', value: 96, color: 'bg-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-700' },
      { label: '幸福指数', value: 88, color: 'bg-emerald-500', bg: 'bg-emerald-100', text: 'text-emerald-700' }
    ]
  },
  {
    id: 'g3',
    name: '王雪',
    age: 25,
    height: '162cm',
    location: '滨海新区',
    job: '财务专员',
    education: '本科',
    mbti: 'ISFP (探险家)',
    hobbies: ['烘焙', '画画', '撸猫', '看展'],
    intro: '生活简单规律，喜欢在周末烤点小饼干，或者去美术馆安静地待一个下午。家里有一只可爱的布偶猫。',
    tags: ['细心', '美食控', '旅行'],
    matchScore: 88,
    aiReason: '对方的温柔体贴能很好地包容您的性格，共同的安静爱好有助于建立深层的情感连接。',
    verified: true,
    image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=400&q=80',
    assets: '与父母同住，无车',
    creditScore: 720,
    socialMatch: '门当户对指数 88% (职业稳定性高，性格互补)',
    scoreDetails: [
      { label: '心动指数', value: 85, color: 'bg-rose-500', bg: 'bg-rose-100', text: 'text-rose-700' },
      { label: '合拍指数', value: 90, color: 'bg-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-700' },
      { label: '幸福指数', value: 96, color: 'bg-emerald-500', bg: 'bg-emerald-100', text: 'text-emerald-700' }
    ]
  },
  {
    id: 'g4',
    name: '张伟',
    age: 29,
    height: '178cm',
    location: '老城区',
    job: '公务员',
    education: '硕士研究生',
    mbti: 'ISTJ (物流师)',
    hobbies: ['阅读', '书法', '喝茶', '爬山'],
    intro: '性格沉稳内敛，生活作息规律。希望能找到一个顾家、孝顺的伴侣，共同经营温馨的小家庭。',
    tags: ['稳重', '顾家', '摄影'],
    matchScore: 85,
    aiReason: '性格互补，对方的稳重能给您带来安全感，共同的家庭观念有助于长远发展。',
    verified: true,
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=400&q=80',
    assets: '市区全款房，代步车',
    creditScore: 850,
    socialMatch: '门当户对指数 90% (体制内工作，家庭背景相似)',
    scoreDetails: [
      { label: '心动指数', value: 80, color: 'bg-rose-500', bg: 'bg-rose-100', text: 'text-rose-700' },
      { label: '合拍指数', value: 88, color: 'bg-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-700' },
      { label: '幸福指数', value: 90, color: 'bg-emerald-500', bg: 'bg-emerald-100', text: 'text-emerald-700' }
    ]
  },
  {
    id: 'g5',
    name: '李娜',
    age: 27,
    height: '168cm',
    location: '大学城',
    job: 'UI设计师',
    education: '本科',
    mbti: 'ENFP (竞选者)',
    hobbies: ['看展', '剧本杀', '音乐节', '手作'],
    intro: '脑洞大开的创意工作者，喜欢尝试新鲜事物。希望能遇到一个有趣灵魂，一起探索世界的无限可能。',
    tags: ['文艺', '看展', '猫奴'],
    matchScore: 82,
    aiReason: '对方的活力能给您的生活带来很多乐趣，共同的艺术爱好能产生很多共鸣。',
    verified: true,
    image: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=400&q=80',
    assets: '租房，无车',
    creditScore: 750,
    socialMatch: '门当户对指数 85% (收入水平相当，生活方式契合)',
    scoreDetails: [
      { label: '心动指数', value: 88, color: 'bg-rose-500', bg: 'bg-rose-100', text: 'text-rose-700' },
      { label: '合拍指数', value: 82, color: 'bg-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-700' },
      { label: '幸福指数', value: 85, color: 'bg-emerald-500', bg: 'bg-emerald-100', text: 'text-emerald-700' }
    ]
  }
];

// --- Sub-views ---

function Dashboard({ onNavigate, onBack, scores }: { onNavigate: (v: string, guestId?: string) => void, onBack: () => void, scores: { total: number, objective: number, subjective: number } }) {
  const [showScoreDetails, setShowScoreDetails] = useState(false);

  return (
    <div className="flex flex-col h-full bg-pink-50/30">
      <header className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 sticky top-0 z-20 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-white/20 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold flex items-center">
            <Heart className="w-5 h-5 mr-1 fill-white" /> 数字鹊桥
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('ideal_partner')} className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm active:bg-white/30 transition-colors relative group">
            <Target className="w-5 h-5" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-1.5 py-0.5 rounded">理想伴侣</span>
          </button>
          <button onClick={() => setShowScoreDetails(true)} className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm active:bg-white/30 transition-colors relative group">
            <Activity className="w-5 h-5" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-1.5 py-0.5 rounded">综合指数</span>
          </button>
          <button onClick={() => onNavigate('aicoach')} className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm active:bg-white/30 transition-colors relative group">
            <Bot className="w-5 h-5" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-1.5 py-0.5 rounded">恋爱导师</span>
          </button>
          <button onClick={() => onNavigate('events')} className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm active:bg-white/30 transition-colors relative group">
            <Coffee className="w-5 h-5" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-1.5 py-0.5 rounded">线下联谊</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        <div className="flex items-center justify-between px-1 mb-2">
          <h2 className="text-lg font-bold text-gray-800">今日推荐嘉宾</h2>
          <span className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full font-medium">每日更新</span>
        </div>

        <div className="space-y-6">
          {GUESTS.map((guest, index) => (
            <motion.div 
              key={guest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-lg border border-pink-100"
            >
              <div className="relative h-96 w-full">
                <img 
                  src={guest.image} 
                  alt={guest.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Match Score Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center shadow-lg">
                  <Heart className="w-4 h-4 text-pink-500 mr-1.5 fill-pink-500" />
                  <span className="text-sm font-bold text-pink-600">匹配度 {guest.matchScore}%</span>
                </div>

                {/* Guest Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1 flex items-end">
                    {guest.name} <span className="text-base font-normal ml-2 opacity-90">{guest.age}岁 · {guest.job}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {guest.tags.map(tag => (
                      <span key={tag} className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs border border-white/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Profile Button */}
                <button 
                  onClick={() => onNavigate('matches', guest.id)}
                  className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center active:scale-95 transition-transform"
                >
                  查看主页 <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Score Details Modal */}
      <AnimatePresence>
        {showScoreDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">婚恋综合指数评估</h3>
                  <button onClick={() => setShowScoreDetails(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 active:bg-gray-200 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-lg shadow-pink-200">
                    <span className="text-white font-bold text-4xl">{scores.total}</span>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">客观条件 (学历/工作/资产)</span>
                      <span className="text-pink-600 font-bold">{scores.objective}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: `${scores.objective}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">主观性格 (MBTI/兴趣/价值观)</span>
                      <span className="text-purple-600 font-bold">{scores.subjective}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${scores.subjective}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">互动活跃度 (登录/聊天/活动)</span>
                      <span className="text-blue-600 font-bold">88</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 bg-pink-50 p-4 rounded-2xl">
                  <p className="text-xs text-pink-800 leading-relaxed">
                    <Sparkles className="w-4 h-4 inline mr-1 -mt-0.5" />
                    您的综合指数击败了 <strong>85%</strong> 的同城单身青年。建议多参与线下联谊活动，可进一步提升互动活跃度评分。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


function Matches({ onBack, guestId }: { onBack: () => void, guestId?: string | null }) {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentFeature, setPaymentFeature] = useState<{id: string, title: string, price: number, profileId?: string} | null>(null);
  const [unlockedFeatures, setUnlockedFeatures] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUnlock = (featureId: string, title: string, price: number, profileId?: string) => {
    const key = `${featureId}_${profileId || 'global'}`;
    if (unlockedFeatures[key]) return;
    setPaymentFeature({ id: featureId, title, price, profileId });
    setShowPayment(true);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentFeature) {
        const key = `${paymentFeature.id}_${paymentFeature.profileId || 'global'}`;
        setUnlockedFeatures(prev => ({ ...prev, [key]: true }));
      }
      setShowPayment(false);
    }, 1500);
  };

  const recommendations = guestId ? GUESTS.filter(g => g.id === guestId) : GUESTS;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">嘉宾详情</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-8">
        {recommendations.map((profile) => (
          <div key={profile.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-pink-100 relative">
            <div className="h-72 w-full relative bg-gray-200">
              <img src={profile.image} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col items-center justify-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <p className="text-white text-sm font-medium tracking-wider">双向心动后解锁真实照片</p>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-indigo-700 flex items-center shadow-sm">
                <UserCheck className="w-4 h-4 mr-1" /> 内部认证
              </div>
              <div 
                className="absolute -bottom-5 right-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center border-2 border-white z-10 cursor-pointer active:scale-95 transition-transform"
                onClick={() => handleUnlock('score_analysis', '匹配分数解析', 9.9, profile.id)}
              >
                <Sparkles className="w-4 h-4 mr-1.5" /> AI 契合度 {profile.matchScore}%
                {!unlockedFeatures[`score_analysis_${profile.id}`] && <Lock className="w-3 h-3 ml-1.5 opacity-70" />}
              </div>
            </div>

            <div className="p-6 pt-8 relative">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-2xl">{profile.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{profile.age}岁 · {profile.height}</p>
                </div>
              </div>

              {/* Score Details (If Unlocked) */}
              {unlockedFeatures[`score_analysis_${profile.id}`] && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-5 bg-pink-50 p-4 rounded-xl border border-pink-100">
                  <h4 className="text-xs font-bold text-pink-800 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1.5" /> 匹配分数解析细节
                  </h4>
                  <div className="space-y-2">
                    {profile.scoreDetails.map((detail, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className={detail.text}>{detail.label}</span>
                        <div className="flex items-center">
                          <div className={`w-24 h-1.5 ${detail.bg} rounded-full mr-2 overflow-hidden`}>
                            <div className={`h-full ${detail.color} rounded-full`} style={{ width: `${detail.value}%` }}></div>
                          </div>
                          <span className={`font-bold ${detail.text} w-6 text-right`}>{detail.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Basic Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2.5 rounded-xl">
                  <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="truncate">{profile.job}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2.5 rounded-xl">
                  <GraduationCap className="w-4 h-4 mr-2 text-indigo-500" />
                  <span className="truncate">{profile.education}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-2.5 rounded-xl">
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="truncate">{profile.location}</span>
                </div>
                <div 
                  className={`flex items-center text-sm p-2.5 rounded-xl transition-colors ${unlockedFeatures[`detailed_info_${profile.id}`] ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-gray-50 text-gray-600 cursor-pointer hover:bg-gray-100'}`}
                  onClick={() => handleUnlock('detailed_info', '心仪对象具体信息查看 (资产/房产)', 19.9, profile.id)}
                >
                  <Home className={`w-4 h-4 mr-2 ${unlockedFeatures[`detailed_info_${profile.id}`] ? 'text-teal-500' : 'text-gray-400'}`} />
                  <span className="truncate">
                    {unlockedFeatures[`detailed_info_${profile.id}`] ? profile.assets : '查看资产详情'}
                  </span>
                  {!unlockedFeatures[`detailed_info_${profile.id}`] && <Lock className="w-3 h-3 ml-auto text-gray-400" />}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">个人标签</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.tags.map((tag, idx) => (
                    <span key={idx} className="bg-pink-50 text-pink-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-pink-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Personality & Interests */}
              <div className="mb-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">关于我</h4>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {profile.intro}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">性格与爱好</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-purple-100 flex items-center shadow-sm">
                      <Sparkles className="w-3 h-3 mr-1" /> {profile.mbti}
                    </span>
                    {profile.hobbies.map((hobby, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-100">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-purple-50 rounded-2xl p-4 mb-6 border border-purple-100 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
                <div className="flex justify-between items-center mb-2 relative z-10">
                  <h4 className="text-xs font-bold text-purple-800 flex items-center">
                    <Bot className="w-4 h-4 mr-1.5" /> AI 深度分析
                  </h4>
                  <button 
                    onClick={() => handleUnlock('deep_report', '匹配报告深度解读', 29.9, profile.id)} 
                    className={`text-[10px] px-2 py-1 rounded-md flex items-center transition-colors ${unlockedFeatures[`deep_report_${profile.id}`] ? 'bg-purple-100 text-purple-600' : 'bg-purple-200 text-purple-700 active:bg-purple-300'}`}
                  >
                    {unlockedFeatures[`deep_report_${profile.id}`] ? '已解锁深度报告' : <><Lock className="w-3 h-3 mr-1" /> 解锁深度解读</>}
                  </button>
                </div>
                <p className="text-sm text-purple-900 leading-relaxed relative z-10">
                  {profile.aiReason}
                </p>
                
                {unlockedFeatures[`deep_report_${profile.id}`] && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 pt-3 border-t border-purple-200/50 space-y-2 relative z-10">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-purple-700">信用分评估</span>
                      <span className="font-bold text-purple-900">{profile.creditScore} 极好</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-purple-700">门当户对属性</span>
                      <span className="font-bold text-purple-900">{profile.socialMatch}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => handleUnlock('contact_reach', '对象联系触达 (匿名打招呼)', 9.9, profile.id)} 
                  className={`flex-1 font-bold py-3.5 rounded-2xl transition-colors flex justify-center items-center shadow-sm border ${unlockedFeatures[`contact_reach_${profile.id}`] ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-pink-50 text-pink-600 active:bg-pink-100 border-pink-100'}`}
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> 
                  {unlockedFeatures[`contact_reach_${profile.id}`] ? '已打招呼' : '匿名打招呼'}
                </button>
                <button 
                  onClick={() => handleUnlock('contact_reach', '对象联系触达 (立即心动)', 9.9, profile.id)} 
                  className={`flex-1 font-bold py-3.5 rounded-2xl transition-opacity flex justify-center items-center shadow-md ${unlockedFeatures[`contact_reach_${profile.id}`] ? 'bg-gray-200 text-gray-500' : 'bg-gradient-to-r from-pink-500 to-red-500 text-white active:opacity-90 shadow-pink-200'}`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${unlockedFeatures[`contact_reach_${profile.id}`] ? 'text-gray-400' : 'fill-white'}`} /> 
                  {unlockedFeatures[`contact_reach_${profile.id}`] ? '已心动' : '立即心动'}
                </button>
              </div>
              <div className="text-center mt-4">
                <button className="text-xs text-gray-400 font-medium px-4 py-2 active:bg-gray-100 rounded-full transition-colors">
                  不太合适，跳过
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">确认支付</h3>
                <p className="text-sm text-gray-500 mt-2">开通 家长代查-包月畅查卡</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-2xl mb-6 flex justify-between items-center">
                <span className="text-gray-600">支付金额</span>
                <span className="text-2xl font-bold text-gray-800">¥99.00</span>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl shadow-md active:bg-teal-700 transition-colors flex justify-center items-center disabled:opacity-70"
                >
                  {isProcessing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Activity className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    '确认支付'
                  )}
                </button>
                <button 
                  onClick={() => setShowPayment(false)}
                  disabled={isProcessing}
                  className="w-full bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl active:bg-gray-200 transition-colors"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Events({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('破冰初识');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSingleJoinModal, setShowSingleJoinModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [singleJoinSuccess, setSingleJoinSuccess] = useState(false);
  const [isProcessingJoin, setIsProcessingJoin] = useState(false);

  const tabs = [
    { id: '破冰初识', label: '破冰初识', desc: '消除陌生感' },
    { id: '深度了解', label: '深度了解', desc: '考验默契度' },
    { id: '情感升温', label: '情感升温', desc: '浪漫专属' }
  ];

  const eventsList = [
    {
      id: 1,
      title: '剧本杀：寻找失落的时光',
      category: '破冰初识',
      date: '本周六 14:00',
      location: '沉浸式推理馆',
      goal: '通过角色扮演打破尴尬，快速了解性格',
      image: 'https://picsum.photos/seed/boardgame/400/200',
      participants: '已报 6/8 人',
      type: 'group'
    },
    {
      id: 4,
      title: '春日寻芳 · 青年徒步交友',
      category: '破冰初识',
      date: '下周六 09:00',
      location: '滨海国家森林公园',
      goal: '轻松的户外环境，自然交流无压力',
      image: 'https://picsum.photos/seed/hiking/400/200',
      participants: '已报 24/40 人',
      type: 'group'
    },
    {
      id: 2,
      title: '双人陶艺 DIY 体验',
      category: '深度了解',
      date: '本周日 15:00',
      location: '手作艺术空间',
      goal: '需要耐心与协作，考验双方默契度',
      image: 'https://picsum.photos/seed/pottery/400/200',
      participants: '仅限双人报名',
      type: 'couple'
    },
    {
      id: 5,
      title: '密室逃脱：量子危机',
      category: '深度了解',
      date: '下周三 19:30',
      location: 'X-Space 密室',
      goal: '在紧张环境中观察对方的抗压与解谜能力',
      image: 'https://picsum.photos/seed/escape/400/200',
      participants: '已报 2/6 人',
      type: 'group'
    },
    {
      id: 3,
      title: '星空露营音乐会',
      category: '情感升温',
      date: '下周五 19:00',
      location: '郊野星空营地',
      goal: '浪漫氛围，适合互有好感的阶段表白',
      image: 'https://picsum.photos/seed/camping/400/200',
      participants: '已报 12/20 人',
      type: 'group'
    },
    {
      id: 6,
      title: '黑珍珠法式双人晚宴',
      category: '情感升温',
      date: '随时预约',
      location: 'L\'Amour 餐厅',
      goal: '极致浪漫体验，专属两人的私密时光',
      image: 'https://picsum.photos/seed/dining/400/200',
      participants: '需提前预约',
      type: 'couple'
    }
  ];

  const activeMatches = [
    { id: 8921, name: '李女士', status: '热聊中', avatar: 'https://picsum.photos/seed/girl1/100/100', matchScore: 96 },
    { id: 8925, name: '王女士', status: '双向心动', avatar: 'https://picsum.photos/seed/girl2/100/100', matchScore: 92 }
  ];

  const filteredEvents = eventsList.filter(e => e.category === activeTab);

  const handleInvite = (event: any) => {
    setSelectedEvent(event);
    setShowInviteModal(true);
    setInviteSuccess(false);
  };

  const confirmInvite = () => {
    setInviteSuccess(true);
    setTimeout(() => {
      setShowInviteModal(false);
      setInviteSuccess(false);
    }, 2000);
  };

  const handleSingleJoin = (event: any) => {
    setSelectedEvent(event);
    setShowSingleJoinModal(true);
    setSingleJoinSuccess(false);
  };

  const confirmSingleJoin = () => {
    setIsProcessingJoin(true);
    setTimeout(() => {
      setIsProcessingJoin(false);
      setSingleJoinSuccess(true);
      setTimeout(() => {
        setShowSingleJoinModal(false);
        setSingleJoinSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">关系升温活动</h1>
      </header>
      
      <div className="bg-white border-b border-gray-100 sticky top-[60px] z-10">
        <div className="flex p-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-1 text-center rounded-xl transition-colors ${activeTab === tab.id ? 'bg-pink-50 text-pink-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <div className="text-sm font-bold">{tab.label}</div>
              <div className={`text-[10px] mt-0.5 ${activeTab === tab.id ? 'text-pink-500' : 'text-gray-400'}`}>{tab.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="h-32 w-full relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-lg flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 text-yellow-300" />
                  {event.goal}
                </div>
                {event.type === 'couple' && (
                  <div className="absolute top-2 right-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    双人专属
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-base mb-2">{event.title}</h3>
                <div className="space-y-1.5 mb-4">
                  <p className="text-xs text-gray-500 flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400"/> {event.date}</p>
                  <p className="text-xs text-gray-500 flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400"/> {event.location}</p>
                  <p className="text-xs text-gray-500 flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-gray-400"/> {event.participants}</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleInvite(event)}
                    className="flex-1 bg-pink-50 text-pink-600 font-bold py-2.5 rounded-xl text-sm active:bg-pink-100 transition-colors border border-pink-100 flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 mr-1.5" /> 邀请TA同去
                  </button>
                  <button 
                    onClick={() => handleSingleJoin(event)}
                    className="flex-1 bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl text-sm active:bg-gray-100 transition-colors border border-gray-200"
                  >
                    单人报名
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">选择邀请对象</h3>
                  <button onClick={() => setShowInviteModal(false)} className="p-1.5 bg-gray-100 rounded-full text-gray-500 active:bg-gray-200 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!inviteSuccess ? (
                  <>
                    <div className="bg-gray-50 p-3 rounded-xl mb-4 flex items-center space-x-3 border border-gray-100">
                      <img src={selectedEvent.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{selectedEvent.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{selectedEvent.date}</p>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">最近互动</h4>
                    <div className="space-y-3 mb-6">
                      {activeMatches.map(match => (
                        <div key={match.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-pink-200 active:bg-pink-50 transition-colors cursor-pointer" onClick={confirmInvite}>
                          <div className="flex items-center space-x-3">
                            <img src={match.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <h5 className="text-sm font-bold text-gray-800">{match.name}</h5>
                              <div className="flex items-center mt-0.5 space-x-2">
                                <span className="text-[10px] bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full">{match.status}</span>
                                <span className="text-[10px] text-gray-500">契合度 {match.matchScore}%</span>
                              </div>
                            </div>
                          </div>
                          <button className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                            <Send className="w-4 h-4 ml-0.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="py-8 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">邀约已发送！</h3>
                    <p className="text-sm text-gray-500">对方将在消息列表中收到您的活动邀请</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Single Join Modal */}
      <AnimatePresence>
        {showSingleJoinModal && selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6"
            >
              {!singleJoinSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">确认单人报名</h3>
                    <p className="text-sm text-gray-500 mt-2">系统将为您智能匹配活动搭档</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-xl mb-6 flex items-center space-x-3 border border-gray-100">
                    <img src={selectedEvent.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{selectedEvent.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{selectedEvent.date}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-xl mb-6 border border-blue-100">
                    <p className="text-xs text-blue-800 leading-relaxed">
                      <Sparkles className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                      {selectedEvent.type === 'couple' 
                        ? '此活动为双人专属，单人报名后，平台将优先从您的“高契合度”嘉宾库中为您匹配搭档。' 
                        : '平台将严格控制活动男女比例为 1:1，并根据您的理想画像为您安排座位/分组。'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={confirmSingleJoin}
                      disabled={isProcessingJoin}
                      className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-md active:bg-blue-700 transition-colors flex justify-center items-center disabled:opacity-70"
                    >
                      {isProcessingJoin ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <Activity className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        '确认报名 (¥99.00)'
                      )}
                    </button>
                    <button 
                      onClick={() => setShowSingleJoinModal(false)}
                      disabled={isProcessingJoin}
                      className="w-full bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl active:bg-gray-200 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="py-8 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">报名成功！</h3>
                  <p className="text-sm text-gray-500">请留意短信及站内信的活动通知</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IdealPartner({ onBack }: { onBack: () => void }) {
  const [ageMin, setAgeMin] = useState('24');
  const [ageMax, setAgeMax] = useState('32');
  const [education, setEducation] = useState('本科');
  const [selectedTraits, setSelectedTraits] = useState<string[]>(['体制内', '情绪稳定', '热爱运动']);
  const [matchFocus, setMatchFocus] = useState(70); // 0 to 100

  const allTraits = ['体制内', '情绪稳定', '热爱运动', '顾家', '幽默', '喜欢宠物', '不抽烟'];

  const toggleTrait = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 mr-2 text-gray-600 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-800 flex-1 text-center mr-8">理想伴侣画像</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="bg-pink-50/50 border border-pink-100 rounded-xl p-4 mb-4 flex items-start space-x-3">
          <Target className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-pink-700 leading-relaxed">
            AI 将根据您设置的理想画像，在每日缘分推送中为您精准匹配最合适的人选。
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">年龄要求</label>
            <div className="flex items-center space-x-3">
              <input 
                type="number" 
                value={ageMin} 
                onChange={(e) => setAgeMin(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
              <span className="text-gray-400">-</span>
              <input 
                type="number" 
                value={ageMax} 
                onChange={(e) => setAgeMax(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">最低学历</label>
            <div className="relative">
              <select 
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                <option value="大专">大专</option>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">期望特质 (多选)</label>
            <div className="flex flex-wrap gap-2">
              {allTraits.map(trait => (
                <button
                  key={trait}
                  onClick={() => toggleTrait(trait)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                    selectedTraits.includes(trait) 
                      ? 'bg-pink-50 text-pink-600 border-pink-200' 
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">AI 匹配侧重</label>
            <div className="relative pt-1">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={matchFocus}
                onChange={(e) => setMatchFocus(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>更看重客观条件</span>
                <span>更看重性格契合</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button 
          onClick={onBack}
          className="w-full bg-[#E50066] text-white font-bold py-3.5 rounded-xl shadow-md active:bg-[#C40055] transition-colors"
        >
          保存画像
        </button>
      </div>
    </div>
  );
}

function AICoach({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: '你好！我是你的专属 AI 恋爱导师。我可以为你提供以下咨询服务：\n\n1. 破冰话题生成\n2. 约会方案策划\n3. 聊天语态分析\n4. 情感升温指南\n\n请问你现在遇到什么情感问题，或者需要哪方面的帮助呢？' }
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
        text: '我已经收到你的问题。作为一个 AI 导师，我会根据你的具体情况为你提供专业的建议。请稍等，我正在为你分析...' 
      }]);
    }, 1000);
  };

  const quickPrompts = [
    '帮我生成一个破冰话题',
    '周末约会去哪里比较好？',
    '帮我分析一下这句话的意思',
    '如何快速拉近关系？'
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <header className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 mr-2 text-gray-600 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 flex items-center justify-center mr-8">
          <Bot className="w-5 h-5 text-pink-500 mr-2" />
          <h1 className="text-lg font-bold text-gray-800">AI 恋爱导师</h1>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-2 flex-shrink-0">
                <Bot className="w-4 h-4 text-pink-500" />
              </div>
            )}
            <div className={`max-w-[75%] rounded-2xl p-3 text-sm whitespace-pre-wrap ${
              msg.type === 'user' 
                ? 'bg-pink-500 text-white rounded-tr-sm' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-gray-100 p-3">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-3 pb-1">
          {quickPrompts.map((prompt, i) => (
            <button 
              key={i}
              onClick={() => setInput(prompt)}
              className="whitespace-nowrap bg-pink-50 text-pink-600 px-3 py-1.5 rounded-full text-xs font-medium border border-pink-100 active:bg-pink-100 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="flex items-end space-x-2 bg-gray-50 rounded-2xl border border-gray-200 p-1.5 focus-within:border-pink-300 focus-within:ring-1 focus-within:ring-pink-300 transition-all">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的问题..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] py-2 px-3 text-sm text-gray-800"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 bg-pink-500 text-white rounded-xl disabled:opacity-50 disabled:bg-gray-300 active:bg-pink-600 transition-colors flex-shrink-0 mb-0.5"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main Container ---

export default function Matchmaking({ onBack }: { onBack: () => void }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);

  const [scores, setScores] = useState({
    total: 88,
    objective: 85,
    subjective: 92
  });

  const handleNavigate = (view: string, guestId?: string) => {
    if (guestId) setSelectedGuestId(guestId);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'matches': return <Matches onBack={() => setCurrentView('dashboard')} guestId={selectedGuestId} />;
      case 'aicoach': return <AICoach onBack={() => setCurrentView('dashboard')} />;
      case 'events': return <Events onBack={() => setCurrentView('dashboard')} />;
      case 'ideal_partner': return <IdealPartner onBack={() => setCurrentView('dashboard')} />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={handleNavigate} onBack={onBack} scores={scores} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentView}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full"
      >
        {renderView()}
      </motion.div>
    </AnimatePresence>
  );
}
