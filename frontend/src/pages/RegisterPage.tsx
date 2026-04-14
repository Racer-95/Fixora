import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowLeft, ShieldCheck, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await register({ name, email, password, role });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 md:p-12 rounded-[3rem] w-full max-w-lg shadow-premium relative overflow-hidden"
      >
        <div className="relative z-10">
          <Link to="/login" className="inline-flex items-center gap-2 text-ink-2 hover:text-brand-600 font-bold text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Login
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-ink-1 mb-3">Join <span className="text-gradient">Fixora.</span></h1>
            <p className="text-ink-2 font-medium">Create your account to start booking or providing services.</p>
          </div>

          <div className="flex p-1 bg-surface-muted rounded-2xl mb-10 border border-line">
            <button 
              onClick={() => setRole('customer')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black transition-all ${role === 'customer' ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-2 hover:text-ink-1'}`}
            >
              <User size={18} /> Customer
            </button>
            <button 
              onClick={() => setRole('provider')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black transition-all ${role === 'provider' ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-2 hover:text-ink-1'}`}
            >
              <Briefcase size={18} /> Provider
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {error && (
              <div className="md:col-span-2 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold">
                {error}
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase text-ink-2 tracking-widest mb-2 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-2 group-focus-within:text-brand-500 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold text-ink-1"
                />
              </div>
            </div>

            <div className="md:col-span-2">
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
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold text-ink-1"
                />
              </div>
            </div>

            <div className="md:col-span-2">
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
                  className="w-full pl-12 pr-4 py-4 bg-white border border-line rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-bold text-ink-1"
                />
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-100 mb-8 flex items-start gap-4">
                <ShieldCheck className="text-brand-600 mt-1 shrink-0" size={20} />
                <p className="text-sm text-brand-800 font-bold leading-relaxed">
                  By joining, you agree to Fixora's Terms of Service and Privacy Policy. Your data is encrypted and secure.
                </p>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full py-5 rounded-2xl shadow-brand-500/30"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : (
                  <span className="flex items-center gap-2">
                    Create {role === 'customer' ? 'Customer' : 'Provider'} Account <UserPlus size={20} />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
