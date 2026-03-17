"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Heart, Sparkles, ShieldCheck, Lock, MessageCircle, 
  UserCheck, Bot, User, Target, EyeOff, Settings, Send, Image as ImageIcon,
  Edit3, Save, Coffee, Users, X, MapPin, Briefcase, GraduationCap, Ruler, Activity, Compass, Eye, CheckCircle2, CreditCard, ChevronRight, Home, Utensils, Calendar, Check
} from 'lucide-react';

// --- Sub-views ---

function Dashboard({ onNavigate, onBack, scores }: { onNavigate: (v: string) => void, onBack: () => void, scores: { total: number, objective: number, subjective: number } }) {
  const [showScoreDetails, setShowScoreDetails] = useState(false);
  const [showAITutorIntro, setShowAITutorIntro] = useState(false);

  return (
    <div className="flex flex-col h-full bg-pink-50/30">
      <header className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 sticky top-0 z-20 flex items-center shadow-md">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-white/20 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center mr-8">
          <h1 className="text-lg font-bold flex items-center justify-center">
            <Heart className="w-5 h-5 mr-1 fill-white" /> 数字鹊桥
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Index Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
          onClick={() => setShowScoreDetails(true)}
          className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full -mr-10 -mt-10 blur-2xl opacity-50"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 className="text-gray-800 font-bold text-lg flex items-center">
                个人婚恋综合指数
              </h2>
              <p className="text-xs text-gray-500 mt-1">基于客观条件与主观性格综合评估</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-md shadow-pink-200">
              <span className="text-white font-bold text-2xl">{scores.total}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">客观条件得分</p>
              <div className="flex items-end space-x-2">
                <span className="text-lg font-bold text-gray-800">{scores.objective}</span>
                <span className="text-[10px] text-green-500 mb-1">+2 (学历/稳定)</span>
              </div>
            </div>
            <div className="bg-pink-50 rounded-xl p-3 border border-pink-100">
              <p className="text-xs text-pink-600 mb-1">主观契合得分</p>
              <div className="flex items-end space-x-2">
                <span className="text-lg font-bold text-pink-700">{scores.subjective}</span>
                <span className="text-[10px] text-pink-500 mb-1">性格极佳</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform & Personal Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-3">
          {/* Personal Stats */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100">
            <h3 className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">我的缘分</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-blue-500"/> 今日推荐</span>
                <span className="font-bold text-gray-800 text-sm">12 <span className="text-[10px] font-normal text-gray-400">人</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 flex items-center"><MessageCircle className="w-3.5 h-3.5 mr-1.5 text-green-500"/> 热聊中</span>
                <span className="font-bold text-gray-800 text-sm">3 <span className="text-[10px] font-normal text-gray-400">人</span></span>
              </div>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-4 shadow-sm border border-pink-100">
            <h3 className="text-[10px] font-bold text-pink-400 mb-3 uppercase tracking-wider">平台实时</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 flex items-center"><Activity className="w-3.5 h-3.5 mr-1.5 text-pink-500"/> 活跃热聊</span>
                <span className="font-bold text-pink-700 text-sm">1,284 <span className="text-[10px] font-normal text-pink-400">人</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 flex items-center"><Heart className="w-3.5 h-3.5 mr-1.5 text-red-500"/> 成功撮合</span>
                <span className="font-bold text-red-700 text-sm">8,592 <span className="text-[10px] font-normal text-red-400">对</span></span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Features Grid */}
        <div>
          <h3 className="font-bold text-gray-800 text-base mb-3 px-1">核心功能</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'profile', title: '个人空间', desc: '信息维护与隐私', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
              { id: 'ideal', title: '理想伴侣', desc: '定制TA的画像', icon: Target, color: 'text-orange-500', bg: 'bg-orange-50' },
              { id: 'matches', title: '缘分推送', desc: '每日精准匹配', icon: Sparkles, color: 'text-pink-500', bg: 'bg-pink-50' },
              { id: 'chat', title: '匿名聊天', desc: '安全无压交流', icon: MessageCircle, color: 'text-indigo-500', bg: 'bg-indigo-50' },
              { id: 'parent_proxy', title: '家长代查', desc: '长辈严格把关', icon: Eye, color: 'text-teal-500', bg: 'bg-teal-50' },
              { id: 'events', title: '线下联谊', desc: '真实见面机会', icon: Coffee, color: 'text-rose-500', bg: 'bg-rose-50' },
            ].map((feature, i) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                onClick={() => onNavigate(feature.id)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full ${feature.bg} flex items-center justify-center mb-3`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">{feature.title}</h4>
                <p className="text-[10px] text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          
          {/* AI Coach Full Width Button */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            onClick={() => setShowAITutorIntro(true)}
            className="mt-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 shadow-md text-white flex items-center justify-between active:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-base">AI 恋爱导师</h4>
                <p className="text-xs text-purple-100 mt-0.5">破冰、聊天、约会全方位协助</p>
              </div>
            </div>
            <ChevronLeft className="w-5 h-5 rotate-180 opacity-70" />
          </motion.div>
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

      {/* AI Tutor Intro Modal */}
      <AnimatePresence>
        {showAITutorIntro && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="flex justify-between items-start relative z-10">
                  <Bot className="w-10 h-10 mb-2 text-purple-200" />
                  <button onClick={() => setShowAITutorIntro(false)} className="p-1.5 bg-white/20 rounded-full text-white backdrop-blur-sm active:bg-white/30 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-1 relative z-10">专属 AI 恋爱导师</h3>
                <p className="text-xs text-purple-100 opacity-90 relative z-10">破冰、聊天、约会全方位协助</p>
              </div>
              <div className="p-6 space-y-5">
                {[
                  { title: '破冰话题生成', desc: '根据对方标签生成高情商开场白，告别尬聊', icon: MessageCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { title: '约会方案策划', desc: '推荐适合体制内员工的低调、高品质约会地', icon: Compass, color: 'text-green-500', bg: 'bg-green-50' },
                  { title: '聊天语态分析', desc: '深度分析对方回复，判断好感度与情绪状态', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50' },
                  { title: '情感升温指南', desc: '从认识到牵手的全流程建议与心理辅导', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full ${feature.bg} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{feature.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => { setShowAITutorIntro(false); onNavigate('ai_coach'); }}
                  className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3.5 rounded-xl font-bold shadow-md active:opacity-90 transition-opacity flex items-center justify-center"
                >
                  开始咨询 <ChevronLeft className="w-4 h-4 rotate-180 ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Profile({ onBack, initialData, onSave }: { onBack: () => void, initialData: any, onSave: (data: any, scores: any) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const privacyOptions = ['公开', '仅好友可见', '仅心动后可见', '不可见'];
  
  const [data, setData] = useState(initialData);

  const handleSave = () => {
    setIsEditing(false);
    setIsCalculating(true);
    
    // Simulate sophisticated AI calculation
    setTimeout(() => {
      setIsCalculating(false);
      
      let objScore = 60;
      let subjScore = 60;

      const workplace = data.workplace?.value || '';
      const education = data.education?.value || '';
      const assets = data.assets?.value || '';
      const mbti = data.mbti?.value || '';
      const hobbies = data.hobbies?.value || '';
      const lifestyle = data.lifestyle?.value || '';
      const intro = data.intro?.value || '';

      // 1. Objective Score Calculation (Hard facts)
      if (workplace.includes('机关') || workplace.includes('公务员') || workplace.includes('事业')) objScore += 15;
      else if (workplace.includes('国企') || workplace.includes('央企')) objScore += 10;
      else if (workplace.length > 2) objScore += 5;

      if (education.includes('博士')) objScore += 15;
      else if (education.includes('硕士') || education.includes('研究生')) objScore += 10;
      else if (education.includes('本科')) objScore += 5;

      if (assets.includes('有房有车')) objScore += 15;
      else if (assets.includes('有房') || assets.includes('有车')) objScore += 10;

      // 2. Subjective Score Calculation (Personality & Lifestyle)
      if (mbti.length >= 4) subjScore += 10;

      const hobbyList = hobbies.split(/[,，]/).filter(Boolean);
      if (hobbyList.length >= 3) subjScore += 10;
      else if (hobbyList.length > 0) subjScore += 5;

      // Synergy: MBTI and Hobbies alignment
      const isExtrovert = mbti.toUpperCase().includes('E');
      const isIntrovert = mbti.toUpperCase().includes('I');
      const activeHobbies = ['徒步', '运动', '健身', '篮球', '旅游', '户外', '跑步'];
      const quietHobbies = ['阅读', '电影', '做饭', '音乐', '画画', '宅', '展览'];

      const hasActiveHobby = hobbyList.some((h: string) => activeHobbies.some(ah => h.includes(ah)));
      const hasQuietHobby = hobbyList.some((h: string) => quietHobbies.some(qh => h.includes(qh)));

      if (isExtrovert && hasActiveHobby) subjScore += 8;
      if (isIntrovert && hasQuietHobby) subjScore += 8;
      if (isExtrovert && hasQuietHobby) subjScore += 3; // Well-rounded
      if (isIntrovert && hasActiveHobby) subjScore += 3; // Well-rounded

      if (lifestyle.includes('规律') || lifestyle.includes('不抽烟')) subjScore += 10;
      if (intro.length > 20) subjScore += 5;

      // Add some slight randomization to simulate complex hidden weights
      objScore += Math.floor(Math.random() * 5);
      subjScore += Math.floor(Math.random() * 5);

      // Cap scores at 99
      objScore = Math.min(99, objScore);
      subjScore = Math.min(99, subjScore);

      // Total score is a weighted average (40% objective, 60% subjective)
      const totalScore = Math.round((objScore * 0.4) + (subjScore * 0.6));

      const newScores = {
        total: totalScore,
        objective: objScore,
        subjective: subjScore
      };
      
      onSave(data, newScores);
    }, 2000);
  };

  const getPrivacyIcon = (privacy: string) => {
    if (privacy === '不可见') return <EyeOff className="w-3 h-3 mr-1" />;
    if (privacy === '仅心动后可见') return <Heart className="w-3 h-3 mr-1" />;
    if (privacy === '仅好友可见') return <Users className="w-3 h-3 mr-1" />;
    return <UserCheck className="w-3 h-3 mr-1" />;
  };

  const renderField = (label: string, fieldKey: keyof typeof data, type: 'text' | 'textarea' = 'text') => {
    const field = data[fieldKey];
    
    if (!isEditing) {
      let displayValue: React.ReactNode = field.value;
      if (fieldKey === 'hobbies') {
        displayValue = (
          <div className="flex flex-wrap gap-2 mt-2">
            {field.value.split(/[,，]/).map((tag: string) => tag.trim()).filter(Boolean).map((tag: string) => (
              <span key={tag} className="bg-pink-50 text-pink-600 px-2.5 py-1 rounded-md text-xs border border-pink-100">{tag}</span>
            ))}
          </div>
        );
      } else if (type === 'textarea') {
        displayValue = <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl leading-relaxed mt-2">{field.value}</p>;
      } else {
        displayValue = <span className="text-sm font-medium text-gray-800">{field.value}</span>;
      }

      return (
        <div className="flex flex-col border-b border-gray-50 pb-3 last:border-0 last:pb-0">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">{label}</span>
            <div className="flex items-center text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded flex-shrink-0">
              {getPrivacyIcon(field.privacy)}
              {field.privacy}
            </div>
          </div>
          {displayValue}
        </div>
      );
    }

    return (
      <div className="mb-4 last:mb-0 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <select
            value={field.privacy}
            onChange={(e) => setData({ ...data, [fieldKey]: { ...field, privacy: e.target.value } })}
            className="text-xs bg-white text-gray-600 rounded-md px-2 py-1 border border-gray-200 outline-none focus:ring-1 focus:ring-pink-500 shadow-sm"
          >
            {privacyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        {type === 'textarea' ? (
          <textarea
            value={field.value}
            onChange={(e) => setData({ ...data, [fieldKey]: { ...field, value: e.target.value } })}
            className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 resize-none shadow-sm"
            rows={3}
          />
        ) : (
          <input
            type="text"
            value={field.value}
            onChange={(e) => setData({ ...data, [fieldKey]: { ...field, value: e.target.value } })}
            className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 shadow-sm"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <AnimatePresence>
        {isCalculating && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Sparkles className="w-12 h-12 text-pink-500" />
            </motion.div>
            <h3 className="mt-4 text-lg font-bold text-gray-800">AI 正在生成婚恋指数</h3>
            <p className="text-sm text-gray-500 mt-2">多维度评估客观条件与主观契合度...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">个人信息维护</h1>
        {isEditing ? (
          <button onClick={handleSave} className="text-pink-600 text-sm font-bold flex items-center px-2 py-1 bg-pink-50 rounded-lg">
            <Save className="w-4 h-4 mr-1" /> 保存
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-gray-600 text-sm font-medium flex items-center px-2 py-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit3 className="w-4 h-4 mr-1" /> 编辑
          </button>
        )}
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        <div className="bg-indigo-50 px-3 py-2 rounded-lg flex items-start text-xs text-indigo-700 border border-indigo-100 mb-2">
          <ShieldCheck className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">您的信息受到严格保护。您可以为每一项信息单独设置隐私权限，确保交友安全。</span>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center">
            <User className="w-4 h-4 mr-1.5 text-blue-500" /> 基本信息
          </h3>
          <div className={isEditing ? "space-y-0" : "space-y-4"}>
            {renderField('真实姓名', 'realName')}
            {renderField('工作单位', 'workplace')}
            {renderField('学历', 'education')}
            {renderField('年收入', 'income')}
            {renderField('房车情况', 'assets')}
          </div>
        </div>

        {/* Lifestyle & Hobbies */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center">
            <Coffee className="w-4 h-4 mr-1.5 text-orange-500" /> 生活与爱好
          </h3>
          <div className={isEditing ? "space-y-0" : "space-y-4"}>
            {renderField('MBTI 人格', 'mbti')}
            {renderField('生活习惯', 'lifestyle')}
            {renderField('兴趣爱好 (逗号分隔)', 'hobbies', 'textarea')}
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center">
            <Heart className="w-4 h-4 mr-1.5 text-pink-500" /> 自我介绍
          </h3>
          <div className={isEditing ? "space-y-0" : "space-y-4"}>
            {renderField('内心独白', 'intro', 'textarea')}
          </div>
        </div>
      </main>
    </div>
  );
}

function Matches({ onBack }: { onBack: () => void }) {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentFeature, setPaymentFeature] = useState<{id: string, title: string, price: number, profileId?: number} | null>(null);
  const [unlockedFeatures, setUnlockedFeatures] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUnlock = (featureId: string, title: string, price: number, profileId?: number) => {
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

  const recommendations = [
    {
      id: 1,
      gender: 'female',
      age: 28,
      height: '165cm',
      location: '市中心区',
      profession: '市直机关公务员',
      education: '硕士研究生',
      mbti: 'ENFJ (主人公)',
      hobbies: ['摄影', '探店', '滑雪', '做饭'],
      intro: '平时喜欢去各个城市旅行，记录生活的美好。希望能遇到一个愿意陪我一起看世界的人。性格开朗，情绪稳定。',
      tags: ['热爱健身', '性格温和', '喜欢小动物'],
      aiScore: 96,
      aiReason: '价值观高度一致，都喜欢户外运动，性格互补。',
      verified: true,
      blurImg: 'https://picsum.photos/seed/girl1/400/500?blur=8',
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
      id: 2,
      gender: 'female',
      age: 26,
      height: '162cm',
      location: '高新区',
      profession: '小学语文教师',
      education: '本科',
      mbti: 'ISFP (探险家)',
      hobbies: ['烘焙', '画画', '撸猫', '看展'],
      intro: '生活简单规律，喜欢在周末烤点小饼干，或者去美术馆安静地待一个下午。家里有一只可爱的布偶猫。',
      tags: ['顾家', '温柔体贴', '文艺青年'],
      aiScore: 92,
      aiReason: '对方的温柔体贴能很好地包容您的性格，共同的安静爱好有助于建立深层的情感连接。',
      verified: true,
      blurImg: 'https://picsum.photos/seed/girl2/400/500?blur=8',
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
      id: 3,
      gender: 'female',
      age: 29,
      height: '168cm',
      location: '滨海新区',
      profession: '三甲医院医师',
      education: '博士研究生',
      mbti: 'INTJ (建筑师)',
      hobbies: ['网球', '科幻小说', '古典乐', '自驾游'],
      intro: '工作比较忙碌但很充实，对待感情认真负责。希望另一半有自己的事业追求，能互相独立又互相扶持。',
      tags: ['独立自主', '逻辑清晰', '事业心'],
      aiScore: 88,
      aiReason: '双方都有较强的事业心，能够互相理解工作节奏，智力层面的交流会非常契合。',
      verified: true,
      blurImg: 'https://picsum.photos/seed/girl3/400/500?blur=8',
      assets: '按揭房，有车',
      creditScore: 810,
      socialMatch: '门当户对指数 92% (高知家庭，收入水平匹配)',
      scoreDetails: [
        { label: '心动指数', value: 82, color: 'bg-rose-500', bg: 'bg-rose-100', text: 'text-rose-700' },
        { label: '合拍指数', value: 98, color: 'bg-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-700' },
        { label: '幸福指数', value: 85, color: 'bg-emerald-500', bg: 'bg-emerald-100', text: 'text-emerald-700' }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">缘分推送</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-8">
        {recommendations.map((profile) => (
          <div key={profile.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-pink-100 relative">
            <div className="h-72 w-full relative bg-gray-200">
              <img src={profile.blurImg} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                <Sparkles className="w-4 h-4 mr-1.5" /> AI 契合度 {profile.aiScore}%
                {!unlockedFeatures[`score_analysis_${profile.id}`] && <Lock className="w-3 h-3 ml-1.5 opacity-70" />}
              </div>
            </div>

            <div className="p-6 pt-8 relative">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-2xl">嘉宾编号: {8920 + profile.id}</h3>
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
                  <span className="truncate">{profile.profession}</span>
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
        {showPayment && paymentFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">确认支付</h3>
                <p className="text-sm text-gray-500 mt-2">解锁增值功能：{paymentFeature.title}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-2xl mb-6 flex justify-between items-center">
                <span className="text-gray-600">支付金额</span>
                <span className="text-2xl font-bold text-gray-800">¥{paymentFeature.price.toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-pink-600 text-white font-bold py-3.5 rounded-xl shadow-md active:bg-pink-700 transition-colors flex justify-center items-center disabled:opacity-70"
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

function Chat({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center mr-8">
          <h1 className="text-base font-bold">嘉宾 8921</h1>
          <p className="text-[10px] text-gray-400">匿名聊天中 · 双方心动可解锁身份</p>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-center">
          <span className="text-[10px] bg-gray-200 text-gray-500 px-2 py-1 rounded-full">昨天 20:30</span>
        </div>
        
        {/* Received Message */}
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-pink-500" />
          </div>
          <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[75%]">
            <p className="text-sm text-gray-800">你好呀！看你的资料也喜欢户外徒步？上周末去了哪里呀？</p>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="flex justify-end mt-4">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] relative">
            <div className="absolute -top-3 -right-2 bg-purple-500 text-white text-[9px] px-2 py-0.5 rounded-full flex items-center shadow-sm">
              <Bot className="w-3 h-3 mr-0.5" /> AI 建议回复
            </div>
            <p className="text-sm text-purple-800 mt-1">是呀，上周末刚去了奥森公园走了一大圈。你平时喜欢去哪条路线？</p>
            <div className="mt-2 flex justify-end">
              <button className="text-xs bg-purple-500 text-white px-3 py-1.5 rounded-lg font-medium active:bg-purple-600 transition-colors">
                一键发送
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white p-3 border-t border-gray-100 pb-safe">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <ImageIcon className="w-6 h-6" />
          </button>
          <input 
            type="text" 
            placeholder="回复 嘉宾 8921..." 
            className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-pink-300 focus:ring-2 focus:ring-pink-100 rounded-full px-4 py-2 text-sm transition-all outline-none"
          />
          <button className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center active:bg-pink-600 transition-colors flex-shrink-0">
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}

function AICoach({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">AI 恋爱导师</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <Bot className="w-10 h-10 mb-4 text-purple-200" />
          <h2 className="text-xl font-bold mb-2">专属 AI 恋爱导师</h2>
          <p className="text-sm text-purple-100 opacity-90 leading-relaxed">
            不知道怎么开口？不知道去哪约会？遇到感情困惑？随时向我提问，我来帮你出谋划策，让脱单不再困难。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { title: '破冰话题生成', desc: '根据对方标签生成高情商开场白', icon: MessageCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
            { title: '约会方案策划', desc: '推荐适合体制内员工的低调约会地', icon: Compass, color: 'text-green-500', bg: 'bg-green-50' },
            { title: '聊天语态分析', desc: '分析对方回复，判断好感度', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50' },
            { title: '情感升温指南', desc: '从认识到牵手的全流程建议', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors cursor-pointer">
              <div className={`w-8 h-8 rounded-full ${feature.bg} flex items-center justify-center mb-3`}>
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">{feature.title}</h3>
              <p className="text-[10px] text-gray-500 leading-snug">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4">
          <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center">
            <MessageCircle className="w-4 h-4 mr-1.5 text-gray-400" /> 快速提问
          </h3>
          <div className="space-y-2">
            {['对方回复“哈哈”是什么意思？', '第一次约会穿什么比较得体？', '怎么自然地要微信？'].map((q, i) => (
              <div key={i} className="bg-gray-50 text-gray-700 text-xs p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                &quot;{q}&quot;
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function IdealPartner({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">理想伴侣画像</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        <div className="bg-pink-50 px-3 py-2 rounded-lg flex items-start text-xs text-pink-700 border border-pink-100 mb-2">
          <Target className="w-4 h-4 mr-1.5 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">AI 将根据您设置的理想画像，在每日缘分推送中为您精准匹配最合适的人选。</span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">年龄要求</label>
            <div className="flex items-center space-x-2">
              <input type="number" placeholder="最低" defaultValue={24} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center" />
              <span className="text-gray-400">-</span>
              <input type="number" placeholder="最高" defaultValue={32} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">最低学历</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-2 text-sm" defaultValue="本科">
              <option value="不限">不限</option>
              <option value="大专">大专</option>
              <option value="本科">本科</option>
              <option value="硕士">硕士</option>
              <option value="博士">博士</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">期望特质 (多选)</label>
            <div className="flex flex-wrap gap-2">
              {['体制内', '情绪稳定', '热爱运动', '顾家', '幽默', '喜欢宠物', '不抽烟'].map((tag, i) => (
                <span key={tag} className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${i < 3 ? 'bg-pink-50 text-pink-600 border-pink-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">AI 匹配侧重</label>
            <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-pink-500" />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>更看重客观条件</span>
              <span>更看重性格契合</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-pink-600 text-white font-bold py-3 rounded-xl active:bg-pink-700 transition-colors shadow-md shadow-pink-200">
          保存画像
        </button>
      </main>
    </div>
  );
}

function ParentProxy({ onBack }: { onBack: () => void }) {
  const [isPaid, setIsPaid] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPayment(false);
      setIsPaid(true);
    }, 1500);
  };

  const candidates = [
    {
      id: 1,
      name: '李先生',
      age: 29,
      profession: '市直机关公务员',
      education: '硕士研究生',
      assets: '市区全款房，代步车',
      family: '父母均为退休教师，家庭和睦无负担',
      parentScore: 98,
      parentReason: '工作稳定，家庭背景清白，父母有退休金，性格稳重踏实，非常适合结婚。',
      verified: true
    },
    {
      id: 2,
      name: '王先生',
      age: 31,
      profession: '三甲医院主治医师',
      education: '博士研究生',
      assets: '按揭房，有车',
      family: '父亲国企高管，母亲医生',
      parentScore: 95,
      parentReason: '职业受人尊敬，收入高且稳定，家庭属于高知家庭，知书达理。',
      verified: true
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8">家长代查服务</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {!isPaid ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <ShieldCheck className="w-10 h-10 mb-4 text-teal-100" />
              <h2 className="text-xl font-bold mb-2">长辈严格把关，子女幸福无忧</h2>
              <p className="text-sm text-teal-50 opacity-90 leading-relaxed">
                开通“家长代查”专属服务，您将获得更详尽的家庭背景、资产状况及稳定性评估报告，为孩子的终身大事保驾护航。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 text-base mb-4">专属特权</h3>
              <div className="space-y-4">
                {[
                  { title: '深度背景调查', desc: '查看对方家庭结构、父母职业及养老负担情况' },
                  { title: '资产状况穿透', desc: '详细了解房产、车产及负债等经济硬指标' },
                  { title: '长辈视角 AI 评估', desc: '基于传统婚恋观，提供“适婚度”与“稳定性”专项评分' },
                  { title: '专属红娘对接', desc: '发现心仪对象后，可由平台红娘代为沟通，避免尴尬' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 text-base mb-4">服务套餐</h3>
              <div className="space-y-3">
                <div className="border-2 border-teal-500 bg-teal-50 rounded-xl p-4 relative cursor-pointer">
                  <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">推荐</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-teal-900">包月畅查卡</h4>
                      <p className="text-xs text-teal-700 mt-1">30天内无限次查看详细报告</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-teal-600">¥99</span>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-teal-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-gray-800">单次查看券</h4>
                      <p className="text-xs text-gray-500 mt-1">解锁单位嘉宾的详细报告</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gray-800">¥19.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowPayment(true)}
              className="w-full bg-teal-600 text-white font-bold py-3.5 rounded-xl shadow-md active:bg-teal-700 transition-colors flex justify-center items-center"
            >
              <CreditCard className="w-5 h-5 mr-2" /> 立即开通服务
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-teal-50 px-4 py-3 rounded-xl flex items-center justify-between border border-teal-100">
              <div className="flex items-center text-teal-800">
                <ShieldCheck className="w-5 h-5 mr-2 text-teal-600" />
                <span className="text-sm font-bold">包月畅查卡生效中</span>
              </div>
              <span className="text-xs text-teal-600">剩余 29 天</span>
            </div>

            <h3 className="font-bold text-gray-800 text-base px-1">精选优质候选人 (长辈视角)</h3>
            
            {candidates.map(candidate => (
              <div key={candidate.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 flex items-center">
                      {candidate.name} 
                      {candidate.verified && <UserCheck className="w-4 h-4 ml-2 text-blue-500" />}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{candidate.age}岁 · {candidate.education}</p>
                  </div>
                  <div className="text-center bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
                    <p className="text-[10px] text-teal-600 font-bold">长辈适婚评分</p>
                    <p className="text-xl font-bold text-teal-700">{candidate.parentScore}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <Briefcase className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-gray-500 block mb-0.5">工作单位</span>
                      <span className="text-sm text-gray-800 font-medium">{candidate.profession}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-gray-500 block mb-0.5">资产状况</span>
                      <span className="text-sm text-gray-800 font-medium">{candidate.assets}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-gray-500 block mb-0.5">家庭背景</span>
                      <span className="text-sm text-gray-800 font-medium">{candidate.family}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <h5 className="text-xs font-bold text-gray-700 mb-1 flex items-center">
                    <Bot className="w-3.5 h-3.5 mr-1 text-teal-600" /> AI 把关分析
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {candidate.parentReason}
                  </p>
                </div>

                <button className="w-full bg-teal-50 text-teal-700 font-bold py-2.5 rounded-xl text-sm active:bg-teal-100 transition-colors border border-teal-100">
                  联系红娘牵线
                </button>
              </div>
            ))}
          </motion.div>
        )}
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

// --- Main Container ---

export default function Matchmaking({ onBack }: { onBack: () => void }) {
  const [currentView, setCurrentView] = useState('dashboard');

  const [profileData, setProfileData] = useState({
    realName: { value: '张三', privacy: '不可见' },
    workplace: { value: '市直属机关', privacy: '公开' },
    education: { value: '硕士研究生', privacy: '公开' },
    income: { value: '保密', privacy: '仅心动后可见' },
    assets: { value: '有房无车', privacy: '仅心动后可见' },
    mbti: { value: 'ENFJ (主人公)', privacy: '公开' },
    lifestyle: { value: '作息规律，不抽烟，偶尔小酌', privacy: '仅好友可见' },
    hobbies: { value: '户外徒步, 摄影, 做饭, 科幻电影', privacy: '公开' },
    intro: { value: '平时工作比较规律，周末喜欢去周边爬山或者在家研究新菜谱。性格比较温和，希望能遇到一个能一起分享生活点滴的人。', privacy: '公开' }
  });

  const [scores, setScores] = useState({
    total: 88,
    objective: 85,
    subjective: 92
  });

  const handleProfileSave = (newData: any, newScores: any) => {
    setProfileData(newData);
    setScores(newScores);
    setCurrentView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'profile': return <Profile onBack={() => setCurrentView('dashboard')} initialData={profileData} onSave={handleProfileSave} />;
      case 'ideal': return <IdealPartner onBack={() => setCurrentView('dashboard')} />;
      case 'matches': return <Matches onBack={() => setCurrentView('dashboard')} />;
      case 'chat': return <Chat onBack={() => setCurrentView('dashboard')} />;
      case 'ai_coach': return <AICoach onBack={() => setCurrentView('dashboard')} />;
      case 'parent_proxy': return <ParentProxy onBack={() => setCurrentView('dashboard')} />;
      case 'events': return <Events onBack={() => setCurrentView('dashboard')} />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={setCurrentView} onBack={onBack} scores={scores} />;
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
