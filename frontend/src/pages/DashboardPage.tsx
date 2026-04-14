import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  ShoppingBag, 
  CreditCard, 
  Bell, 
  Search, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Star
} from 'lucide-react';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Profile Header */}
        <div className="glass-panel p-8 rounded-[3rem] mb-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
                alt="User" 
                className="w-24 h-24 rounded-[2rem] object-cover shadow-premium border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white border-2 border-white">
                <Settings size={16} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-ink-1">Alex Johnson</h1>
              <p className="text-ink-2 font-bold flex items-center gap-2">
                <Star size={16} className="text-accent-orange fill-accent-orange" />
                Premium Member since 2024
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-6 border-r border-line">
              <div className="text-3xl font-black text-brand-600">12</div>
              <div className="text-xs font-black uppercase text-ink-2 tracking-widest">Bookings</div>
            </div>
            <div className="text-center px-6">
              <div className="text-3xl font-black text-brand-600">$1.2k</div>
              <div className="text-xs font-black uppercase text-ink-2 tracking-widest">Spent</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'bookings', label: 'My Bookings', icon: ShoppingBag },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all ${
                  activeTab === tab.id 
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' 
                  : 'text-ink-2 hover:bg-surface-muted hover:text-ink-1'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-ink-1">Active Bookings</h2>
                  <Button variant="secondary" size="sm">History</Button>
                </div>

                {[
                  { id: 'B-2849', name: 'Deep Kitchen Cleaning', date: 'Tomorrow, 10:00 AM', status: 'Confirmed', price: '$85', color: 'bg-brand-50 text-brand-600' },
                  { id: 'B-2850', name: 'Electrical Panel Repair', date: 'Apr 18, 02:00 PM', status: 'Pending', price: '$60', color: 'bg-accent-orange/10 text-accent-orange' }
                ].map(booking => (
                  <div key={booking.id} className="glass-panel p-6 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 group hover:translate-x-2 transition-transform cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-surface-muted rounded-2xl flex items-center justify-center text-brand-500">
                        <ShoppingBag size={28} />
                      </div>
                      <div>
                        <div className="text-xs font-black text-ink-2 uppercase tracking-widest mb-1">{booking.id}</div>
                        <h4 className="text-xl font-bold text-ink-1 group-hover:text-brand-500 transition-colors">{booking.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-ink-2 font-bold mt-1">
                          <Clock size={14} />
                          {booking.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${booking.color}`}>
                        {booking.status}
                      </div>
                      <div className="text-xl font-black text-ink-1">{booking.price}</div>
                      <ChevronRight size={20} className="text-line group-hover:text-brand-500" />
                    </div>
                  </div>
                ))}

                <button className="w-full py-8 rounded-[2.5rem] border-2 border-dashed border-line text-ink-2 font-black hover:bg-surface-muted transition-colors flex flex-col items-center gap-2 mt-8">
                  <Search size={32} className="opacity-40" />
                  Looking for more? Explore Services
                </button>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-white">
                  <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-8 rounded-[2.5rem] shadow-premium relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-brand-100/70 text-sm font-black uppercase mb-8">Virtual Wallet</div>
                      <div className="text-4xl font-black mb-1">$450.80</div>
                      <div className="text-brand-100/50 text-xs font-bold font-bold">Updated 2m ago</div>
                    </div>
                    <TrendingUp size={120} className="absolute -bottom-8 -right-8 text-brand-500/20" />
                  </div>
                  <div className="bg-gradient-to-br from-surface-dark to-slate-800 p-8 rounded-[2.5rem] shadow-premium">
                    <div className="text-slate-400 text-sm font-black uppercase mb-8">Rewards Points</div>
                    <div className="text-4xl font-black mb-1">2,480</div>
                    <div className="text-slate-500 text-xs font-bold font-bold">Next tier at 3,000</div>
                  </div>
                </div>

                <div className="glass-panel p-8 rounded-[2.5rem]">
                  <h3 className="font-black text-xl mb-6">Recent Transactions</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex justify-between items-center py-4 border-b border-line last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                            <CreditCard size={20} />
                          </div>
                          <div>
                            <div className="font-bold text-ink-1">Service Payment #B-2849</div>
                            <div className="text-xs text-ink-2 font-bold">April 12, 2026</div>
                          </div>
                        </div>
                        <div className="text-red-500 font-black">-$85.00</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
