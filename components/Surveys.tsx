"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Plus, FileQuestion, CheckCircle2, Circle, HelpCircle, X, Save, FileText, CheckSquare, AlignLeft } from 'lucide-react';
import { UserType } from './Login';

type QuestionType = 'single' | 'multiple' | 'text';

interface Question {
  id: string;
  type: QuestionType;
  title: string;
  options?: string[];
  required: boolean;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'closed';
  createdAt: string;
  questions: Question[];
  responsesCount: number;
}

export default function Surveys({ onBack, user }: { onBack: () => void, user: UserType }) {
  const [view, setView] = useState<'list' | 'create' | 'answer'>('list');
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);

  // Mock Data
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: '2026年职工食堂满意度调查',
      description: '为了更好地服务广大职工，提升食堂餐饮质量，特开展本次满意度调查。',
      status: 'active',
      createdAt: '2026-03-15',
      responsesCount: 128,
      questions: [
        { id: 'q1', type: 'single', title: '您对食堂饭菜的整体口味是否满意？', options: ['非常满意', '比较满意', '一般', '不满意'], required: true },
        { id: 'q2', type: 'multiple', title: '您希望食堂增加哪些类型的菜品？（多选）', options: ['川湘菜', '江浙菜', '面食', '轻食沙拉', '甜点饮品'], required: true },
        { id: 'q3', type: 'text', title: '您对食堂还有哪些其他建议？', required: false },
      ]
    },
    {
      id: '2',
      title: '春季工会活动意向征集',
      description: '春暖花开，工会计划组织春季活动，想听听大家的想法。',
      status: 'active',
      createdAt: '2026-03-10',
      responsesCount: 256,
      questions: [
        { id: 'q1', type: 'single', title: '您最倾向于哪种类型的春季活动？', options: ['户外踏青/徒步', '趣味运动会', '文化讲座/手工制作', '周边城市一日游'], required: true },
        { id: 'q2', type: 'text', title: '如果您有具体的活动推荐地点，请留言：', required: false },
      ]
    }
  ]);

  // Create Survey State
  const [newSurvey, setNewSurvey] = useState<Partial<Survey>>({
    title: '',
    description: '',
    questions: []
  });

  // Answer Survey State
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleCreateSurvey = () => {
    if (!newSurvey.title) {
      alert('请输入问卷标题');
      return;
    }
    if (!newSurvey.questions || newSurvey.questions.length === 0) {
      alert('请至少添加一个问题');
      return;
    }

    const survey: Survey = {
      id: Date.now().toString(),
      title: newSurvey.title,
      description: newSurvey.description || '',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      responsesCount: 0,
      questions: newSurvey.questions as Question[]
    };

    setSurveys([survey, ...surveys]);
    setView('list');
    setNewSurvey({ title: '', description: '', questions: [] });
    alert('问卷发布成功！');
  };

  const handleAddQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      type,
      title: '',
      required: true,
      options: type !== 'text' ? ['选项 1', '选项 2'] : undefined
    };
    setNewSurvey({
      ...newSurvey,
      questions: [...(newSurvey.questions || []), newQuestion]
    });
  };

  const handleUpdateQuestion = (id: string, updates: Partial<Question>) => {
    setNewSurvey({
      ...newSurvey,
      questions: newSurvey.questions?.map(q => q.id === id ? { ...q, ...updates } : q)
    });
  };

  const handleRemoveQuestion = (id: string) => {
    setNewSurvey({
      ...newSurvey,
      questions: newSurvey.questions?.filter(q => q.id !== id)
    });
  };

  const handleSubmitAnswer = () => {
    // Validate required questions
    const missingRequired = currentSurvey?.questions.find(q => q.required && (!answers[q.id] || (Array.isArray(answers[q.id]) && answers[q.id].length === 0)));
    if (missingRequired) {
      alert('请回答所有必填问题');
      return;
    }

    alert('问卷提交成功，感谢您的参与！');
    
    // Update response count
    if (currentSurvey) {
      setSurveys(surveys.map(s => s.id === currentSurvey.id ? { ...s, responsesCount: s.responsesCount + 1 } : s));
    }
    
    setView('list');
    setAnswers({});
    setCurrentSurvey(null);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <header className="bg-white text-gray-800 p-4 sticky top-0 z-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button onClick={() => {
            if (view === 'list') onBack();
            else setView('list');
          }} className="p-1 -ml-1 mr-2 active:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">
            {view === 'list' ? '调查问卷' : view === 'create' ? '新建问卷' : '填写问卷'}
          </h1>
        </div>
        {view === 'list' && user.role === 'leader' && (
          <button onClick={() => setView('create')} className="text-cyan-600 p-1 active:bg-cyan-50 rounded-full transition-colors">
            <Plus className="w-6 h-6" />
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {surveys.map((survey) => (
                <div key={survey.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{survey.title}</h3>
                    <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ml-2">
                      进行中
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{survey.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center text-xs text-gray-400 space-x-4">
                      <span>{survey.createdAt}</span>
                      <span>{survey.responsesCount} 人已参与</span>
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentSurvey(survey);
                        setView('answer');
                      }}
                      className="bg-cyan-50 text-cyan-600 text-sm font-bold px-4 py-1.5 rounded-full active:bg-cyan-100 transition-colors"
                    >
                      参与问卷
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {view === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 pb-20"
            >
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">问卷标题 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={newSurvey.title}
                    onChange={(e) => setNewSurvey({...newSurvey, title: e.target.value})}
                    placeholder="请输入问卷标题"
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">问卷说明</label>
                  <textarea 
                    value={newSurvey.description}
                    onChange={(e) => setNewSurvey({...newSurvey, description: e.target.value})}
                    placeholder="请输入问卷背景或说明"
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 px-1">题目列表</h3>
                
                {newSurvey.questions?.map((q, index) => (
                  <div key={q.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group">
                    <button 
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="bg-cyan-50 text-cyan-600 text-xs font-bold px-2 py-1 rounded-md">
                        {q.type === 'single' ? '单选题' : q.type === 'multiple' ? '多选题' : '问答题'}
                      </span>
                      <label className="flex items-center space-x-1 text-xs text-gray-500">
                        <input 
                          type="checkbox" 
                          checked={q.required}
                          onChange={(e) => handleUpdateQuestion(q.id, { required: e.target.checked })}
                          className="rounded text-cyan-500 focus:ring-cyan-500"
                        />
                        <span>必答</span>
                      </label>
                    </div>

                    <input 
                      type="text" 
                      value={q.title}
                      onChange={(e) => handleUpdateQuestion(q.id, { title: e.target.value })}
                      placeholder={`请输入第 ${index + 1} 题题目`}
                      className="w-full border-b border-gray-200 pb-2 text-sm font-medium focus:outline-none focus:border-cyan-500 mb-4"
                    />

                    {q.type !== 'text' && (
                      <div className="space-y-2">
                        {q.options?.map((opt, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-2">
                            {q.type === 'single' ? <Circle className="w-4 h-4 text-gray-300" /> : <CheckSquare className="w-4 h-4 text-gray-300" />}
                            <input 
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...(q.options || [])];
                                newOpts[optIndex] = e.target.value;
                                handleUpdateQuestion(q.id, { options: newOpts });
                              }}
                              placeholder={`选项 ${optIndex + 1}`}
                              className="flex-1 text-sm focus:outline-none border-b border-transparent focus:border-gray-200"
                            />
                            <button 
                              onClick={() => {
                                const newOpts = q.options?.filter((_, i) => i !== optIndex);
                                handleUpdateQuestion(q.id, { options: newOpts });
                              }}
                              className="text-gray-300 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            handleUpdateQuestion(q.id, { options: [...(q.options || []), `选项 ${(q.options?.length || 0) + 1}`] });
                          }}
                          className="text-xs text-cyan-600 font-medium flex items-center mt-2"
                        >
                          <Plus className="w-3 h-3 mr-1" /> 添加选项
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => handleAddQuestion('single')} className="bg-white border border-dashed border-gray-300 rounded-xl p-3 flex flex-col items-center justify-center text-gray-500 hover:border-cyan-500 hover:text-cyan-600 transition-colors">
                    <Circle className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">单选题</span>
                  </button>
                  <button onClick={() => handleAddQuestion('multiple')} className="bg-white border border-dashed border-gray-300 rounded-xl p-3 flex flex-col items-center justify-center text-gray-500 hover:border-cyan-500 hover:text-cyan-600 transition-colors">
                    <CheckSquare className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">多选题</span>
                  </button>
                  <button onClick={() => handleAddQuestion('text')} className="bg-white border border-dashed border-gray-300 rounded-xl p-3 flex flex-col items-center justify-center text-gray-500 hover:border-cyan-500 hover:text-cyan-600 transition-colors">
                    <AlignLeft className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">问答题</span>
                  </button>
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-10 max-w-md mx-auto">
                <button 
                  onClick={handleCreateSurvey}
                  className="w-full bg-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-600/20 active:bg-cyan-700 transition-colors flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  发布问卷
                </button>
              </div>
            </motion.div>
          )}

          {view === 'answer' && currentSurvey && (
            <motion.div
              key="answer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 pb-20"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{currentSurvey.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{currentSurvey.description}</p>
              </div>

              <div className="space-y-4">
                {currentSurvey.questions.map((q, index) => (
                  <div key={q.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-sm mb-4 leading-relaxed">
                      {index + 1}. {q.title}
                      {q.required && <span className="text-red-500 ml-1">*</span>}
                      <span className="text-xs font-normal text-gray-400 ml-2">
                        ({q.type === 'single' ? '单选' : q.type === 'multiple' ? '多选' : '问答'})
                      </span>
                    </h3>

                    {q.type === 'text' ? (
                      <textarea 
                        value={answers[q.id] || ''}
                        onChange={(e) => setAnswers({...answers, [q.id]: e.target.value})}
                        placeholder="请输入您的回答..."
                        rows={4}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none bg-gray-50"
                      />
                    ) : (
                      <div className="space-y-3">
                        {q.options?.map((opt, optIndex) => {
                          const isSelected = q.type === 'single' 
                            ? answers[q.id] === opt 
                            : (answers[q.id] || []).includes(opt);

                          return (
                            <label 
                              key={optIndex} 
                              className={`flex items-start p-3 rounded-xl border cursor-pointer transition-colors ${isSelected ? 'border-cyan-500 bg-cyan-50/30' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
                            >
                              <div className="flex-shrink-0 mt-0.5 mr-3">
                                {q.type === 'single' ? (
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-500' : 'border-gray-300'}`}>
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
                                  </div>
                                ) : (
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300'}`}>
                                    {isSelected && <CheckSquare className="w-3 h-3 text-white" />}
                                  </div>
                                )}
                              </div>
                              <input 
                                type={q.type === 'single' ? 'radio' : 'checkbox'}
                                name={q.id}
                                value={opt}
                                className="sr-only"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (q.type === 'single') {
                                    setAnswers({...answers, [q.id]: opt});
                                  } else {
                                    const current = answers[q.id] || [];
                                    if (e.target.checked) {
                                      setAnswers({...answers, [q.id]: [...current, opt]});
                                    } else {
                                      setAnswers({...answers, [q.id]: current.filter((item: string) => item !== opt)});
                                    }
                                  }
                                }}
                              />
                              <span className={`text-sm ${isSelected ? 'text-cyan-800 font-medium' : 'text-gray-700'}`}>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-10 max-w-md mx-auto">
                <button 
                  onClick={handleSubmitAnswer}
                  className="w-full bg-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-600/20 active:bg-cyan-700 transition-colors"
                >
                  提交问卷
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
