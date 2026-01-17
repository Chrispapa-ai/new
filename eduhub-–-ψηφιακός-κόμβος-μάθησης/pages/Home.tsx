
import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Clock, Tag } from 'lucide-react';
import { storage } from '../services/mockData';
import { LearningModule } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setModules(storage.getModules());
  }, []);

  const categories = ['All', ...new Set(modules.map(m => m.category))];

  const filteredModules = modules.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center py-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl shadow-xl text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ψηφιακός Κόμβος Μάθησης</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto px-4">
          Ανακαλύψτε εκπαιδευτικό υλικό, διαδραστικές ασκήσεις και ενότητες μάθησης για κάθε γνωστικό αντικείμενο.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Αναζήτηση μαθήματος..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Filter size={20} className="text-slate-500 hidden md:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.length > 0 ? (
          filteredModules.map(module => (
            <Link 
              key={module.id} 
              to={`/module/${module.id}`}
              className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {module.category}
                </span>
                <Clock size={16} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {module.title}
              </h3>
              <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                {module.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center space-x-1">
                    <BookOpen size={14} />
                    <span>{module.materials.length} Αρχεία</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag size={14} />
                    <span>{module.activities.length} Δραστηριότητες</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  →
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">Δεν βρέθηκαν ενότητες</h3>
            <p className="text-slate-500">Δοκιμάστε διαφορετικούς όρους αναζήτησης ή φίλτρα.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
