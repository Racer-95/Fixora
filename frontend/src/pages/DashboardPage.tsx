import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Star,
  Briefcase,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/useAuth';
import api from '../services/api';
import type { IUser } from '../types';

const formatPrice = (amount: number) => {
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`;
  return `₹${amount}`;
};

const INDIAN_CITIES = [
  'Delhi, Delhi',
  'Bangalore, Karnataka',
  'Mumbai, Maharashtra',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Kolkata, West Bengal',
  'Jaipur, Rajasthan',
  'Ahmedabad, Gujarat',
  'Surat, Gujarat',
  'Pune, Maharashtra',
  'Nagpur, Maharashtra',
];

const CustomerDashboard: React.FC<{ user: IUser | null }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings/my');
        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const totalSpent = bookings.reduce((sum, b) => {
    return sum + (b.serviceId?.basePrice || 0);
  }, 0);

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
              <h1 className="text-3xl font-black text-ink-1">{user?.name || 'Loading...'}</h1>
              <p className="text-ink-2 font-bold flex items-center gap-2">
                <Star size={16} className="text-accent-orange fill-accent-orange" />
                Premium Member since 2024
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-6 border-r border-line">
              <div className="text-3xl font-black text-brand-600">{loading ? '-' : bookings.length}</div>
              <div className="text-xs font-black uppercase text-ink-2 tracking-widest">Bookings</div>
            </div>
            <div className="text-center px-6">
              <div className="text-3xl font-black text-brand-600">{loading ? '-' : formatPrice(totalSpent)}</div>
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-ink-1">Active Bookings</h2>
                  <Button variant="secondary" size="sm">History</Button>
                </div>

                {loading ? (
                  <p className="text-ink-2">Loading bookings...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-ink-2">No bookings found.</p>
                ) : (
                  bookings.map(booking => (
                    <div key={booking._id} className="glass-panel p-6 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 group hover:translate-x-2 transition-transform cursor-pointer">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-surface-muted rounded-2xl flex items-center justify-center text-brand-500">
                          <ShoppingBag size={28} />
                        </div>
                        <div>
                          <div className="text-xs font-black text-ink-2 uppercase tracking-widest mb-1">
                            {booking._id.substring(0, 8)}
                          </div>
                          <h4 className="text-xl font-bold text-ink-1 group-hover:text-brand-500 transition-colors">
                            {booking.serviceId?.name || 'Unknown Service'}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-ink-2 font-bold mt-1">
                            <Clock size={14} />
                            {new Date(booking.scheduledTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'pending' ? 'bg-accent-orange/10 text-accent-orange' :
                          booking.status === 'cancelled' || booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-brand-50 text-brand-600'
                        }`}>
                          {booking.status}
                        </div>
                        <div className="text-xl font-black text-ink-1">₹{booking.serviceId?.basePrice || 0}</div>
                        <ChevronRight size={20} className="text-line group-hover:text-brand-500" />
                      </div>
                    </div>
                  ))
                )}

                <Link to="/services" className="block w-full mt-8">
                  <button className="w-full py-8 rounded-[2.5rem] border-2 border-dashed border-line text-ink-2 font-black hover:bg-surface-muted transition-colors flex flex-col items-center gap-2">
                    <Search size={32} className="opacity-40" />
                    Looking for more? Explore Services
                  </button>
                </Link>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-white">
                  <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-8 rounded-[2.5rem] shadow-premium relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-brand-100/70 text-sm font-black uppercase mb-8">Virtual Wallet</div>
                      <div className="text-4xl font-black mb-1">₹450.80</div>
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
                    {loading ? (
                      <p className="text-ink-2">Loading transactions...</p>
                    ) : bookings.length === 0 ? (
                      <p className="text-ink-2">No recent transactions.</p>
                    ) : (
                      bookings.map((item) => (
                        <div key={item._id} className="flex justify-between items-center py-4 border-b border-line last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                              <CreditCard size={20} />
                            </div>
                            <div>
                              <div className="font-bold text-ink-1">Service Payment #{item._id.substring(0, 8)}</div>
                              <div className="text-xs text-ink-2 font-bold">{new Date(item.createdAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="text-red-500 font-black">-₹{item.serviceId?.basePrice || 0}.00</div>
                        </div>
                      ))
                    )}
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

const ProviderDashboard: React.FC<{ user: IUser | null }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('requests');
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Add Service Form State
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    category: 'Cleaning',
    basePrice: 0,
    city: INDIAN_CITIES[0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, servicesRes] = await Promise.all([
          api.get('/bookings/my'),
          api.get('/services/mine')
        ]);
        if (bookingsRes.data.success) setBookings(bookingsRes.data.data);
        if (servicesRes.data.success) setServices(servicesRes.data.data);
      } catch (err) {
        console.error('Failed to fetch provider data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalEarnings = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.serviceId?.basePrice || 0), 0);

  const updateBookingStatus = async (id: string, action: 'accept' | 'reject' | 'complete') => {
    try {
      let res;
      if (action === 'accept') res = await api.patch(`/bookings/${id}/accept`);
      else if (action === 'reject') res = await api.patch(`/bookings/${id}/reject`);
      else if (action === 'complete') res = await api.patch(`/bookings/${id}/status`, { status: 'completed' });
      
      if (res?.data.success) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: res.data.data.status } : b));
      }
    } catch (err) {
      console.error(`Failed to ${action} booking`, err);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/services', newService);
      if (res.data.success) {
        setServices(prev => [res.data.data, ...prev]);
        setShowAddServiceForm(false);
        setNewService({ name: '', category: 'Cleaning', basePrice: 0, city: INDIAN_CITIES[0] });
      }
    } catch (err) {
      console.error('Failed to add service', err);
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Profile Header */}
        <div className="glass-panel p-8 rounded-[3rem] mb-12 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                alt="Provider" 
                className="w-24 h-24 rounded-[2rem] object-cover shadow-premium border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center text-white border-2 border-white">
                <Briefcase size={16} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-ink-1">{user?.name || 'Loading...'}</h1>
              <p className="text-ink-2 font-bold flex items-center gap-2">
                <Star size={16} className="text-accent-orange fill-accent-orange" />
                Verified Provider
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-6 border-r border-line">
              <div className="text-3xl font-black text-brand-600">{loading ? '-' : bookings.length}</div>
              <div className="text-xs font-black uppercase text-ink-2 tracking-widest">Requests</div>
            </div>
            <div className="text-center px-6">
              <div className="text-3xl font-black text-brand-600">{loading ? '-' : formatPrice(totalEarnings)}</div>
              <div className="text-xs font-black uppercase text-ink-2 tracking-widest">Earnings</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'requests', label: 'Service Requests', icon: Bell },
              { id: 'services', label: 'My Services', icon: Briefcase },
              { id: 'earnings', label: 'Earnings', icon: CreditCard },
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
            {activeTab === 'requests' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-ink-1">Incoming Requests</h2>
                </div>

                {loading ? (
                  <p className="text-ink-2">Loading requests...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-ink-2">No incoming requests yet.</p>
                ) : (
                  bookings.map(booking => (
                    <div key={booking._id} className="glass-panel p-6 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 group hover:translate-x-2 transition-transform">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-surface-muted rounded-2xl flex items-center justify-center text-brand-500">
                          <ShoppingBag size={28} />
                        </div>
                        <div>
                          <div className="text-xs font-black text-ink-2 uppercase tracking-widest mb-1">
                            Customer: {booking.customerId?.name || 'Unknown'}
                          </div>
                          <h4 className="text-xl font-bold text-ink-1 group-hover:text-brand-500 transition-colors">
                            {booking.serviceId?.name || 'Unknown Service'}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-ink-2 font-bold mt-1">
                            <Clock size={14} />
                            {new Date(booking.scheduledTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-4">
                          <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                            booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'pending' ? 'bg-accent-orange/10 text-accent-orange' :
                            booking.status === 'cancelled' || booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-brand-50 text-brand-600'
                          }`}>
                            {booking.status}
                          </div>
                          <div className="text-xl font-black text-ink-1">₹{booking.serviceId?.basePrice || 0}</div>
                        </div>
                        
                        {/* Action Buttons */}
                        {booking.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="primary" onClick={() => updateBookingStatus(booking._id, 'accept')}>Accept</Button>
                            <Button size="sm" variant="secondary" onClick={() => updateBookingStatus(booking._id, 'reject')}>Reject</Button>
                          </div>
                        )}
                        {booking.status === 'accepted' && (
                          <Button size="sm" variant="primary" onClick={() => updateBookingStatus(booking._id, 'complete')}>Mark Completed</Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-ink-1">My Services</h2>
                  <Button variant="primary" size="sm" onClick={() => setShowAddServiceForm(!showAddServiceForm)}>
                    {showAddServiceForm ? 'Cancel' : 'Add Service'}
                  </Button>
                </div>
                
                {showAddServiceForm && (
                  <div className="glass-panel p-6 rounded-3xl mb-8">
                    <h3 className="text-xl font-bold mb-4">Create New Service</h3>
                    <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-ink-2 mb-1">Service Name</label>
                        <input 
                          required 
                          className="w-full p-3 rounded-xl border border-line bg-surface-muted text-ink-1 focus:outline-none focus:border-brand-500" 
                          value={newService.name} 
                          onChange={e => setNewService({...newService, name: e.target.value})} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-ink-2 mb-1">Category</label>
                        <select 
                          className="w-full p-3 rounded-xl border border-line bg-surface-muted text-ink-1 focus:outline-none focus:border-brand-500"
                          value={newService.category}
                          onChange={e => setNewService({...newService, category: e.target.value})}
                        >
                          <option value="Cleaning">Cleaning</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Plumbing">Plumbing</option>
                          <option value="Painting">Painting</option>
                          <option value="Gardening">Gardening</option>
                          <option value="Repair">Repair</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-ink-2 mb-1">Base Price (₹)</label>
                        <input 
                          type="number" 
                          required 
                          className="w-full p-3 rounded-xl border border-line bg-surface-muted text-ink-1 focus:outline-none focus:border-brand-500" 
                          value={newService.basePrice || ''} 
                          onChange={e => setNewService({...newService, basePrice: Number(e.target.value)})} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-ink-2 mb-1">City</label>
                        <select 
                          className="w-full p-3 rounded-xl border border-line bg-surface-muted text-ink-1 focus:outline-none focus:border-brand-500"
                          value={newService.city}
                          onChange={e => setNewService({...newService, city: e.target.value})}
                        >
                          {INDIAN_CITIES.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2 mt-2">
                        <Button variant="primary" className="w-full">Create Service</Button>
                      </div>
                    </form>
                  </div>
                )}

                {loading ? (
                   <p className="text-ink-2">Loading services...</p>
                ) : services.length === 0 ? (
                  <p className="text-ink-2">You haven't listed any services yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map(service => (
                      <div key={service._id} className="glass-panel p-6 rounded-3xl">
                        <h4 className="text-xl font-bold text-ink-1 mb-2">{service.name}</h4>
                        <div className="text-brand-600 font-black text-2xl mb-4">₹{service.basePrice}</div>
                        <div className="text-sm font-bold text-ink-2 px-3 py-1 bg-surface-muted rounded-full inline-block">
                          {service.category}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'earnings' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-white">
                  <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-[2.5rem] shadow-premium relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-green-100/70 text-sm font-black uppercase mb-8">Total Revenue</div>
                      <div className="text-4xl font-black mb-1">{formatPrice(totalEarnings)}</div>
                      <div className="text-green-100/50 text-xs font-bold font-bold">Lifetime earnings</div>
                    </div>
                    <TrendingUp size={120} className="absolute -bottom-8 -right-8 text-green-500/20" />
                  </div>
                </div>

                <div className="glass-panel p-8 rounded-[2.5rem]">
                  <h3 className="font-black text-xl mb-6">Completed Payouts</h3>
                  <div className="space-y-4">
                    {loading ? (
                      <p className="text-ink-2">Loading transactions...</p>
                    ) : bookings.filter(b => b.status === 'completed').length === 0 ? (
                      <p className="text-ink-2">No earnings yet.</p>
                    ) : (
                      bookings.filter(b => b.status === 'completed').map((item) => (
                        <div key={item._id} className="flex justify-between items-center py-4 border-b border-line last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                              <CheckCircle size={20} />
                            </div>
                            <div>
                              <div className="font-bold text-ink-1">Payout for #{item._id.substring(0, 8)}</div>
                              <div className="text-xs text-ink-2 font-bold">{new Date(item.updatedAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="text-green-600 font-black">+₹{item.serviceId?.basePrice || 0}.00</div>
                        </div>
                      ))
                    )}
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

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'provider') {
    return <ProviderDashboard user={user} />;
  }
  
  return <CustomerDashboard user={user} />;
};

export default DashboardPage;
