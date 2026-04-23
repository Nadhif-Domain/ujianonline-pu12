import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, User, Lock, ChevronRight, School, Briefcase } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { DEPARTMENTS, MOCK_STUDENTS, MOCK_STAFF } from '../lib/utils';
import { Role } from '../types';

export default function LoginPage() {
  const [role, setRole] = useState<Role>('SISWA');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0].id);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'SISWA') {
      const student = MOCK_STUDENTS.find(s => s.nisn === username && s.password === password);
      if (student) {
        login({
          id: student.nisn,
          username: student.nisn,
          name: student.name,
          role: 'SISWA',
          department: student.department,
          nisn: student.nisn
        });
        window.location.href = '/app';
      } else {
        setError('NISN atau Password salah');
      }
    } else {
      const staff = MOCK_STAFF.find(s => s.username === username && s.password === password);
      if (staff) {
        login({
          id: staff.username,
          username: staff.username,
          name: staff.name,
          role: staff.role as Role,
        });
        window.location.href = '/app';
      } else {
        setError('Username atau Password salah');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="p-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-red-50 text-primary rounded-2xl flex items-center justify-center shadow-inner">
              <GraduationCap size={40} />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Selamat Datang</h1>
              <p className="text-gray-500">SMK Prima Unggul Online</p>
            </div>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setRole('SISWA')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                role === 'SISWA' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <School size={16} />
              Siswa
            </button>
            <button 
              onClick={() => setRole('GURU')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                role === 'GURU' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase size={16} />
              Staf/Guru
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Username / NISN</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  required
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password"
                  required
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <AnimatePresence>
              {role === 'SISWA' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <label className="text-sm font-semibold text-gray-700 ml-1">Jurusan</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-primary-dark transition-all translate-y-0 active:translate-y-0.5 mt-4"
            >
              Masuk Sekarang
            </button>
          </form>
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              Kota Tangerang Selatan
            </p>
        </div>
      </motion.div>
    </div>
  );
}
