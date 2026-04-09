import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Clock3, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/common/SectionHeading';
import { StatusView } from '../components/common/StatusView';
import { ServiceCard } from '../components/features/ServiceCard';
import { useMarketplaceSnapshot } from '../components/hooks/useMarketplaceSnapshot';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export function HomePage() {
  const { data, isLoading, errorMessage } = useMarketplaceSnapshot();

  if (isLoading) return <StatusView message="Loading Fixora..." />;
  if (errorMessage || !data) return <StatusView message={errorMessage ?? 'Unable to load homepage.'} />;

  return (
    <main className="page-stack">
      <section className="hero-lite">
        <div className="hero-copy">
          <h1>Reliable home services, designed to feel effortless.</h1>
          <p>Compare, book, and track services in minutes.</p>
          <div className="row-actions">
            <Link to="/services" className="btn-primary">
              Explore Services
              <ArrowRight size={16} />
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              How It Works
            </Link>
          </div>
          <div className="trust-inline">
            {data.trustHighlights.map((item) => (
              <span key={item}>
                <BadgeCheck size={14} />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-panel-light">
          {data.stats.map((stat) => (
            <article key={stat.label}>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <motion.section className="surface-section" {...reveal}>
        <SectionHeading
          eyebrow="Top Rated"
          title="Popular services, quick to compare."
          description="A short preview from the full catalog."
          action={
            <Link to="/services" className="text-link">
              View all
              <ArrowRight size={15} />
            </Link>
          }
        />
        <div className="cards-grid cards-3">
          {data.featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </motion.section>

      <motion.section className="surface-section quick-grid" {...reveal}>
        <article>
          <Clock3 size={20} />
          <h3>Fast scheduling</h3>
          <p>Same-day and scheduled slots.</p>
        </article>
        <article>
          <BadgeCheck size={20} />
          <h3>Verified quality</h3>
          <p>Vetted professionals with review history.</p>
        </article>
        <article>
          <Star size={20} />
          <h3>Transparent pricing</h3>
          <p>Clear prices before booking.</p>
        </article>
      </motion.section>
    </main>
  );
}
