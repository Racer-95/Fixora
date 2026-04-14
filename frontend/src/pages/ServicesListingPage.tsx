import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

import ServiceCard from '../components/ui/ServiceCard';
import type { IService } from '../types/index';
import Button from '../components/ui/Button';

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
  },
  {
    _id: '4',
    providerId: 'p4',
    name: 'Quality Interior Painting',
    category: 'Painting',
    basePrice: 120,
    location: { latitude: 0, longitude: 0 },
    createdAt: new Date(),
    rating: 4.6,
    reviewsCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: '5',
    providerId: 'p5',
    name: 'Garden Landscaping',
    category: 'Gardening',
    basePrice: 95,
    location: { latitude: 0, longitude: 0 },
    createdAt: new Date(),
    rating: 4.9,
    reviewsCount: 78,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: '6',
    providerId: 'p6',
    name: 'Home Appliance Repair',
    category: 'Repair',
    basePrice: 50,
    location: { latitude: 0, longitude: 0 },
    createdAt: new Date(),
    rating: 4.5,
    reviewsCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
  }
];

const CATEGORIES = ['All', 'Cleaning', 'Electrical', 'Plumbing', 'Painting', 'Gardening', 'Repair'];

const ServicesListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = MOCK_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-ink-1 mb-4">Find your <span className="text-gradient">Service.</span></h1>
          <p className="text-ink-2 font-medium">Browse through hundreds of verified professional services.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1 glass-panel p-2 rounded-2xl flex items-center gap-3">
            <Search size={20} className="ml-3 text-ink-2" />
            <input 
              type="text" 
              placeholder="Search for any service..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 bg-transparent focus:outline-none font-medium text-ink-1"
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            <div className="glass-panel p-2 rounded-2xl flex items-center gap-2">
              <MapPin size={18} className="ml-2 text-ink-2" />
              <select className="bg-transparent focus:outline-none pr-4 font-bold text-ink-1 text-sm">
                <option>New York, NY</option>
                <option>Los Angeles, CA</option>
                <option>Chicago, IL</option>
              </select>
            </div>
            <Button variant="secondary" className="rounded-2xl shrink-0 flex items-center gap-2">
              <SlidersHorizontal size={18} />
              Filters
            </Button>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat 
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                : 'bg-white border border-line text-ink-2 hover:bg-surface-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-panel rounded-3xl">
            <h3 className="text-xl font-bold text-ink-1 mb-2">No services found</h3>
            <p className="text-ink-2">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesListingPage;
