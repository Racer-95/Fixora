import { motion } from 'framer-motion';
import { SectionHeading } from '../components/common/SectionHeading';
import { StatusView } from '../components/common/StatusView';
import { useMarketplaceSnapshot } from '../components/hooks/useMarketplaceSnapshot';
import { formatIndianRupees } from '../components/utils/currency';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export function AboutPage() {
  const { data, isLoading, errorMessage } = useMarketplaceSnapshot();

  if (isLoading) return <StatusView message="Loading..." />;
  if (errorMessage || !data) return <StatusView message={errorMessage ?? 'Unable to load about page.'} />;

  return (
    <main className="page-stack">
      <section className="page-head">
        <span className="tag">About Fixora</span>
        <h1>A marketplace frontend with clean architecture.</h1>
        <p>Built for maintainability and product growth.</p>
      </section>

      <motion.section className="surface-section two-col" {...reveal}>
        <div>
          <SectionHeading
            eyebrow="Principles"
            title="Clear design and code rules."
            description="Simple decisions that keep quality high."
          />
          <div className="principle-list">
            {data.operatingPrinciples.map((principle) => (
              <article key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
        <article className="metric-panel">
          <h3>Category snapshot</h3>
          <div className="metric-list">
            {data.categories.map((category) => (
              <div key={category.name}>
                <span>{category.name}</span>
                <strong>{formatIndianRupees(category.averageStartingPrice)}</strong>
              </div>
            ))}
          </div>
        </article>
      </motion.section>
    </main>
  );
}
