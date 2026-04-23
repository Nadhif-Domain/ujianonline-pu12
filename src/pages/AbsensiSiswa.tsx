import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  CheckCircle2, 
  XCircle,
  GraduationCap,
  ChevronDown
} from 'lucide-react';
import { DEPARTMENTS, CLASSES } from '../lib/utils';

interface StudentAttendance {
  id: string;
  name: string;
  nisn: string;
  class: string;
  department: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'PERMISSION' | 'NONE';
}

const INITIAL_STUDENTS: StudentAttendance[] = [
  { id: '1', name: 'Andi Pratama', nisn: '0082341234', class: 'X', department: 'TKJ', status: 'NONE' },
  { id: '2', name: 'Bunga Citra', nisn: '0082341235', class: 'X', department: 'TKJ', status: 'NONE' },
  { id: '3', name: 'Citra Kirana', nisn: '0082341236', class: 'X', department: 'TKJ', status: 'NONE' },
  { id: '4', name: 'Dedi Kurniawan', nisn: '0082341237', class: 'X', department: 'TKJ', status: 'NONE' },
  { id: '5', name: 'Eka Saputra', nisn: '0082341238', class: 'X', department: 'TKJ', status: 'NONE' },
];

export default function AbsensiSiswa() {
  const [students, setStudents] = useState<StudentAttendance[]>(INITIAL_STUDENTS);
  const [selectedDept, setSelectedDept] = useState('TKJ');
  const [selectedClass, setSelectedClass] = useState('X');
  const [search, setSearch] = useState('');

  const updateStatus = (id: string, status: StudentAttendance['status']) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const stats = {
    present: students.filter(s => s.status === 'PRESENT').length,
    absent: students.filter(s => s.status === 'ABSENT').length,
    late: students.filter(s => s.status === 'LATE').length,
    total: students.length
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-900">Presensi Siswa</h1>
          <p className="text-gray-500 font-medium">Manajemen kehadiran harian siswa SMK Prima Unggul.</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-red-100 hover:bg-primary-dark transition-all">
                Simpan Presensi
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Hadir</p>
            <p className="text-2xl font-black text-green-600">{stats.present}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Alpa</p>
            <p className="text-2xl font-black text-red-600">{stats.absent}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Terlambat</p>
            <p className="text-2xl font-black text-orange-600">{stats.late}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Rombel</p>
            <p className="text-2xl font-black text-gray-900">{stats.total}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="relative">
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                <select 
                    value={selectedClass} 
                    onChange={e => setSelectedClass(e.target.value)}
                    className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    {CLASSES.map(c => <option key={c} value={c}>Kelas {c}</option>)}
                </select>
            </div>
            <div className="relative">
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                <select 
                    value={selectedDept} 
                    onChange={e => setSelectedDept(e.target.value)}
                    className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
            </div>
          </div>

          <div className="relative w-full md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input 
                type="text" 
                placeholder="Cari nama atau NISN..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
             />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Siswa</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identitas</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.nisn.includes(search)).map(student => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 text-primary rounded-xl flex items-center justify-center font-bold text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{student.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold">{student.class} {student.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-mono font-bold text-gray-500">NISN: {student.nisn}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                        <AttendanceButton 
                            active={student.status === 'PRESENT'} 
                            onClick={() => updateStatus(student.id, 'PRESENT')}
                            label="Hadir"
                            color="active:bg-green-600 bg-green-50 text-green-600 active:text-white"
                            activeColor="bg-green-600 text-white"
                        />
                        <AttendanceButton 
                            active={student.status === 'LATE'} 
                            onClick={() => updateStatus(student.id, 'LATE')}
                            label="Terlambat"
                            color="active:bg-orange-600 bg-orange-50 text-orange-600 active:text-white"
                            activeColor="bg-orange-600 text-white"
                        />
                         <AttendanceButton 
                            active={student.status === 'ABSENT'} 
                            onClick={() => updateStatus(student.id, 'ABSENT')}
                            label="Alpa"
                            color="active:bg-red-600 bg-red-50 text-red-600 active:text-white"
                            activeColor="bg-red-600 text-white"
                        />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const AttendanceButton = ({ active, onClick, label, color, activeColor }: any) => (
    <button 
        onClick={onClick}
        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border border-transparent ${
            active ? `${activeColor} shadow-sm` : `${color} border-current opacity-70 hover:opacity-100`
        }`}
    >
        {label}
    </button>
);
