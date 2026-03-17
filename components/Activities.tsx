"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MapPin, Clock, Users, Camera, CheckCircle2, FileText, Image as ImageIcon, MessageSquare, Send, QrCode, X, Video, Play } from 'lucide-react';

// Types
type Activity = {
  id: number;
  title: string;
  date: string;
  location: string;
  status: '报名中' | '进行中' | '已结束';
  participants: string;
  img: string;
  desc: string;
  type: string;
};

function ActivityDetail({ activity, onBack }: { activity: Activity, onBack: () => void }) {
  const [detailTab, setDetailTab] = useState<'info' | 'photos' | 'review'>('info');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [mediaItems, setMediaItems] = useState([
    { id: 1, type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', isHighlight: true },
    { id: 2, type: 'image', url: 'https://picsum.photos/seed/act1/400/400' },
    { id: 3, type: 'image', url: 'https://picsum.photos/seed/act2/400/400' },
    { id: 4, type: 'image', url: 'https://picsum.photos/seed/act3/400/400' },
    { id: 5, type: 'image', url: 'https://picsum.photos/seed/act4/400/400' },
  ]);
  const [reviews, setReviews] = useState([
    { id: 1, user: '李四', avatar: 'https://picsum.photos/seed/user1/100/100', content: '活动非常棒，组织得很好！', time: '2小时前' },
    { id: 2, user: '王五', avatar: 'https://picsum.photos/seed/user2/100/100', content: '希望下次还能参加类似活动。', time: '5小时前' }
  ]);
  const [newReview, setNewReview] = useState('');

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleAddMedia = (type: 'image' | 'video') => {
    setMediaItems([
      { 
        id: Date.now(), 
        type: type, 
        url: type === 'video' ? 'https://www.w3schools.com/html/mov_bbb.mp4' : 'https://picsum.photos/seed/' + Math.random() + '/400/400' 
      }, 
      ...mediaItems
    ]);
  };

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    setReviews([
      { id: Date.now(), user: '张三 (我)', avatar: 'https://picsum.photos/seed/me/100/100', content: newReview, time: '刚刚' },
      ...reviews
    ]);
    setNewReview('');
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col h-full bg-gray-50 absolute inset-0 z-30">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center mr-8 truncate">{activity.title}</h1>
      </header>

      <div className="bg-white border-b border-gray-200 flex px-4 sticky top-[60px] z-10">
        {[
          { id: 'info', label: '详情', icon: FileText },
          { id: 'photos', label: '影像集', icon: ImageIcon },
          { id: 'review', label: '活动复盘', icon: MessageSquare }
        ].map((t) => (
          <button key={t.id} onClick={() => setDetailTab(t.id as any)} className={`flex-1 py-3 text-sm font-medium relative flex items-center justify-center gap-1 ${detailTab === t.id ? 'text-red-600' : 'text-gray-500'}`}>
            <t.icon className="w-4 h-4" />
            {t.label}
            {detailTab === t.id && <motion.div layoutId="detail-tab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-red-600 rounded-t-full" />}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto pb-24">
        {detailTab === 'info' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img src={activity.img} alt={activity.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800 pr-2">{activity.title}</h2>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md border border-blue-100 whitespace-nowrap">
                    {activity.type}
                  </span>
                </div>
                <div className="space-y-2 bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" /> {activity.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" /> {activity.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-gray-400" /> 已报名: {activity.participants}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">活动介绍</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{activity.desc}</p>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-3">
              {(activity.status === '报名中' || activity.status === '进行中') && !isSignedUp && (
                <button onClick={() => setShowSignUpModal(true)} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-md active:scale-95 transition-transform">
                  立即报名
                </button>
              )}
              
              {(activity.status === '报名中' || activity.status === '进行中') && isSignedUp && (
                <>
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-2">
                    <QrCode className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="font-bold text-gray-800">
                    {activity.status === '进行中' ? '现场签到' : '报名成功'}
                  </h3>
                  <p className="text-xs text-gray-500 text-center mb-2">
                    {activity.status === '进行中' ? '请出示您的专属二维码完成签到' : '活动尚未开始，请凭二维码入场'}
                  </p>
                  <button 
                    onClick={() => setShowQRModal(true)}
                    className={`w-full py-3 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2
                      ${isSignedIn ? 'bg-green-500 text-white' : 'bg-red-600 text-white active:scale-95'}`}
                  >
                    {isSignedIn ? <><CheckCircle2 className="w-5 h-5" /> 签到成功</> : <><QrCode className="w-5 h-5" /> {activity.status === '进行中' ? '出示签到码' : '查看入场码'}</>}
                  </button>
                </>
              )}

              {activity.status === '已结束' && (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">活动已圆满结束</p>
                  <p className="text-xs text-gray-400">去看看大家的精彩瞬间和复盘吧</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {detailTab === 'photos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800">精彩瞬间</h3>
              <div className="flex gap-2">
                <button onClick={() => handleAddMedia('image')} className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-full font-medium active:bg-red-100 transition-colors">
                  <Camera className="w-3.5 h-3.5" /> 上传照片
                </button>
                <button onClick={() => handleAddMedia('video')} className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium active:bg-blue-100 transition-colors">
                  <Video className="w-3.5 h-3.5" /> 上传影像
                </button>
              </div>
            </div>

            {/* Highlight Video Auto-play */}
            {mediaItems.filter(m => m.isHighlight && m.type === 'video').map(video => (
              <div key={video.id} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative bg-black">
                <video 
                  src={video.url} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-48 object-cover opacity-90"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                  <Play className="w-3 h-3" /> 官方高光时刻
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2">
              {mediaItems.filter(m => !m.isHighlight).map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="aspect-square rounded-xl overflow-hidden shadow-sm relative bg-gray-100">
                  {item.type === 'video' ? (
                    <>
                      <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                      <div className="absolute top-2 right-2 bg-black/40 p-1.5 rounded-full">
                        <Video className="w-3 h-3 text-white" />
                      </div>
                    </>
                  ) : (
                    <img src={item.url} alt="Activity media" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {detailTab === 'review' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3">活动总结报告</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                  <p className="text-xs text-red-600 mb-1">参与人数 / 报名人数</p>
                  <p className="text-lg font-bold text-red-800">{activity.participants.split('/')[0]} <span className="text-sm font-normal text-red-600">/ {activity.participants.split('/')[1]}</span></p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                  <p className="text-xs text-green-600 mb-1">员工满意度</p>
                  <p className="text-lg font-bold text-green-800">98.5%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> 活动亮点</h4>
                  <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc marker:text-red-400">
                    <li>参与度高，各部门员工跨部门交流充分。</li>
                    <li>活动环节设置合理，兼顾了趣味性与团队协作。</li>
                    <li>后勤保障到位，物资发放及时有序。</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-blue-500" /> 综合评价</h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">
                    本次活动圆满达到了预期目标，不仅锻炼了身体，也极大提升了团队凝聚力。建议后续活动可以增加更多互动游戏环节，进一步丰富活动形式。感谢大家的积极参与！
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3">大家都在说</h3>
              <div className="space-y-3">
                {reviews.map(review => (
                  <div key={review.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                    <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-sm text-gray-800">{review.user}</span>
                        <span className="text-[10px] text-gray-400">{review.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Review Input Footer */}
      {detailTab === 'review' && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 pb-safe z-20">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <input 
              type="text" 
              placeholder="写下你的复盘心得..." 
              className="flex-1 bg-transparent outline-none text-sm text-gray-800"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddReview()}
            />
            <button 
              onClick={handleAddReview}
              disabled={!newReview.trim()} 
              className={`p-1.5 rounded-full transition-colors ${newReview.trim() ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-500'}`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">确认报名</h3>
            <p className="text-sm text-gray-600 mb-6">您确定要报名参加「{activity.title}」吗？</p>
            <div className="flex gap-3">
              <button onClick={() => setShowSignUpModal(false)} className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium active:bg-gray-200 transition-colors">取消</button>
              <button onClick={() => { setIsSignedUp(true); setShowSignUpModal(false); }} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium active:bg-red-700 transition-colors">确认报名</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col items-center relative shadow-xl">
            <button onClick={() => setShowQRModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-1">签到二维码</h3>
            <p className="text-xs text-gray-500 mb-6">请向现场工作人员出示此二维码</p>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 shadow-inner">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=sign_in_${activity.id}_user_123`} alt="QR Code" className="w-48 h-48 mix-blend-multiply" />
            </div>
            
            {!isSignedIn ? (
              <button onClick={() => { setIsSignedIn(true); setShowQRModal(false); }} className="w-full py-3 rounded-xl bg-red-600 text-white font-bold shadow-md active:scale-95 transition-transform">
                模拟工作人员扫码
              </button>
            ) : (
              <div className="w-full py-3 rounded-xl bg-green-50 text-green-600 font-bold flex items-center justify-center gap-2 border border-green-100">
                <CheckCircle2 className="w-5 h-5" /> 已完成签到
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default function Activities({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState('all');
  const [selectedType, setSelectedType] = useState('全部');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  
  const activities: Activity[] = [
    { id: 1, title: '2026春季员工徒步大会', date: '2026-03-20 09:00', location: '奥林匹克森林公园', status: '报名中', participants: '128/200', img: 'https://picsum.photos/seed/hike/400/200', desc: '春暖花开，正是踏青好时节。工会组织全体员工前往奥林匹克森林公园开展徒步活动，强身健体，增进交流。', type: '体育健身' },
    { id: 2, title: '青年员工心理健康讲座', date: '2026-03-17 14:00', location: '公司A座3层报告厅', status: '进行中', participants: '45/100', img: 'https://picsum.photos/seed/lecture/400/200', desc: '特邀知名心理学专家，为青年员工解答职场压力、情绪管理等问题，助力心理健康。', type: '关爱讲堂' },
    { id: 3, title: '三八妇女节插花艺术体验', date: '2026-03-08 14:00', location: '员工活动中心', status: '已结束', participants: '50/50', img: 'https://picsum.photos/seed/flower/400/200', desc: '庆祝三八妇女节，邀请专业花艺师现场指导，体验插花艺术，感受生活之美。', type: '文艺活动' },
    { id: 4, title: '工会杯篮球联赛开幕式', date: '2026-04-01 10:00', location: '公司体育馆', status: '报名中', participants: '80/100', img: 'https://picsum.photos/seed/basketball/400/200', desc: '年度篮球盛宴即将开启，各部门代表队将展开激烈角逐，欢迎大家踊跃报名观赛。', type: '体育健身' },
  ];

  const types = ['全部', '体育健身', '关爱讲堂', '文艺活动', '技能培训'];

  const filteredActivities = activities.filter(act => {
    const matchStatus = tab === 'all' || 
                        (tab === 'active' && (act.status === '报名中' || act.status === '进行中')) || 
                        (tab === 'ended' && act.status === '已结束');
    const matchType = selectedType === '全部' || act.type === selectedType;
    return matchStatus && matchType;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <AnimatePresence mode="wait">
        {!selectedActivity ? (
          <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
            <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center shadow-sm">
              <button onClick={onBack} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-bold flex-1 text-center mr-8">工会活动</h1>
            </header>
            
            <div className="bg-white border-b border-gray-200 flex px-4 sticky top-[60px] z-10">
              {['全部', '进行/报名', '已结束'].map((t, i) => {
                const keys = ['all', 'active', 'ended'];
                const key = keys[i];
                return (
                  <button key={key} onClick={() => setTab(key)} className={`flex-1 py-3 text-sm font-medium relative ${tab === key ? 'text-red-600' : 'text-gray-500'}`}>
                    {t}
                    {tab === key && <motion.div layoutId="act-tab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-red-600 rounded-t-full" />}
                  </button>
                );
              })}
            </div>

            {/* Type Filter Pills */}
            <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-[108px] z-10 overflow-x-auto no-scrollbar">
              <div className="flex space-x-2">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedType === t 
                        ? 'bg-red-600 text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <main className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
              {filteredActivities.map((act, i) => (
                <motion.div 
                  key={act.id} 
                  onClick={() => setSelectedActivity(act)}
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.1 }} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="h-32 w-full relative">
                    <img src={act.img} alt={act.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-[10px] font-bold shadow-sm backdrop-blur-sm
                      ${act.status === '进行中' ? 'bg-green-500/90 text-white' : 
                        act.status === '已结束' ? 'bg-gray-500/90 text-white' : 
                        'bg-white/90 text-red-600'}`}
                    >
                      {act.status}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-base pr-2">{act.title}</h3>
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 whitespace-nowrap">
                        {act.type}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {act.date}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> {act.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3.5 h-3.5 mr-1.5 text-gray-400" /> 已报名: {act.participants}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </main>
          </motion.div>
        ) : (
          <ActivityDetail key="detail" activity={selectedActivity} onBack={() => setSelectedActivity(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
