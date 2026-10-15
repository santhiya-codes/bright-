export type TestLevel = 1 | 2 | 3 | 4 | 5;
export type TestMode = 'practice' | 'final';

export interface Student {
  id: string;
  username: string;
  password: string;
  level: TestLevel;
  cohort: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface TestResult {
  id: string;
  studentId: string;
  username: string;
  level: TestLevel;
  mode: TestMode;
  score: number;
  total: number;
  timeTakenSec: number;
  date: string;
}

export const LEVELS: { level: TestLevel; name: string; description: string; color: string }[] = [
  { level: 1, name: 'Level 1 — Foundation', description: 'Single-digit addition & subtraction', color: 'brand' },
  { level: 2, name: 'Level 2 — Intermediate', description: 'Double-digit calculations', color: 'lavender' },
  { level: 3, name: 'Level 3 — Advanced', description: 'Triple-digit & mixed operations', color: 'sunny' },
  { level: 4, name: 'Level 4 — Expert', description: 'Multiplication & division', color: 'brand' },
  { level: 5, name: 'Level 5 — Master', description: 'Complex multi-step problems', color: 'lavender' },
];

export const QUESTIONS_PER_LEVEL = 100;
export const TEST_DURATION_SEC = 600;
