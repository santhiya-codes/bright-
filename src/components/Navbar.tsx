import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'Results', to: '/#results' },
  { label: 'Admin', to: '/admin' },
  { label: 'Start Test', to: '/login' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-ink-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.slice(0, 4).map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-semibold transition-colors hover:text-brand-600 ${
                location.pathname === link.to ? 'text-brand-600' : 'text-ink-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-ink-100 text-ink-800 hover:bg-ink-200 transition-colors"
          >
            Admin
          </Link>
          <Link to="/login" className="btn-primary text-sm">
            Start Test
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`w-6 h-0.5 bg-ink-900 rounded transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-ink-900 rounded transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-ink-900 rounded transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden flex flex-col bg-white border-t border-ink-200 px-6 py-4 gap-3 animate-slide-down">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-ink-600 hover:text-brand-600 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
