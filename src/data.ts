import type { Student, TestResult, TestLevel, Question } from './types';
import { QUESTIONS_PER_LEVEL } from './types';

// ──────────────────────────────────────────────
// SAMPLE DATA — clearly labelled, temporary.
// Replace with real database data in a later stage.
// ──────────────────────────────────────────────

export const SAMPLE_STUDENTS: Student[] = [
  { id: 's1', username: 'arjun_k', password: 'bright2024', level: 1, cohort: 'Batch A — 2024' },
  { id: 's2', username: 'priya_s', password: 'bright2024', level: 2, cohort: 'Batch A — 2024' },
  { id: 's3', username: 'rohan_m', password: 'bright2024', level: 3, cohort: 'Batch B — 2024' },
  { id: 's4', username: 'ananya_r', password: 'bright2024', level: 1, cohort: 'Batch B — 2024' },
  { id: 's5', username: 'vikram_d', password: 'bright2024', level: 4, cohort: 'Batch C — 2024' },
  { id: 's6', username: 'sneha_p', password: 'bright2024', level: 5, cohort: 'Batch C — 2024' },
  { id: 's7', username: 'karan_j', password: 'bright2024', level: 2, cohort: 'Batch A — 2024' },
  { id: 's8', username: 'divya_n', password: 'bright2024', level: 3, cohort: 'Batch B — 2024' },
];

export const SAMPLE_RESULTS: TestResult[] = [
  { id: 'r1', studentId: 's1', username: 'arjun_k', level: 1, mode: 'practice', score: 85, total: 100, timeTakenSec: 480, date: '2024-10-10' },
  { id: 'r2', studentId: 's2', username: 'priya_s', level: 2, mode: 'practice', score: 92, total: 100, timeTakenSec: 420, date: '2024-10-11' },
  { id: 'r3', studentId: 's2', username: 'priya_s', level: 2, mode: 'final', score: 88, total: 100, timeTakenSec: 450, date: '2024-10-12' },
  { id: 'r4', studentId: 's3', username: 'rohan_m', level: 3, mode: 'practice', score: 78, total: 100, timeTakenSec: 510, date: '2024-10-09' },
  { id: 'r5', studentId: 's3', username: 'rohan_m', level: 3, mode: 'final', score: 81, total: 100, timeTakenSec: 490, date: '2024-10-13' },
  { id: 'r6', studentId: 's5', username: 'vikram_d', level: 4, mode: 'final', score: 95, total: 100, timeTakenSec: 380, date: '2024-10-14' },
  { id: 'r7', studentId: 's6', username: 'sneha_p', level: 5, mode: 'practice', score: 90, total: 100, timeTakenSec: 440, date: '2024-10-14' },
  { id: 'r8', studentId: 's1', username: 'arjun_k', level: 1, mode: 'final', score: 79, total: 100, timeTakenSec: 520, date: '2024-10-15' },
];

// SAMPLE TEST ACCESS STATE — temporary. Will be controlled by admin in a later stage.
export const SAMPLE_TEST_ACCESS = {
  enabled: true,
};

// ──────────────────────────────────────────────
// PLACEHOLDER QUESTIONS — not real abacus questions.
// The user will provide the real question bank.
// Each level generates QUESTIONS_PER_LEVEL placeholders.
// ──────────────────────────────────────────────

export function getPlaceholderQuestions(level: TestLevel): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < QUESTIONS_PER_LEVEL; i++) {
    const qNum = i + 1;
    questions.push({
      id: qNum,
      text: `[Level ${level} — Placeholder Question ${qNum}]  Abacus problem will appear here`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctIndex: 0,
    });
  }
  return questions;
}
