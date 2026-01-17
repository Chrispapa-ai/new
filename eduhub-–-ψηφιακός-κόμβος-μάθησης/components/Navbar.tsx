
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, LogOut, User } from 'lucide-react';
import { storage } from '../services/mockData';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = storage.isLoggedIn();

  const handleLogout = () => {
    storage.logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">EduHub</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 rounded-md font-medium"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:bg-red-50 transition-colors px-3 py-2 rounded-md font-medium"
                >
                  <LogOut size={18} />
                  <span>Αποσύνδεση</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors px-4 py-2 rounded-lg font-medium"
              >
                <User size={18} />
                <span>Είσοδος Εκπαιδευτή</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
