import { Link } from 'react-router-dom';
import { LEVELS } from '../types';

// Abacus-themed SVG illustration for hero
function AbacusIllustration() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#f5f3ff" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="320" rx="16" fill="url(#bgGrad)" />

      {/* Abacus frame */}
      <rect x="50" y="40" width="300" height="240" rx="16" fill="white" stroke="url(#frameGrad)" strokeWidth="4" />

      {/* Rods */}
      {[100, 160, 220, 280].map((y) => (
        <line key={y} x1="70" y1={y} x2="330" y2={y} stroke="#cbd5e1" strokeWidth="2" />
      ))}

      {/* Divider */}
      <line x1="200" y1="50" x2="200" y2="270" stroke="#e2e8f0" strokeWidth="3" />

      {/* Beads — varied colors */}
      {/* Rod 1 */}
      <circle cx="90" cy="100" r="12" fill="#fbbf24" />
      <circle cx="120" cy="100" r="12" fill="#fbbf24" />
      <circle cx="220" cy="100" r="12" fill="#a78bfa" />
      <circle cx="250" cy="100" r="12" fill="#a78bfa" />
      <circle cx="310" cy="100" r="12" fill="#a78bfa" />

      {/* Rod 2 */}
      <circle cx="90" cy="160" r="12" fill="#60a5fa" />
      <circle cx="150" cy="160" r="12" fill="#60a5fa" />
      <circle cx="220" cy="160" r="12" fill="#fbbf24" />
      <circle cx="280" cy="160" r="12" fill="#fbbf24" />

      {/* Rod 3 */}
      <circle cx="110" cy="220" r="12" fill="#a78bfa" />
      <circle cx="140" cy="220" r="12" fill="#a78bfa" />
      <circle cx="170" cy="220" r="12" fill="#a78bfa" />
      <circle cx="240" cy="220" r="12" fill="#60a5fa" />
      <circle cx="300" cy="220" r="12" fill="#60a5fa" />

      {/* Rod 4 */}
      <circle cx="80" cy="280" r="12" fill="#fbbf24" />
      <circle cx="260" cy="280" r="12" fill="#60a5fa" />

      {/* Sparkle accents */}
      <g className="animate-count-pulse">
        <path d="M340 60 L346 70 L356 76 L346 82 L340 92 L334 82 L324 76 L334 70 Z" fill="#fcd34d" opacity="0.8" />
      </g>
      <g className="animate-count-pulse" style={{ animationDelay: '0.5s' }}>
        <path d="M55 30 L58 38 L66 42 L58 46 L55 54 L52 46 L44 42 L52 38 Z" fill="#c4b5fd" opacity="0.6" />
      </g>
    </svg>
  );
}

const STEPS = [
  {
    num: '1',
    title: 'Sign In & Choose Your Level',
    desc: 'Log in with your username and password, then select from five abacus levels — from Foundation to Master.',
  },
  {
    num: '2',
    title: 'Practice or Take the Final Test',
    desc: 'Sharpen skills in practice mode, then take the timed final test. 100 questions, 10 minutes, with early submission.',
  },
  {
    num: '3',
    title: 'Get Instant Results',
    desc: 'Your score appears immediately after submission. Track progress over time and see where to improve.',
  },
];

const FEATURES = [
  { icon: '🎯', title: 'Five Learning Levels', desc: 'From single-digit basics to complex multi-step problems, each level builds on the last.' },
  { icon: '⏱️', title: 'Timed Tests', desc: 'Every test runs on a 10-minute timer with automatic submission when time runs out.' },
  { icon: '📝', title: 'Practice Mode', desc: 'Practice freely without pressure before attempting the final test for your official score.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Every attempt is recorded so students and teachers can see improvement over time.' },
  { icon: '🔐', title: 'Result Management', desc: 'Final results are visible only to the admin, keeping scores private and secure.' },
];

const SAMPLE_RESULTS = [
  { name: 'Priya S.', level: 'Level 2', score: 92, color: 'bg-brand-500' },
  { name: 'Vikram D.', level: 'Level 4', score: 95, color: 'bg-lavender-500' },
  { name: 'Sneha P.', level: 'Level 5', score: 90, color: 'bg-sunny-400' },
  { name: 'Arjun K.', level: 'Level 1', score: 85, color: 'bg-brand-400' },
];

export default function LandingPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-lavender-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-ink-900 mb-6">
                Master the Abacus,
                <br />
                <span className="bg-gradient-to-r from-brand-600 to-lavender-600 bg-clip-text text-transparent">
                  Shine with Confidence
                </span>
              </h1>
              <p className="text-lg md:text-xl text-ink-600 max-w-lg mb-8 leading-relaxed">
                Bright Academy brings structured abacus learning online. Practice at your pace,
                take timed tests, and watch your calculation skills soar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="btn-primary text-base">
                  Start Test
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.333 8H12.667M12.667 8L8.667 4M12.667 8L8.667 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <a href="#how-it-works" className="btn-outline text-base">How It Works</a>
              </div>
              <div className="flex gap-8 mt-10">
                <div>
                  <div className="text-3xl font-extrabold text-brand-600">5</div>
                  <div className="text-sm text-ink-500">Skill Levels</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-lavender-600">100</div>
                  <div className="text-sm text-ink-500">Questions per Level</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-sunny-500">10 min</div>
                  <div className="text-sm text-ink-500">Per Test</div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in">
              <div className="rounded-card shadow-card-lg overflow-hidden bg-white">
                <AbacusIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="section-eyebrow">How It Works</div>
            <h2 className="section-heading">Three simple steps to your result</h2>
            <p className="section-sub mx-auto">
              From sign-in to score, the entire process takes under ten minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="card p-8 hover:shadow-card-lg transition-shadow animate-fade-up" style={{ animationDelay: `${parseInt(step.num) * 100}ms` }}>
                <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 font-extrabold text-lg flex items-center justify-center mb-5">
                  {step.num}
                </div>
                <h4 className="text-lg font-bold mb-3">{step.title}</h4>
                <p className="text-ink-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-brand-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="section-eyebrow">Features</div>
            <h2 className="section-heading">Everything built for real abacus mastery</h2>
            <p className="section-sub mx-auto">
              Five progressive levels, timed tests, practice mode, and full result management — all in one place.
            </p>
          </div>

          {/* Five levels */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {LEVELS.map((lvl) => (
              <div key={lvl.level} className="card p-5 text-center hover:shadow-card-lg transition-shadow">
                <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-extrabold text-white ${
                  lvl.color === 'brand' ? 'bg-brand-500' : lvl.color === 'lavender' ? 'bg-lavender-500' : 'bg-sunny-400'
                }`}>
                  {lvl.level}
                </div>
                <h4 className="text-sm font-bold mb-1">{lvl.name.split(' — ')[1]}</h4>
                <p className="text-xs text-ink-500 leading-snug">{lvl.description}</p>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="card p-7 hover:shadow-card-lg transition-shadow">
                <div className="text-3xl mb-4">{feat.icon}</div>
                <h4 className="text-base font-bold mb-2">{feat.title}</h4>
                <p className="text-sm text-ink-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results Preview ── */}
      <section id="results" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="section-eyebrow">Results Preview</div>
            <h2 className="section-heading">See how results come to life</h2>
            <p className="section-sub mx-auto">
              A quick look at the results dashboard using clearly labelled sample data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Score card */}
            <div className="card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#2563eb 92%, #e2e8f0 0)' }}>
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <span className="text-xl font-extrabold text-ink-900">92%</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Great work!</h4>
                  <p className="text-sm text-ink-500">92 of 100 correct • 7m 00s</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-ink-600 font-medium">Accuracy</span>
                    <span className="text-ink-900 font-bold">92%</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-200 overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-ink-600 font-medium">Speed</span>
                    <span className="text-ink-900 font-bold">80%</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-200 overflow-hidden">
                    <div className="h-full bg-lavender-500 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-400 mt-6 italic">Sample data shown — not real student results.</p>
            </div>

            {/* Leaderboard preview */}
            <div className="card p-8">
              <h4 className="text-sm font-bold uppercase tracking-wide text-brand-600 mb-4">Recent Top Scores</h4>
              <div className="space-y-4">
                {SAMPLE_RESULTS.map((result, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${result.color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{result.name}</p>
                      <p className="text-xs text-ink-500">{result.level}</p>
                    </div>
                    <div className="text-lg font-extrabold text-ink-900">{result.score}%</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-400 mt-6 italic">Sample data shown — not real student results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Admin Section Preview ── */}
      <section id="admin" className="py-24 bg-gradient-to-b from-brand-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-ink-900 rounded-card p-10 md:p-14 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-sm font-bold uppercase tracking-widest text-brand-400 mb-3">Admin Dashboard</div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
                  Complete control for teachers
                </h2>
                <p className="text-ink-300 leading-relaxed mb-6">
                  Manage students, view practice and final results, organize credentials by level or cohort,
                  and control test access with a single switch.
                </p>
                <Link to="/admin" className="btn bg-white text-ink-900 px-8 py-3.5 hover:bg-ink-100 transition-colors font-semibold rounded-full">
                  View Admin Dashboard
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Students', value: '8', icon: '👥' },
                  { label: 'Practice Results', value: '5', icon: '📝' },
                  { label: 'Final Results', value: '3', icon: '🏆' },
                  { label: 'Test Access', value: 'ON', icon: '✅' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-2xl font-extrabold">{item.value}</div>
                    <div className="text-sm text-ink-300">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-brand-50 to-lavender-50 rounded-card p-12 md:p-16 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Ready to begin your abacus journey?
            </h2>
            <p className="text-ink-600 text-lg mb-8 max-w-xl mx-auto">
              It takes less than ten minutes. Pick your level, start the timer, and show what you can do.
            </p>
            <Link to="/login" className="btn-primary text-base">
              Start Your Test
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.333 8H12.667M12.667 8L8.667 4M12.667 8L8.667 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
