import acImage from '../../assets/AC Chill Restore.png';
import electricalImage from '../../assets/Electrical Safety Visit.png';
import paintImage from '../../assets/Fresh Coat Touchups.png';
import furnitureImage from '../../assets/Furniture Assembly Squad.png';
import plumbingImage from '../../assets/Plumbing Rescue.png';
import cleaningImage from '../../assets/Premium Deep Cleaning.png';
import type { MarketplaceData, Service } from '../types';

const services: Service[] = [
  {
    id: 'svc-plumb',
    title: 'Plumbing Rescue',
    category: 'Home Repair',
    startingPrice: 499,
    turnaround: '45 mins',
    rating: 4.9,
    image: plumbingImage,
  },
  {
    id: 'svc-elec',
    title: 'Electrical Safety Visit',
    category: 'Home Repair',
    startingPrice: 399,
    turnaround: 'Same day',
    rating: 4.8,
    image: electricalImage,
  },
  {
    id: 'svc-clean',
    title: 'Premium Deep Cleaning',
    category: 'Cleaning',
    startingPrice: 1499,
    turnaround: '3 hours',
    rating: 4.7,
    image: cleaningImage,
  },
  {
    id: 'svc-ac',
    title: 'AC Chill Restore',
    category: 'Appliance Care',
    startingPrice: 699,
    turnaround: '90 mins',
    rating: 4.9,
    image: acImage,
  },
  {
    id: 'svc-paint',
    title: 'Fresh Coat Touchups',
    category: 'Interiors',
    startingPrice: 2199,
    turnaround: 'Weekend slots',
    rating: 4.8,
    image: paintImage,
  },
  {
    id: 'svc-assemble',
    title: 'Furniture Assembly Squad',
    category: 'Handyman',
    startingPrice: 549,
    turnaround: '2 hours',
    rating: 4.6,
    image: furnitureImage,
  },
];

const stats = [
  { label: 'Verified professionals', value: '2,400+' },
  { label: 'Cities', value: '18' },
  { label: 'Avg response', value: '12 min' },
];

const trustHighlights = ['Upfront pricing', 'Verified professionals', 'Live status'];

const operatingPrinciples = [
  { title: 'Product-first structure', description: 'Built for clarity and speed.' },
  { title: 'Focused pages', description: 'Each page has one clear job.' },
  { title: 'Scalable code', description: 'Simple structure, easy to extend.' },
];

const testimonials = [
  {
    id: 'ts-1',
    name: 'Riya Malhotra',
    location: 'Bengaluru',
    quote: 'Fast booking and very clear pricing.',
  },
  {
    id: 'ts-2',
    name: 'Aarav Shah',
    location: 'Pune',
    quote: 'Easy to compare options and book quickly.',
  },
];

function buildCategories() {
  const map = new Map<string, { name: string; count: number; total: number }>();

  services.forEach((service) => {
    const current = map.get(service.category) ?? {
      name: service.category,
      count: 0,
      total: 0,
    };
    current.count += 1;
    current.total += service.startingPrice;
    map.set(service.category, current);
  });

  return Array.from(map.values()).map((item) => ({
    name: item.name,
    serviceCount: item.count,
    averageStartingPrice: Math.round(item.total / item.count),
  }));
}

export function getMarketplaceData(): MarketplaceData {
  const featuredServices = [...services]
    .sort((left, right) => right.rating - left.rating)
    .slice(0, 3);

  return {
    services: [...services],
    featuredServices,
    testimonials,
    stats,
    categories: buildCategories(),
    trustHighlights,
    operatingPrinciples,
  };
}
