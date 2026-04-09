import { ChevronRight } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
];

export function SiteLayout() {
  return (
    <div className="site-root">
      <header className="site-header">
        <div className="site-container nav-shell">
          <NavLink to="/" className="brand-mark">
            Fixora
          </NavLink>
          <nav className="main-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <NavLink to="/services" className="header-cta">
            Book
            <ChevronRight size={16} />
          </NavLink>
        </div>
      </header>

      <div className="site-container">
        <Outlet />
      </div>

      <footer className="site-footer">
        <div className="site-container footer-shell">
          <div>
            <p className="footer-brand">Fixora</p>
            <p className="footer-copy">Clean, fast, and reliable home service booking.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
