/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'student' | 'admin' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  purchasedCourses: string[]; // List of course IDs
  testHistory: TestAttempt[];
  avatarUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  fee: number;
  rating: number;
  durationMonths: number;
  lecturesCount: number;
  syllabus: string[];
  bannerUrl?: string;
  tag: 'Advanced Intensive' | 'Foundation' | 'Crash Course' | 'Rank Booster';
}

export interface LectureNote {
  id: string;
  title: string;
  description: string;
  chapter: string;
  category: 'Algebra' | 'Calculus' | 'Coordinate Geometry' | 'Trigonometry' | 'Vectors & 3D' | 'Probability & Stats';
  fileUrl: string; // Used to simulate reading
  contentPreview: string; // The textual preview simulated in the browser
  isPremium: boolean;
  pageCount: number;
}

export interface VideoLecture {
  id: string;
  title: string;
  description: string;
  chapter: string;
  category: 'Algebra' | 'Calculus' | 'Coordinate Geometry' | 'Trigonometry' | 'Vectors & 3D' | 'Probability & Stats';
  videoUrl: string; // Embedded placeholder or custom player source
  duration: string; // e.g., "1h 15m"
  isPremium: boolean;
  faculty: string;
}

export interface PYQ {
  id: string;
  year: number;
  exam: 'JEE Main' | 'JEE Advanced';
  chapter: string;
  title: string;
  questionImageUrl?: string;
  questionText: string;
  options?: string[];
  correctAnswer?: string;
  solutionText: string;
}

export interface SyllabusItem {
  id: string;
  category: string;
  topic: string;
  weightage: string; // e.g. "8% - 10%"
  status: 'Completed' | 'In Progress' | 'Upcoming';
  keyConcepts: string[];
  recommendedBooks: string[];
}

export interface TestAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  date: string;
  score: number;
  maxScore: number;
  timeSpentSeconds: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  latexFormula?: string;
  options: string[];
  correctAnswerIndex: number;
  solutionExplanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topic: string;
  durationMinutes: number;
  totalMarks: number;
  questions: QuizQuestion[];
}
