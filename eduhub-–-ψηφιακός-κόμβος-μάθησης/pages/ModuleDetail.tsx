
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storage } from '../services/mockData';
import { LearningModule, Material, Activity, Question, Flashcard } from '../types';
import { ArrowLeft, ExternalLink, Play, FileText, CheckCircle, HelpCircle, Layers, ChevronRight, ChevronLeft } from 'lucide-react';

const ModuleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [module, setModule] = useState<LearningModule | null>(null);
  const [activeTab, setActiveTab] = useState<'materials' | 'activities'>('materials');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showFlashcardBack, setShowFlashcardBack] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const modules = storage.getModules();
    const found = modules.find(m => m.id === id);
    if (found) setModule(found);
  }, [id]);

  if (!module) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Η ενότητα δεν βρέθηκε</h2>
      <Link to="/" className="text-indigo-600 hover:underline">Επιστροφή στην αρχική</Link>
    </div>
  );

  const renderMaterialIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play size={20} className="text-red-500" />;
      case 'pdf': return <FileText size={20} className="text-orange-500" />;
      case 'image': return <Layers size={20} className="text-blue-500" />;
      default: return <ExternalLink size={20} className="text-slate-500" />;
    }
  };

  const handleQuizSubmit = (activity: Activity) => {
    let score = 0;
    activity.questions?.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) score++;
    });
    setQuizScore(score);
  };

  const renderActivity = () => {
    if (!selectedActivity) return null;

    if (selectedActivity.type === 'mcq') {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{selectedActivity.title}</h3>
            <button onClick={() => { setSelectedActivity(null); setQuizScore(null); }} className="text-slate-400 hover:text-slate-600">
              Κλείσιμο
            </button>
          </div>
          <div className="space-y-6">
            {selectedActivity.questions?.map((q, idx) => (
              <div key={q.id} className="space-y-3">
                <p className="font-medium text-slate-800">{idx + 1}. {q.text}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {q.options?.map(opt => (
                    <button
                      key={opt}
                      disabled={quizScore !== null}
                      onClick={() => setUserAnswers({ ...userAnswers, [q.id]: opt })}
                      className={`px-4 py-2 rounded-xl text-left border transition-all ${
                        userAnswers[q.id] === opt 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                      } ${
                        quizScore !== null && opt === q.correctAnswer ? 'ring-2 ring-green-500 border-green-500' : ''
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {quizScore === null ? (
            <button 
              onClick={() => handleQuizSubmit(selectedActivity)}
              className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Υποβολή Απαντήσεων
            </button>
          ) : (
            <div className="mt-8 p-6 bg-green-50 rounded-2xl text-center border border-green-100">
              <p className="text-lg font-bold text-green-800">Συγχαρητήρια!</p>
              <p className="text-green-700">Το σκορ σου είναι: {quizScore} / {selectedActivity.questions?.length}</p>
              <button onClick={() => { setQuizScore(null); setUserAnswers({}); }} className="mt-4 text-indigo-600 hover:underline">Προσπάθησε ξανά</button>
            </div>
          )}
        </div>
      );
    }

    if (selectedActivity.type === 'flashcard') {
      const card = selectedActivity.flashcards![currentFlashcardIndex];
      return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center">
          <div className="flex justify-between items-center w-full mb-8">
            <h3 className="text-xl font-bold">Flashcards: {selectedActivity.title}</h3>
            <button onClick={() => setSelectedActivity(null)} className="text-slate-400 hover:text-slate-600">Κλείσιμο</button>
          </div>
          
          <div 
            onClick={() => setShowFlashcardBack(!showFlashcardBack)}
            className="w-full max-w-md aspect-[3/2] relative perspective cursor-pointer"
          >
            <div className={`w-full h-full transition-all duration-500 transform-style-3d relative ${showFlashcardBack ? 'rotate-y-180' : ''}`}>
              <div className="absolute inset-0 backface-hidden bg-indigo-600 text-white rounded-3xl flex items-center justify-center p-8 shadow-xl">
                <p className="text-2xl font-bold text-center">{card.front}</p>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border-2 border-indigo-600 text-indigo-600 rounded-3xl flex items-center justify-center p-8 shadow-xl">
                <p className="text-2xl font-bold text-center">{card.back}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-6">
            <button 
              disabled={currentFlashcardIndex === 0}
              onClick={() => { setCurrentFlashcardIndex(prev => prev - 1); setShowFlashcardBack(false); }}
              className="p-3 rounded-full bg-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-200"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-slate-500 font-medium">
              {currentFlashcardIndex + 1} / {selectedActivity.flashcards?.length}
            </span>
            <button 
              disabled={currentFlashcardIndex === selectedActivity.flashcards!.length - 1}
              onClick={() => { setCurrentFlashcardIndex(prev => prev + 1); setShowFlashcardBack(false); }}
              className="p-3 rounded-full bg-slate-100 text-slate-600 disabled:opacity-30 hover:bg-slate-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <p className="mt-4 text-xs text-slate-400">Κάντε κλικ στην κάρτα για να δείτε την απάντηση</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center space-x-2 text-indigo-600 font-medium hover:text-indigo-800 mb-6 transition-colors">
        <ArrowLeft size={18} />
        <span>Πίσω στην αρχική</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-4">
          {module.category}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{module.title}</h1>
        <p className="text-slate-600 leading-relaxed">{module.description}</p>
      </div>

      <div className="flex border-b border-slate-200 mb-8">
        <button 
          onClick={() => setActiveTab('materials')}
          className={`px-6 py-3 font-bold border-b-2 transition-all ${activeTab === 'materials' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Εκπαιδευτικό Υλικό
        </button>
        <button 
          onClick={() => setActiveTab('activities')}
          className={`px-6 py-3 font-bold border-b-2 transition-all ${activeTab === 'activities' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Δραστηριότητες
        </button>
      </div>

      {activeTab === 'materials' ? (
        <div className="grid grid-cols-1 gap-4">
          {module.materials.length > 0 ? (
            module.materials.map(material => (
              <a 
                key={material.id}
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm group"
              >
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                  {renderMaterialIcon(material.type)}
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="font-bold text-slate-900">{material.title}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">{material.type}</p>
                </div>
                <ExternalLink size={18} className="text-slate-300 group-hover:text-indigo-600" />
              </a>
            ))
          ) : (
            <p className="text-center py-10 text-slate-500">Δεν έχει προστεθεί υλικό ακόμα.</p>
          )}
        </div>
      ) : (
        <div>
          {selectedActivity ? renderActivity() : (
            <div className="grid grid-cols-1 gap-4">
              {module.activities.length > 0 ? (
                module.activities.map(activity => (
                  <button 
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity)}
                    className="flex items-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm text-left group"
                  >
                    <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {activity.type === 'mcq' ? <CheckCircle size={20} /> : <Layers size={20} />}
                    </div>
                    <div className="ml-4 flex-grow">
                      <h4 className="font-bold text-slate-900">{activity.title}</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">{activity.type === 'mcq' ? 'Κουίζ' : 'Flashcards'}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600" />
                  </button>
                ))
              ) : (
                <p className="text-center py-10 text-slate-500">Δεν υπάρχουν διαθέσιμες δραστηριότητες.</p>
              )}
            </div>
          )}
        </div>
      )}

      <style>{`
        .perspective { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default ModuleDetail;
