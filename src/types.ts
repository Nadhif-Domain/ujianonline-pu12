/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'ADMIN' | 'GURU' | 'STAFF' | 'SISWA';

export interface User {
  id: string;
  username: string;
  name: string;
  role: Role;
  department?: string;
  nisn?: string;
}

export interface Student {
  id: string;
  nisn: string;
  name: string;
  class: string;
  department: string;
}

export interface Attendance {
  id: string;
  userId: string;
  date: string;
  time: string;
  type: 'IN' | 'OUT';
  location?: string;
}

export interface Exam {
  id: string;
  title: string;
  department: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'EASY' | 'HARD';
}

export interface ExamResult {
  id: string;
  studentId: string;
  examId: string;
  score: number;
  date: string;
  answers: number[];
}
