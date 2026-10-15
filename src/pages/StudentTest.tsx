import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LEVELS, QUESTIONS_PER_LEVEL, TEST_DURATION_SEC, type TestLevel, type TestMode } from '../types';
import { getPlaceholderQuestions } from '../data';

interface TestLocationState {
  studentId: string;
  username: string;
  level: TestLevel;
}

type Phase = 'select' | 'testing' | 'results';

export default function StudentTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as TestLocationState | null;

  const [phase, setPhase] = useState<Phase>('select');
  const [mode, setMode] = useState<TestMode | null>(null);
  const [level, setLevel] = useState<TestLevel | null>(state?.level ?? null);
  const [questions, setQuestions] = useState(() => level ? getPlaceholderQuestions(level) : []);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SEC);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Guard: if no student data, redirect to login
  useEffect(() => {
    if (!state?.studentId) {
      navigate('/login');
    }
  }, [state, navigate]);

  const handleSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('results');
  }, []);

  // Timer effect
  useEffect(() => {
    if (phase !== 'testing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const startTest = (selectedMode: TestMode, selectedLevel: TestLevel) => {
    setMode(selectedMode);
    setLevel(selectedLevel);
    setQuestions(getPlaceholderQuestions(selectedLevel));
    setCurrentQ(0);
    setAnswers({});
    setTimeLeft(TEST_DURATION_SEC);
    setPhase('testing');
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const score = Object.entries(answers).filter(([qId, ans]) => {
    return questions[parseInt(qId)]?.correctIndex === ans;
  }).length;

  // ── Phase: Select mode and level ──
  if (phase === 'select') {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-brand-50/50 to-white py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Welcome, {state?.username}!</h1>
            <p className="text-ink-500">Choose your test mode and level to begin</p>
          </div>

          {/* Mode selection */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-600 mb-4">1. Select Mode</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setMode('practice')}
                className={`card p-6 text-left transition-all ${mode === 'practice' ? 'ring-2 ring-brand-500 border-brand-500' : 'hover:shadow-card-lg'}`}
              >
                <div className="text-3xl mb-3">📝</div>
                <h3 className="text-lg font-bold mb-1">Practice Mode</h3>
                <p className="text-sm text-ink-500">Take your time. No pressure — just learn and improve.</p>
              </button>
              <button
                onClick={() => setMode('final')}
                className={`card p-6 text-left transition-all ${mode === 'final' ? 'ring-2 ring-brand-500 border-brand-500' : 'hover:shadow-card-lg'}`}
              >
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-lg font-bold mb-1">Final Test Mode</h3>
                <p className="text-sm text-ink-500">Timed test. Your score will be recorded and sent to admin.</p>
              </button>
            </div>
          </div>

          {/* Level selection */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-600 mb-4">2. Select Level</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl.level}
                  onClick={() => setLevel(lvl.level)}
                  className={`card p-5 text-center transition-all ${level === lvl.level ? 'ring-2 ring-brand-500 border-brand-500' : 'hover:shadow-card-lg'}`}
                >
                  <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-extrabold text-white ${
                    lvl.color === 'brand' ? 'bg-brand-500' : lvl.color === 'lavender' ? 'bg-lavender-500' : 'bg-sunny-400'
                  }`}>
                    {lvl.level}
                  </div>
                  <h4 className="text-sm font-bold">{lvl.name.split(' — ')[1]}</h4>
                  <p className="text-xs text-ink-500 mt-1">{lvl.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Start button */}
          <div className="text-center">
            <button
              onClick={() => mode && level && startTest(mode, level)}
              disabled={!mode || !level}
              className={`btn-primary text-base ${(!mode || !level) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Begin Test
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.333 8H12.667M12.667 8L8.667 4M12.667 8L8.667 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {!mode && <p className="text-sm text-ink-400 mt-3">Select a mode to continue</p>}
            {mode && !level && <p className="text-sm text-ink-400 mt-3">Select a level to continue</p>}
          </div>
        </div>
      </div>
    );
  }

  // ── Phase: Testing ──
  if (phase === 'testing' && level && mode) {
    const q = questions[currentQ];
    const isLowTime = timeLeft <= 60;

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-ink-50 py-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                mode === 'practice' ? 'bg-brand-100 text-brand-700' : 'bg-lavender-100 text-lavender-600'
              }`}>
                {mode === 'practice' ? 'Practice' : 'Final Test'}
              </span>
              <span className="text-sm text-ink-500 font-medium hidden sm:inline">Level {level}</span>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg ${
              isLowTime ? 'bg-red-50 text-red-600 animate-count-pulse' : 'bg-white text-ink-900 shadow-soft'
            }`}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-ink-700">Question {currentQ + 1} of {QUESTIONS_PER_LEVEL}</span>
              <span className="text-ink-500">{answeredCount} answered</span>
            </div>
            <div className="h-2 rounded-full bg-ink-200 overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / QUESTIONS_PER_LEVEL) * 100}%` }} />
            </div>
          </div>

          {/* Question card */}
          <div className="card p-8 mb-6">
            <div className="text-xs font-bold uppercase tracking-wide text-brand-600 mb-3">
              Question {currentQ + 1}
            </div>
            <p className="text-xl md:text-2xl font-bold text-ink-900 mb-8 text-center py-6 bg-ink-50 rounded-lg">
              {q.text}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers({ ...answers, [currentQ]: i })}
                  className={`p-4 rounded-lg border-2 text-left font-semibold transition-all ${
                    answers[currentQ] === i
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300'
                  }`}
                >
                  <span className="inline-flex w-7 h-7 rounded-full bg-ink-100 text-ink-600 items-center justify-center text-sm font-bold mr-3">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              className="btn bg-white text-ink-700 border-2 border-ink-200 px-6 py-3 hover:bg-ink-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex gap-2">
              {currentQ < QUESTIONS_PER_LEVEL - 1 ? (
                <button
                  onClick={() => setCurrentQ(currentQ + 1)}
                  className="btn-primary text-sm"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-green-700 transition-colors"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>

          {/* Early submit */}
          <div className="text-center mt-6">
            <button
              onClick={() => {
                if (confirm('Submit early? Your answers will be scored with what you have completed so far.')) {
                  handleSubmit();
                }
              }}
              className="text-sm text-ink-400 hover:text-red-600 transition-colors underline"
            >
              Submit test early
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Phase: Results ──
  if (phase === 'results' && level && mode) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-brand-50 to-white py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card p-10 text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{
              background: `conic-gradient(#2563eb ${score}%, #e2e8f0 0)`
            }}>
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-extrabold text-ink-900">{score}</span>
              </div>
            </div>

            <h1 className="text-2xl font-extrabold mb-2">Test Complete!</h1>
            <p className="text-ink-500 mb-8">
              You scored <span className="font-bold text-brand-600">{score} out of {QUESTIONS_PER_LEVEL}</span> on Level {level} ({mode} mode)
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-ink-50 rounded-xl p-4">
                <div className="text-2xl font-extrabold text-ink-900">{answeredCount}</div>
                <div className="text-xs text-ink-500">Answered</div>
              </div>
              <div className="bg-brand-50 rounded-xl p-4">
                <div className="text-2xl font-extrabold text-brand-600">{score}</div>
                <div className="text-xs text-ink-500">Correct</div>
              </div>
              <div className="bg-ink-50 rounded-xl p-4">
                <div className="text-2xl font-extrabold text-ink-900">{formatTime(TEST_DURATION_SEC - timeLeft)}</div>
                <div className="text-xs text-ink-500">Time Used</div>
              </div>
            </div>

            {mode === 'final' && (
              <div className="bg-lavender-50 text-lavender-600 text-sm font-medium px-4 py-3 rounded-lg mb-6">
                Your final test result has been recorded and is visible to your admin.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login" className="btn-outline text-sm">Back to Login</Link>
              <Link to="/" className="btn-primary text-sm">Return Home</Link>
            </div>
          </div>

          <p className="text-xs text-ink-400 text-center mt-4 italic">
            Placeholder questions were used — real abacus questions will be added in a later stage.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
