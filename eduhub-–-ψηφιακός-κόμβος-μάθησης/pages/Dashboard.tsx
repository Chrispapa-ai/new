
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/mockData';
import { LearningModule, Material, Activity, MaterialType, ActivityType } from '../types';
import { Plus, Trash2, Edit3, Save, X, Sparkles, PlusCircle, Link as LinkIcon, FileText, Play } from 'lucide-react';
import { generateQuizQuestions } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingModule, setEditingModule] = useState<LearningModule | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!storage.isLoggedIn()) {
      navigate('/login');
    }
    setModules(storage.getModules());
  }, [navigate]);

  const handleSave = () => {
    if (!title || !category) return alert('Παρακαλώ συμπληρώστε τίτλο και κατηγορία.');

    const newModule: LearningModule = {
      id: editingModule?.id || Math.random().toString(36).substr(2, 9),
      title,
      description,
      category,
      materials: editingModule?.materials || [],
      activities: editingModule?.activities || [],
      createdAt: editingModule?.createdAt || Date.now()
    };

    const updated = editingModule 
      ? modules.map(m => m.id === editingModule.id ? newModule : m)
      : [newModule, ...modules];

    setModules(updated);
    storage.saveModules(updated);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setEditingModule(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την ενότητα;')) {
      const updated = modules.filter(m => m.id !== id);
      setModules(updated);
      storage.saveModules(updated);
    }
  };

  const handleAddAIFlashcards = async (mod: LearningModule) => {
    setLoadingAI(true);
    const questions = await generateQuizQuestions(mod.title, mod.description);
    if (questions) {
      const newActivity: Activity = {
        id: Math.random().toString(36).substr(2, 9),
        title: `AI Quiz: ${mod.title}`,
        type: 'mcq',
        questions: questions.map((q: any) => ({
          ...q,
          id: Math.random().toString(36).substr(2, 9)
        }))
      };
      const updatedModules = modules.map(m => 
        m.id === mod.id ? { ...m, activities: [...m.activities, newActivity] } : m
      );
      setModules(updatedModules);
      storage.saveModules(updatedModules);
      alert('Το AI Quiz δημιουργήθηκε με επιτυχία!');
    } else {
      alert('Αποτυχία δημιουργίας περιεχομένου AI. Ελέγξτε το API key.');
    }
    setLoadingAI(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Διαχείριση Εκπαιδευτή</h1>
          <p className="text-slate-500">Προσθέστε, επεξεργαστείτε ή διαγράψτε ενότητες μάθησης.</p>
        </div>
        {!isAdding && !editingModule && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <Plus size={20} />
            <span>Νέα Ενότητα</span>
          </button>
        )}
      </div>

      {(isAdding || editingModule) && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{editingModule ? 'Επεξεργασία Ενότητας' : 'Δημιουργία Νέας Ενότητας'}</h2>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Τίτλος</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="π.χ. Βασική Φυσική"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Κατηγορία</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="π.χ. Φυσική"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Περιγραφή</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[116px] px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Λίγα λόγια για την ενότητα..."
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button onClick={resetForm} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-xl">Ακύρωση</button>
            <button onClick={handleSave} className="flex items-center space-x-2 bg-indigo-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-indigo-700">
              <Save size={18} />
              <span>Αποθήκευση</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {modules.map(mod => (
          <div key={mod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-indigo-200 transition-all">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-grow">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                    {mod.category}
                  </span>
                  <span className="text-xs text-slate-400">ID: {mod.id}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{mod.title}</h3>
                <p className="text-slate-500 text-sm mt-1 line-clamp-1">{mod.description}</p>
                <div className="flex items-center space-x-4 mt-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center space-x-1"><FileText size={14} /> <span>{mod.materials.length} Αρχεία</span></span>
                  <span className="flex items-center space-x-1"><Sparkles size={14} /> <span>{mod.activities.length} Δραστηριότητες</span></span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => {
                    setEditingModule(mod);
                    setTitle(mod.title);
                    setCategory(mod.category);
                    setDescription(mod.description);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-3 text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                  title="Επεξεργασία"
                >
                  <Edit3 size={20} />
                </button>
                <button 
                  disabled={loadingAI}
                  onClick={() => handleAddAIFlashcards(mod)}
                  className="flex items-center space-x-2 px-4 py-3 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all font-semibold text-sm disabled:opacity-50"
                  title="Δημιουργία AI Quiz"
                >
                  <Sparkles size={18} className={loadingAI ? "animate-pulse" : ""} />
                  <span>{loadingAI ? 'AI Δημιουργία...' : 'AI Quiz'}</span>
                </button>
                <button 
                  onClick={() => handleDelete(mod.id)}
                  className="p-3 text-slate-600 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                  title="Διαγραφή"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="px-8 pb-6 bg-slate-50/50 flex flex-wrap gap-2 border-t border-slate-100 py-3">
               <button className="text-[10px] flex items-center space-x-1 px-3 py-1 bg-white border border-slate-200 rounded-full hover:border-indigo-500 transition-colors">
                  <PlusCircle size={12} className="text-indigo-600" />
                  <span>Προσθήκη Υλικού</span>
               </button>
               <button className="text-[10px] flex items-center space-x-1 px-3 py-1 bg-white border border-slate-200 rounded-full hover:border-indigo-500 transition-colors">
                  <PlusCircle size={12} className="text-indigo-600" />
                  <span>Προσθήκη Quiz</span>
               </button>
            </div>
          </div>
        ))}

        {modules.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">Δεν έχετε δημιουργήσει ακόμα ενότητες.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
