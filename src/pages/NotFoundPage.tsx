import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="status-view page-stack">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="btn-secondary">
        <ArrowLeft size={16} />
        Back home
      </Link>
    </main>
  );
}
