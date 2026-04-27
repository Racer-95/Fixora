import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import ServiceCard from '../components/ui/ServiceCard';
import type { IService } from '../types/index';
import Button from '../components/ui/Button';
import api from '../services/api';

const CATEGORIES = ['All', 'Cleaning', 'Electrical', 'Plumbing', 'Painting', 'Gardening', 'Repair', 'Barber', 'Beauty'];

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
] as const;

const ServicesListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
  const [selectedCity, setSelectedCity] = useState<(typeof INDIAN_CITIES)[number]>(INDIAN_CITIES[0]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || (service.city || '').toLowerCase().includes(selectedCity.split(',')[0].toLowerCase());
    return matchesCategory && matchesSearch && matchesCity;
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
              <select
                className="bg-transparent focus:outline-none pr-4 font-bold text-ink-1 text-sm"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value as (typeof INDIAN_CITIES)[number])}
              >
                {INDIAN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
              className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                  : 'bg-white border border-line text-ink-2 hover:bg-surface-muted'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-ink-2">Loading services...</p>
          </div>
        ) : filteredServices.length > 0 ? (
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
