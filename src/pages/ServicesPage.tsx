import { motion } from 'framer-motion';
import { SectionHeading } from '../components/common/SectionHeading';
import { StatusView } from '../components/common/StatusView';
import { ServiceCard } from '../components/features/ServiceCard';
import { useMarketplaceSnapshot } from '../components/hooks/useMarketplaceSnapshot';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export function ServicesPage() {
  const { data, isLoading, errorMessage } = useMarketplaceSnapshot();

  if (isLoading) return <StatusView message="Loading services..." />;
  if (errorMessage || !data) return <StatusView message={errorMessage ?? 'Unable to load services.'} />;

  return (
    <main className="page-stack">
      <section className="page-head">
        <span className="tag">Service Catalog</span>
        <h1>Browse all services in one place.</h1>
        <p>Only the details you need to decide quickly.</p>
      </section>

      <motion.section className="surface-section" {...reveal}>
        <SectionHeading
          eyebrow="All Services"
          title="Full Fixora service catalog."
          description="Category, price, rating, and expected time."
        />
        <div className="cards-grid cards-3">
          {data.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </motion.section>
    </main>
  );
}
