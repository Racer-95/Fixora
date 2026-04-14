import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 px-6 pb-12">
      <div className="mx-auto max-w-7xl glass-panel rounded-3xl p-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-black italic">F</div>
            <span className="font-black text-2xl tracking-tight text-gradient">Fixora</span>
          </Link>
          <p className="text-ink-2 leading-relaxed mb-6">
            Connecting you with the best local service professionals in your area. Quick, reliable, and premium service every time.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-surface-muted rounded-lg text-ink-2 hover:text-brand-500 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="p-2 bg-surface-muted rounded-lg text-ink-2 hover:text-brand-500 transition-colors"><Instagram size={18} /></a>
            <a href="#" className="p-2 bg-surface-muted rounded-lg text-ink-2 hover:text-brand-500 transition-colors"><Github size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-ink-1">Services</h4>
          <ul className="space-y-4 text-ink-2">
            <li><Link to="/services?cat=plumbing" className="hover:text-brand-500 transition-colors">Plumbing</Link></li>
            <li><Link to="/services?cat=electrical" className="hover:text-brand-500 transition-colors">Electrical</Link></li>
            <li><Link to="/services?cat=cleaning" className="hover:text-brand-500 transition-colors">Cleaning</Link></li>
            <li><Link to="/services?cat=painting" className="hover:text-brand-500 transition-colors">Painting</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-ink-1">Support</h4>
          <ul className="space-y-4 text-ink-2">
            <li><a href="#" className="hover:text-brand-500 transition-colors">How it works</a></li>
            <li><a href="#" className="hover:text-brand-500 transition-colors">Trust & Safety</a></li>
            <li><a href="#" className="hover:text-brand-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-ink-1">Newsletter</h4>
          <p className="text-ink-2 mb-6">Stay updated with our latest offers and features.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-3 bg-white border border-line rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <button className="p-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors">
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-ink-2 text-sm font-medium">
        © 2026 Fixora Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
