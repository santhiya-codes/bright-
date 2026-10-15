import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_STUDENTS, SAMPLE_RESULTS } from '../data';

type Tab = 'students' | 'practice' | 'final' | 'credentials';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('students');
  const [testAccess, setTestAccess] = useState(true);

  const practiceResults = SAMPLE_RESULTS.filter((r) => r.mode === 'practice');
  const finalResults = SAMPLE_RESULTS.filter((r) => r.mode === 'final');

  const studentsByCohort = SAMPLE_STUDENTS.reduce<Record<string, typeof SAMPLE_STUDENTS>>((acc, s) => {
    if (!acc[s.cohort]) acc[s.cohort] = [];
    acc[s.cohort].push(s);
    return acc;
  }, {});

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'practice', label: 'Practice Results', icon: '📝' },
    { id: 'final', label: 'Final Results', icon: '🏆' },
    { id: 'credentials', label: 'Credentials', icon: '🔑' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-ink-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-ink-900">Admin Dashboard</h1>
            <p className="text-sm text-ink-500 mt-1">Manage students, view results, and control test access</p>
          </div>

          {/* Test Access Master Toggle */}
          <div className="card px-6 py-4 flex items-center gap-4">
            <div>
              <div className="text-sm font-bold text-ink-900">Test Access</div>
              <div className="text-xs text-ink-500">Master ON/OFF control</div>
            </div>
            <button
              onClick={() => setTestAccess(!testAccess)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                testAccess ? 'bg-green-500' : 'bg-ink-300'
              }`}
              aria-label={`Test access is ${testAccess ? 'ON' : 'OFF'}`}
            >
              <span
                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  testAccess ? 'left-7' : 'left-1'
                }`}
              />
            </button>
            <span className={`text-sm font-bold ${testAccess ? 'text-green-600' : 'text-ink-400'}`}>
              {testAccess ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id
                  ? 'bg-brand-600 text-white shadow-soft'
                  : 'bg-white text-ink-600 hover:bg-ink-100'
              }`}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Students Tab ── */}
        {tab === 'students' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-ink-50 border-b border-ink-200">
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Username</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Level</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Cohort</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Tests Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_STUDENTS.map((s) => {
                    const testCount = SAMPLE_RESULTS.filter((r) => r.studentId === s.id).length;
                    return (
                      <tr key={s.id} className="border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-ink-900">{s.username}</td>
                        <td className="px-6 py-4 text-sm text-ink-600">
                          <span className="inline-flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${
                              s.level <= 2 ? 'bg-brand-500' : s.level <= 3 ? 'bg-lavender-500' : 'bg-sunny-400'
                            }`}>{s.level}</span>
                            Level {s.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-ink-600">{s.cohort}</td>
                        <td className="px-6 py-4 text-sm text-ink-600">{testCount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-ink-50/50 border-t border-ink-100">
              <p className="text-xs text-ink-400 italic">Sample data — not real student records.</p>
            </div>
          </div>
        )}

        {/* ── Practice Results Tab ── */}
        {tab === 'practice' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-ink-50 border-b border-ink-200">
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Student</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Level</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Score</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Time</th>
                    <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {practiceResults.map((r) => (
                    <tr key={r.id} className="border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-ink-900">{r.username}</td>
                      <td className="px-6 py-4 text-sm text-ink-600">Level {r.level}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="font-bold text-brand-600">{r.score}/{r.total}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-600">{Math.floor(r.timeTakenSec / 60)}m {r.timeTakenSec % 60}s</td>
                      <td className="px-6 py-4 text-sm text-ink-600">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-ink-50/50 border-t border-ink-100">
              <p className="text-xs text-ink-400 italic">Sample data — not real results.</p>
            </div>
          </div>
        )}

        {/* ── Final Results Tab (admin-only) ── */}
        {tab === 'final' && (
          <div>
            <div className="bg-lavender-50 text-lavender-600 text-sm font-medium px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <span>🔒</span> Final results are visible only to the admin.
            </div>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-ink-50 border-b border-ink-200">
                      <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Student</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Level</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Final Score</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Time</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-ink-600">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalResults.map((r) => (
                      <tr key={r.id} className="border-b border-ink-100 hover:bg-ink-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-ink-900">{r.username}</td>
                        <td className="px-6 py-4 text-sm text-ink-600">Level {r.level}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="font-bold text-lavender-600">{r.score}/{r.total}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-ink-600">{Math.floor(r.timeTakenSec / 60)}m {r.timeTakenSec % 60}s</td>
                        <td className="px-6 py-4 text-sm text-ink-600">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 bg-ink-50/50 border-t border-ink-100">
                <p className="text-xs text-ink-400 italic">Sample data — not real results.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Credentials Tab ── */}
        {tab === 'credentials' && (
          <div className="space-y-6">
            {Object.entries(studentsByCohort).map(([cohort, students]) => (
              <div key={cohort} className="card overflow-hidden">
                <div className="bg-ink-900 text-white px-6 py-3 flex items-center justify-between">
                  <span className="font-bold text-sm">{cohort}</span>
                  <span className="text-xs text-ink-300">{students.length} students</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-ink-50 border-b border-ink-200">
                        <th className="text-left px-6 py-3 text-sm font-bold text-ink-600">Username</th>
                        <th className="text-left px-6 py-3 text-sm font-bold text-ink-600">Password</th>
                        <th className="text-left px-6 py-3 text-sm font-bold text-ink-600">Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <tr key={s.id} className="border-b border-ink-100">
                          <td className="px-6 py-3 text-sm font-semibold text-ink-900">{s.username}</td>
                          <td className="px-6 py-3 text-sm text-ink-600 font-mono">{s.password}</td>
                          <td className="px-6 py-3 text-sm text-ink-600">Level {s.level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            <p className="text-xs text-ink-400 italic">Sample credentials — temporary data for preview only.</p>
          </div>
        )}

        {/* Back link */}
        <div className="mt-8">
          <Link to="/" className="text-sm text-ink-500 hover:text-brand-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
