import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Search, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/common/SectionHeading';

const steps = [
  { icon: Search, title: 'Discover', description: 'Browse services and compare price starts.' },
  { icon: CheckCircle2, title: 'Shortlist', description: 'Use ratings and turnaround to choose.' },
  { icon: WalletCards, title: 'Book', description: 'Confirm quickly and track status.' },
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export function HowItWorksPage() {
  return (
    <main className="page-stack">
      <section className="page-head">
        <span className="tag">Booking Journey</span>
        <h1>Three clear steps from search to completion.</h1>
        <p>Find, choose, and book without confusion.</p>
      </section>

      <motion.section className="surface-section" {...reveal}>
        <SectionHeading
          eyebrow="3 Steps"
          title="Simple flow, easy to understand."
          description="Clear choices at every stage."
        />
        <div className="cards-grid cards-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <article key={title} className="feature-card">
              <div className="feature-icon">
                <Icon size={20} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section className="surface-section single-col" {...reveal}>
        <article>
          <h3>Built for growth</h3>
          <p>Add booking, auth, and dashboards without rewriting the foundation.</p>
          <Link to="/services" className="text-link">
            Continue to services
            <ArrowRight size={15} />
          </Link>
        </article>
      </motion.section>
    </main>
  );
}
