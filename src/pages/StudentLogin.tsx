import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { type TestLevel, type TestMode } from '../types';
import { SAMPLE_STUDENTS, SAMPLE_TEST_ACCESS } from '../data';

export default function StudentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    if (!SAMPLE_TEST_ACCESS.enabled) {
      setError('Tests are currently disabled by the admin. Please try again later.');
      return;
    }

    const student = SAMPLE_STUDENTS.find(
      (s) => s.username === username.trim() && s.password === password.trim()
    );

    if (!student) {
      setError('Invalid username or password. Please check your credentials.');
      return;
    }

    navigate('/test', {
      state: { studentId: student.id, username: student.username, level: student.level },
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-brand-50 via-lavender-50 to-white px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-ink-900 mb-2">Student Login</h1>
          <p className="text-ink-500">Enter your credentials to begin your test</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-ink-600 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-ink-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="input-field"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-lg animate-fade-in">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full text-base mt-2">
              Start Test
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3.333 8H12.667M12.667 8L8.667 4M12.667 8L8.667 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </form>

          {/* Sample credentials hint */}
          <div className="mt-6 pt-6 border-t border-ink-200">
            <p className="text-xs text-ink-400 text-center leading-relaxed">
              <span className="font-semibold">Sample login (for preview):</span><br />
              Username: arjun_k · Password: bright2024
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-ink-500 hover:text-brand-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Re-export types for convenience in test page
export type { TestLevel, TestMode };
