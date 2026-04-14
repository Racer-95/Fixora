import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Zap, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import ServiceCard from '../components/ui/ServiceCard';
import type { IService } from '../types/index';

const MOCK_SERVICES: IService[] = [
  {
    _id: '1',
    providerId: 'p1',
    name: 'Professional Deep Cleaning',
    category: 'Cleaning',
    basePrice: 85,
    location: { latitude: 0, longitude: 0 },
    createdAt: new Date(),
    rating: 4.9,
    reviewsCount: 230,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: '2',
    providerId: 'p2',
    name: 'Expert Electrical Repair',
    category: 'Electrical',
    basePrice: 60,
    location: { latitude: 0, longitude: 0 },
    createdAt: new Date(),
    rating: 4.8,
    reviewsCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: '3',
    providerId: 'p3',
    name: 'Master Plumbing Solutions',
    category: 'Plumbing',
    basePrice: 75,
    location: { latitude: 0, longitude: 0 },
    createdAt: new Date(),
    rating: 4.7,
    reviewsCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="relative px-6 pt-10">
        <div className="mx-auto max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-sm font-bold mb-6 border border-brand-100">
                <ShieldCheck size={16} />
                Trusted by 50,000+ Customers
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-ink-1 leading-[1.1] mb-6 tracking-tight">
                Fix Everything at <span className="text-gradient">Fixora.</span>
              </h1>
              <p className="text-xl text-ink-2 mb-10 leading-relaxed max-w-lg">
                Book professional local services in seconds. From plumbing to painting, we've got the experts you need.
              </p>
              
              <div className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-xl">
                <div className="flex-1 flex items-center px-4 gap-3 bg-surface-muted/50 rounded-xl">
                  <Search size={20} className="text-ink-2" />
                  <input 
                    type="text" 
                    placeholder="What service do you need?" 
                    className="w-full py-4 bg-transparent focus:outline-none font-medium text-ink-1"
                  />
                </div>
                <Button variant="primary" size="lg" className="rounded-xl">
                  Get Started
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-premium">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2959443?auto=format&fit=crop&q=80&w=1200" 
                  alt="Service Professional" 
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass-panel p-4 rounded-2xl z-20 shadow-premium"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-teal rounded-full flex items-center justify-center text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-ink-1">Verified Expert</div>
                    <div className="text-xs text-ink-2">Background Checked</div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-2xl z-20 shadow-premium"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-ink-1">Quick Booking</div>
                    <div className="text-xs text-ink-2">In under 2 minutes</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-ink-1 mb-4">Popular Services</h2>
              <p className="text-ink-2 font-medium">Handpicked professionals for your home needs.</p>
            </div>
            <Button variant="secondary" className="hidden sm:flex">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_SERVICES.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="px-6 py-20 bg-surface-dark rounded-[3rem] mx-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Built for Trust.</h2>
            <p className="text-brand-100/70 text-lg">We provide a seamless experience from booking to completion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Every provider is background checked and verified for your peace of mind.' },
              { icon: Heart, title: 'Happiness Guarantee', desc: 'Not satisfied with the job? We will make it right, guaranteed.' },
              { icon: Zap, title: 'Instant Support', desc: 'Our customer support team is available 24/7 to help you out.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-brand-500 mx-auto mb-6">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-brand-100/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
