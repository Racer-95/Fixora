import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, Clock, CheckCircle2, Share2, Heart } from 'lucide-react';
import Button from '../components/ui/Button';

const ServiceDetailPage: React.FC = () => {

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 text-brand-600 font-bold text-sm mb-4">
                <Link to="/services" className="hover:underline">Services</Link>
                <span>/</span>
                <span>Cleaning</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-ink-1 mb-6">Professional Deep Cleaning</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-ink-2 font-medium mb-8">
                <div className="flex items-center gap-1">
                  <Star size={18} className="text-accent-orange fill-accent-orange" />
                  <span className="text-ink-1 font-bold">4.9</span>
                  <span>(230 Reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={18} className="text-accent-teal" />
                  <span>Verified Provider</span>
                </div>
              </div>

              <div className="rounded-[2.5rem] overflow-hidden shadow-premium mb-10 aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200" 
                  alt="Service Header" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-black text-ink-1 mb-4">About the Service</h2>
                  <p className="text-lg text-ink-2 leading-relaxed">
                    Our professional deep cleaning service is designed to give your home a thorough, top-to-bottom scrub. We go beyond the surface to tackle hidden dust, allergens, and grime, leaving your living space pristine and healthy. Our experienced team uses eco-friendly products and state-of-the-art equipment.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-ink-1 mb-4">What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Dusting and wiping all surfaces',
                      'Vacuuming and mopping floors',
                      'Deep kitchen cleaning (incl. appliances)',
                      'Bathroom sanitization and scrub',
                      'Window track cleaning',
                      'Baseboard and wall wipe-down'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white border border-line rounded-2xl">
                        <CheckCircle2 size={20} className="text-accent-teal shrink-0 mt-1" />
                        <span className="font-bold text-ink-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-28 glass-panel p-8 rounded-[2.5rem] shadow-premium"
            >
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-4xl font-black text-ink-1 leading-none">$85</span>
                  <span className="text-ink-2 font-bold ml-2">/ cleaning</span>
                </div>
                <div className="p-3 bg-surface-muted rounded-2xl text-accent-orange">
                  <Star size={24} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white border border-line rounded-2xl">
                  <div className="text-xs font-black uppercase text-ink-2 mb-1 tracking-wider">Service Date</div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink-1">April 24, 2026</span>
                    <Clock size={18} className="text-brand-500" />
                  </div>
                </div>
                <div className="p-4 bg-white border border-line rounded-2xl">
                  <div className="text-xs font-black uppercase text-ink-2 mb-1 tracking-wider">Location</div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink-1">Current Address</span>
                    <MapPin size={18} className="text-brand-500" />
                  </div>
                </div>
              </div>

              <Link to="/booking/flow/1">
                <Button variant="primary" size="lg" className="w-full mb-4 py-5 shadow-brand-500/40">
                  Book Now
                </Button>
              </Link>
              
              <div className="flex gap-4">
                <Button variant="secondary" className="flex-1 py-4">
                  <Heart size={18} className="mr-2" /> Save
                </Button>
                <Button variant="secondary" className="flex-1 py-4">
                  <Share2 size={18} className="mr-2" /> Share
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-line text-center">
                <p className="text-sm font-bold text-ink-2">Free cancellation up to 24h before service.</p>
              </div>
            </motion.div>

            {/* Provider Mini Card */}
            <div className="mt-8 glass-panel p-6 rounded-[2rem] border-line">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                  alt="Provider" 
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="font-black text-lg text-ink-1">John’s Cleaners</h4>
                  <div className="flex items-center gap-1 text-sm text-ink-2 font-bold">
                    <Star size={14} className="text-accent-orange fill-accent-orange" />
                    <span>4.9</span>
                    <span className="mx-1">•</span>
                    <span>Pro Member</span>
                  </div>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="w-full font-bold">View Profile</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
