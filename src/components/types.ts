export interface Service {
  id: string;
  title: string;
  category: string;
  startingPrice: number;
  turnaround: string;
  rating: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
}

export interface MarketplaceStat {
  label: string;
  value: string;
}

export interface CategorySummary {
  name: string;
  serviceCount: number;
  averageStartingPrice: number;
}

export interface MarketplaceData {
  services: Service[];
  featuredServices: Service[];
  testimonials: Testimonial[];
  stats: MarketplaceStat[];
  categories: CategorySummary[];
  trustHighlights: string[];
  operatingPrinciples: { title: string; description: string }[];
}
