import { Link } from 'react-router-dom';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      {/* Abacus-inspired logo: three horizontal rods with beads */}
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
          light ? 'bg-white/10' : 'bg-gradient-to-br from-brand-500 to-lavender-500'
        }`}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Frame */}
          <rect x="2" y="3" width="22" height="20" rx="3" stroke={light ? '#fff' : '#fff'} strokeWidth="1.5" fill="none" />
          {/* Three rods */}
          <line x1="2" y1="9" x2="24" y2="9" stroke={light ? '#fff' : '#fff'} strokeWidth="1" opacity="0.7" />
          <line x1="2" y1="13" x2="24" y2="13" stroke={light ? '#fff' : '#fff'} strokeWidth="1" opacity="0.7" />
          <line x1="2" y1="17" x2="24" y2="17" stroke={light ? '#fff' : '#fff'} strokeWidth="1" opacity="0.7" />
          {/* Beads — rod 1 */}
          <circle cx="7" cy="9" r="2" fill={light ? '#fcd34d' : '#fcd34d'} />
          <circle cx="18" cy="9" r="2" fill={light ? '#c4b5fd' : '#c4b5fd'} />
          {/* Beads — rod 2 */}
          <circle cx="10" cy="13" r="2" fill={light ? '#93c5fd' : '#93c5fd'} />
          <circle cx="15" cy="13" r="2" fill={light ? '#fcd34d' : '#fcd34d'} />
          {/* Beads — rod 3 */}
          <circle cx="7" cy="17" r="2" fill={light ? '#c4b5fd' : '#c4b5fd'} />
          <circle cx="20" cy="17" r="2" fill={light ? '#93c5fd' : '#93c5fd'} />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-xl font-extrabold ${light ? 'text-white' : 'text-brand-700'}`}>
          Bright Academy
        </span>
        <span className={`text-[11px] font-semibold tracking-wide ${light ? 'text-white/70' : 'text-ink-500'}`}>
          Learn • Calculate • Shine
        </span>
      </div>
    </Link>
  );
}
