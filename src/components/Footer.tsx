import { Link } from 'react-router-dom';
import Logo from './Logo';

const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'Results', to: '/#results' },
  { label: 'Admin', to: '/admin' },
  { label: 'Start Test', to: '/login' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-ink-200 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-10">
        <div className="max-w-xs">
          <Logo />
          <p className="text-ink-500 mt-4 text-sm leading-relaxed">
            Empowering young minds to master the abacus through structured learning,
            timed practice, and measurable progress.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-ink-800 mb-1">Navigate</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-ink-500 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ink-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm text-ink-400">© 2024 Bright Academy. All rights reserved.</p>
          <p className="text-sm font-semibold text-brand-600">Learn • Calculate • Shine</p>
        </div>
      </div>
    </footer>
  );
}
