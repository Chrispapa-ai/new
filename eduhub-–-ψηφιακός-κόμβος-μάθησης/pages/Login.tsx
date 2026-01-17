
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/mockData';
import { GraduationCap, Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (storage.login(password)) {
      navigate('/dashboard');
      window.location.reload();
    } else {
      setError('Λάθος κωδικός πρόσβασης (Hint: admin123)');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-2xl mb-4 shadow-lg shadow-indigo-200">
            <GraduationCap size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Είσοδος Εκπαιδευτή</h1>
          <p className="text-slate-500 text-sm">Συνδεθείτε για να διαχειριστείτε το υλικό σας.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                defaultValue="admin@eduhub.gr"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-400 cursor-not-allowed" 
                disabled
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">Κωδικός Πρόσβασης</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-medium bg-red-50 p-2 rounded-lg text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-extrabold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Σύνδεση
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Η πρόσβαση περιορίζεται μόνο σε πιστοποιημένους εκπαιδευτές.
        </p>
      </div>
    </div>
  );
};

export default Login;
