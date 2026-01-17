
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ModuleDetail from './pages/ModuleDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/module/:id" element={<ModuleDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
          <p>© 2024 EduHub – Ψηφιακός Κόμβος Μάθησης. Με τη δύναμη της τεχνητής νοημοσύνης.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
