import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  GraduationCap, 
  Clock, 
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
          <TrendingUp size={12} />
          {trend}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-2xl font-black text-gray-900">{value}</p>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-900">Halo, {user?.name}! 👋</h1>
          <p className="text-gray-500 font-medium tracking-tight">Selamat bekerja di SMK Prima Unggul Tangerang Selatan.</p>
        </div>
        <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
          <MapPin size={18} className="text-primary" />
          <span className="text-sm font-bold text-gray-700">Tangerang Selatan</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={GraduationCap} 
          label="Total Siswa" 
          value="1,248" 
          trend="+12%" 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={Users} 
          label="Guru & Staf" 
          value="86" 
          color="bg-red-500" 
        />
        <StatCard 
          icon={Clock} 
          label="Kehadiran Hari Ini" 
          value="94%" 
          trend="+2%" 
          color="bg-green-500" 
        />
        <StatCard 
          icon={Calendar} 
          label="Agenda Aktif" 
          value="4" 
          color="bg-orange-500" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-black text-lg">Aktivitas Terkini</h3>
              <button className="text-xs font-bold text-primary px-3 py-1 bg-red-50 rounded-lg">Lihat Semua</button>
            </div>
            <div className="p-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                        <Clock className="text-gray-400" size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">Absensi Siswa Kelas X TKJ 1 {i === 1 ? 'selesai' : 'dimulai'}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Oleh Guru: Budi Santoso • 10 menit yang lalu</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-primary p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-red-100">
              <div className="relative z-10 space-y-4">
                 <h3 className="text-xl font-black">Informasi Penting</h3>
                 <p className="text-sm text-red-50 font-medium leading-relaxed opacity-90">
                    UJIAN TENGAH SEMESTER (UTS) akan dilaksanakan mulai senin besok. Mohon persiapkan data soal dengan teliti.
                 </p>
                 <button className="w-full bg-white text-primary py-3 rounded-xl font-bold text-sm shadow-lg shadow-black/10">
                    Pelajari Selengkapnya
                 </button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10">
                 <GraduationCap size={160} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
