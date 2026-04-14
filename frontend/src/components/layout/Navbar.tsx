import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, User, ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';

import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto max-w-7xl glass-panel px-6 py-3 rounded-2xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white"
          >
            <span className="font-black text-xl italic">F</span>
          </motion.div>
          <span className="font-black text-2xl tracking-tight text-gradient">Fixora</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 p-1 bg-surface-muted/50 rounded-xl border border-line">
          <NavLink to="/" className={({isActive}) => `px-4 py-2 rounded-lg font-bold transition-all ${isActive ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-2 hover:text-ink-1'}`}>
            Home
          </NavLink>
          <NavLink to="/services" className={({isActive}) => `px-4 py-2 rounded-lg font-bold transition-all ${isActive ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-2 hover:text-ink-1'}`}>
            Services
          </NavLink>
          <NavLink to="/dashboard" className={({isActive}) => `px-4 py-2 rounded-lg font-bold transition-all ${isActive ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-2 hover:text-ink-1'}`}>
            Dashboard
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-ink-2 hover:text-brand-500 transition-colors">
            <Search size={20} />
          </button>
          <Link to="/bookings" className="p-2 text-ink-2 hover:text-brand-500 transition-colors relative">
            <ShoppingBag size={20} />
            {user && <span className="absolute top-0 right-0 w-2 h-2 bg-accent-orange rounded-full"></span>}
          </Link>
          <div className="h-6 w-[1px] bg-line mx-1"></div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-black text-ink-1">{user.name}</div>
                <div className="text-[10px] uppercase font-black text-ink-2 tracking-widest">{user.role}</div>
              </div>
              <button 
                onClick={logout}
                className="glass-panel p-2 rounded-xl text-ink-2 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <User size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm" className="hidden sm:flex items-center gap-2">
                <User size={16} />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
