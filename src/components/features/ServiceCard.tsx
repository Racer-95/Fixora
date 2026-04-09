import { Clock3, Star } from 'lucide-react';
import type { Service } from '../types';
import { formatIndianRupees } from '../utils/currency';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <img src={service.image} alt={service.title} className="service-image" loading="lazy" />
      <div className="service-copy">
        <span className="service-category">{service.category}</span>
        <h3>{service.title}</h3>
      </div>
      <div className="service-meta-row">
        <span>{formatIndianRupees(service.startingPrice)}</span>
        <span>
          <Star size={14} />
          {service.rating.toFixed(1)}
        </span>
      </div>
      <div className="service-meta-row muted">
        <span>
          <Clock3 size={14} />
          {service.turnaround}
        </span>
      </div>
    </article>
  );
}
