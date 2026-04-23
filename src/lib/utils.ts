import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEPARTMENTS = [
  { id: 'TKJ', name: 'Teknik Komputer & Jaringan' },
  { id: 'DKV', name: 'Desain Komunikasi Visual' },
  { id: 'AK', name: 'Akuntansi' },
  { id: 'BC', name: 'Broadcasting' },
  { id: 'MPLB', name: 'Manajemen Perkantoran & Layanan Bisnis' },
  { id: 'BD', name: 'Bisnis Digital' },
];

export const CLASSES = ['X', 'XI', 'XII'];

export const MOCK_STUDENTS = [
  { nisn: '1001', password: 'password123', name: 'Andi Pratama', department: 'TKJ', class: 'X' },
  { nisn: '1002', password: 'password123', name: 'Bunga Citra', department: 'DKV', class: 'XI' },
  { nisn: '1003', password: 'password123', name: 'Citra Kirana', department: 'AK', class: 'XII' },
  { nisn: '1004', password: 'password123', name: 'Dedi Kurniawan', department: 'BC', class: 'X' },
  { nisn: '1005', password: 'password123', name: 'Eka Saputra', department: 'MPLB', class: 'XI' },
  { nisn: '1006', password: 'password123', name: 'Fajar Ramadhan', department: 'BD', class: 'XII' },
];

export const MOCK_STAFF = [
  { username: 'admin', password: 'admin123', name: 'Administrator', role: 'ADMIN' },
  { username: 'guru1', password: 'password123', name: 'Budi Santoso, S.Pd', role: 'GURU' },
  { username: 'guru2', password: 'password123', name: 'Siti Aminah, M.Pd', role: 'GURU' },
  { username: 'staf1', password: 'password123', name: 'Joko Susilo', role: 'STAFF' },
];
