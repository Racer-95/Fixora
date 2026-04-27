import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, Clock, CheckCircle2, Share2, Heart, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import type { IService } from '../types/index';
import api from '../services/api';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/services/${id}`);
        if (res.data.success) {
          setService(res.data.data);
        } else {
          setError(res.data.message || 'Failed to load service');
        }
      } catch (err: any) {
        console.error('Failed to fetch service:', err);
        setError(err.response?.data?.message || 'Service not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-brand-500 mx-auto mb-4" />
          <p className="text-ink-2 font-medium">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center glass-panel p-12 rounded-3xl max-w-md">
          <h2 className="text-2xl font-black text-ink-1 mb-3">Service Not Found</h2>
          <p className="text-ink-2 mb-6">{error || 'The service you are looking for does not exist.'}</p>
          <Link to="/services">
            <Button variant="primary" size="lg">Browse Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const providerName = typeof service.providerId === 'object' && service.providerId
    ? service.providerId.name
    : 'Fixora Provider';
  const providerRating = typeof service.providerId === 'object' && service.providerId
    ? (service.providerId.rating || 4.8)
    : (service.rating || 4.8);

  // Category-based placeholder images
  const categoryImages: Record<string, string> = {
    Cleaning: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
    Electrical: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200',
    Plumbing: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1200',
    Painting: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1200',
    Gardening: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1200',
    Repair: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=1200',
  };

  const serviceImage = service.imageUrl
    || categoryImages[service.category]
    || 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=1200';

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
                <span>{service.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-ink-1 mb-6">{service.name}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-ink-2 font-medium mb-8">
                <div className="flex items-center gap-1">
                  <Star size={18} className="text-accent-orange fill-accent-orange" />
                  <span className="text-ink-1 font-bold">{providerRating}</span>
                  <span>({service.reviewsCount || 0} Reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>{service.city || 'Remote'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={18} className="text-accent-teal" />
                  <span>Verified Provider</span>
                </div>
              </div>

              <div className="rounded-[2.5rem] overflow-hidden shadow-premium mb-10 aspect-video">
                <img 
                  src={serviceImage} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-black text-ink-1 mb-4">About the Service</h2>
                  <p className="text-lg text-ink-2 leading-relaxed">
                    Our professional {service.name.toLowerCase()} service is designed to deliver high-quality results. 
                    Our experienced team uses top-grade materials and state-of-the-art equipment to ensure 
                    your complete satisfaction. Book today and experience the Fixora difference.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-ink-1 mb-4">What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Professional assessment & consultation',
                      'High-quality materials & equipment',
                      'Experienced & verified professionals',
                      'Post-service cleanup',
                      'Satisfaction guarantee',
                      '24/7 customer support'
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
                  <span className="text-4xl font-black text-ink-1 leading-none">₹{service.basePrice}</span>
                  <span className="text-ink-2 font-bold ml-2">/ service</span>
                </div>
                <div className="p-3 bg-surface-muted rounded-2xl text-accent-orange">
                  <Star size={24} fill="currentColor" />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white border border-line rounded-2xl">
                  <div className="text-xs font-black uppercase text-ink-2 mb-1 tracking-wider">Category</div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink-1">{service.category}</span>
                    <Clock size={18} className="text-brand-500" />
                  </div>
                </div>
                <div className="p-4 bg-white border border-line rounded-2xl">
                  <div className="text-xs font-black uppercase text-ink-2 mb-1 tracking-wider">Location</div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink-1">{service.city || 'Remote'}</span>
                    <MapPin size={18} className="text-brand-500" />
                  </div>
                </div>
              </div>

              {service.providerId ? (
                <Link to={`/booking/flow/${service._id}`}>
                  <Button variant="primary" size="lg" className="w-full mb-4 py-5 shadow-brand-500/40">
                    Book Now
                  </Button>
                </Link>
              ) : (
                <div className="mb-4">
                  <Button variant="primary" size="lg" className="w-full py-5 opacity-50 cursor-not-allowed" disabled>
                    Not Available
                  </Button>
                  <p className="text-xs text-center text-ink-2 mt-2 font-medium">
                    No provider assigned to this service yet.
                  </p>
                </div>
              )}
              
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
                <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 font-black text-xl">
                  {providerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-black text-lg text-ink-1">{providerName}</h4>
                  <div className="flex items-center gap-1 text-sm text-ink-2 font-bold">
                    <Star size={14} className="text-accent-orange fill-accent-orange" />
                    <span>{providerRating}</span>
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
