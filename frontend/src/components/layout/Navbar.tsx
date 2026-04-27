import React, { useState, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, X } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/useAuth';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/services?q=${encodeURIComponent(query.trim())}`);
      closeSearch();
    } else {
      navigate('/services');
      closeSearch();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto max-w-7xl glass-panel px-6 py-3 rounded-2xl flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white"
          >
            <span className="font-black text-xl italic">F</span>
          </motion.div>
          <span className="font-black text-2xl tracking-tight text-gradient">Fixora</span>
        </Link>

        {/* Nav Links — hidden when search is open on small screens */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-surface-muted/50 rounded-xl border border-line">
          <NavLink to="/" end className={({isActive}) => `px-4 py-2 rounded-lg font-bold transition-all ${isActive ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-2 hover:text-ink-1'}`}>
            Home
          </NavLink>
          <NavLink to="/services" className={({isActive}) => `px-4 py-2 rounded-lg font-bold transition-all ${isActive ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-2 hover:text-ink-1'}`}>
            Services
          </NavLink>
          <NavLink to="/dashboard" className={({isActive}) => `px-4 py-2 rounded-lg font-bold transition-all ${isActive ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-2 hover:text-ink-1'}`}>
            Dashboard
          </NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Expandable Search */}
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.form
                key="search-open"
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 40, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSearch}
                className="flex items-center gap-2 bg-surface-muted border border-line rounded-xl px-3 py-2 overflow-hidden"
              >
                <Search size={16} className="text-ink-2 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search services..."
                  className="flex-1 bg-transparent text-sm font-medium text-ink-1 focus:outline-none placeholder:text-ink-2 min-w-0"
                />
                <button type="button" onClick={closeSearch} className="text-ink-2 hover:text-ink-1 shrink-0">
                  <X size={16} />
                </button>
              </motion.form>
            ) : (
              <motion.button
                key="search-closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={openSearch}
                className="p-2 text-ink-2 hover:text-brand-500 transition-colors"
                title="Search"
              >
                <Search size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="h-6 w-[1px] bg-line mx-1" />

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
