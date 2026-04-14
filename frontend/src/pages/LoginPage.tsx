import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-[2.5rem] w-full max-w-md shadow-premium relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-ink-1 mb-3">Welcome <span className="text-gradient">Back.</span></h1>
            <p className="text-ink-2 font-medium">Log in to manage your Fixora services.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-black uppercase text-ink-2 tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-2 group-focus-within:text-brand-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold text-ink-1 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-ink-2 tracking-widest mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-2 group-focus-within:text-brand-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold text-ink-1 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm font-bold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-line text-brand-500 focus:ring-brand-500/20" />
                <span className="text-ink-2">Remember me</span>
              </label>
              <a href="#" className="text-brand-600 hover:text-brand-700">Forgot password?</a>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full py-5 rounded-2xl shadow-brand-500/30"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : (
                <span className="flex items-center gap-2">
                  Log In <LogIn size={20} />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-ink-2 font-bold mb-4">Don't have an account?</p>
            <Link to="/register">
              <Button variant="secondary" className="w-full rounded-2xl py-4 flex items-center gap-2">
                Create Account <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-orange/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
