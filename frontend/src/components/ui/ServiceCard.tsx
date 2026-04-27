import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import type { IService } from '../../types/index';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: IService;
}

const CATEGORY_IMAGES: Record<string, string> = {
  Cleaning:    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
  Electrical:  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
  Plumbing:    'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800',
  Painting:    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800',
  Gardening:   'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
  Repair:      'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800',
  Carpentry:   'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
  Moving:      'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=800',
  Appliance:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
  Pest:        'https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&q=80&w=800',
  Security:    'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
  Barber:      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
  Beauty:      'https://images.unsplash.com/photo-1560066984-138daaa4e5d7?auto=format&fit=crop&q=80&w=800',
  default:     'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800',
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const fallbackImage = CATEGORY_IMAGES[service.category] ?? CATEGORY_IMAGES['default']!;
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-panel group rounded-3xl overflow-hidden p-3 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
        <img 
          src={service.imageUrl || fallbackImage}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-600 shadow-sm">
          {service.category}
        </div>
        <div className="absolute bottom-3 right-3 bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg">
          ₹{service.basePrice}
        </div>
      </div>

      <div className="px-3 pb-3">
        <h3 className="text-xl font-black text-ink-1 mb-2 group-hover:text-brand-500 transition-colors">
          {service.name}
        </h3>
        
        <div className="text-sm font-bold text-ink-2 mb-2">
          By {typeof service.providerId === 'object' && service.providerId ? service.providerId.name : 'Unknown Provider'}
        </div>
        <div className="flex items-center gap-4 mb-4 text-sm text-ink-2 font-medium">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-accent-orange fill-accent-orange" />
            <span className="text-ink-1 font-bold">
              {typeof service.providerId === 'object' && service.providerId ? (service.providerId.rating || 4.8) : (service.rating || 4.8)}
            </span>
            <span>({service.reviewsCount || 0})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span className="truncate">
              {service.city || 'Remote'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3 border-t border-line">
          <Link to={`/service/${service._id}`} className="flex-1">
            <Button variant="primary" size="md" className="w-full text-sm">
              View Details
            </Button>
          </Link>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-surface-muted rounded-xl text-ink-2 hover:bg-brand-50 hover:text-brand-600 transition-colors"
          >
            <Clock size={18} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default ServiceCard;
