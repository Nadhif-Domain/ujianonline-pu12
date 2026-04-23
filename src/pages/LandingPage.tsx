import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Users, Clock, LogIn, ChevronRight, MapPin, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-bottom border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-primary w-8 h-8" />
            <span className="font-bold text-xl tracking-tight">SMK Prima Unggul</span>
          </div>
          <button 
            onClick={() => window.location.href = '/login'}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm"
          >
            <LogIn size={18} />
            Masuk
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full border border-red-100">
              <Clock size={14} />
              Platform Digital Akademik
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Membangun Masa Depan <span className="text-primary">Berbasis Kompetensi</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Sistem Informasi Akademik, Absensi, dan Ujian Online SMK Prima Unggul Tangerang Selatan. Memudahkan interaksi antara Sekolah, Guru, dan Siswa.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} />
                Kota Tangerang Selatan
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Globe size={16} />
                Global Excellence
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200" 
                alt="School Building"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Program Keahlian</h2>
            <p className="text-gray-600">6 Jurusan Unggulan Terakreditasi</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'TKJ', name: 'Teknik Komputer Jaringan', desc: 'Arsitektur jaringan & infrastruktur IT.' },
              { id: 'DKV', name: 'Desain Komunikasi Visual', desc: 'Kreativitas visual & media digital.' },
              { id: 'AK', name: 'Akuntansi', desc: 'Manajemen keuangan & audit profesional.' },
              { id: 'BC', name: 'Broadcasting', desc: 'Produksi film & penyiaran televisi.' },
              { id: 'MPLB', name: 'Manajemen Perkantoran', desc: 'Administrasi bisnis & layanan prima.' },
              { id: 'BD', name: 'Bisnis Digital', desc: 'E-commerce & pemasaran modern.' },
            ].map((dept, i) => (
              <motion.div 
                key={dept.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-red-50 text-primary rounded-lg flex items-center justify-center mb-4">
                  <BookOpen size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{dept.name}</h3>
                <p className="text-gray-500 text-sm">{dept.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-primary w-6 h-6" />
            <span className="font-bold">SMK Prima Unggul</span>
          </div>
          <p className="text-gray-400 text-sm">© 2026 SMK Prima Unggul Tangerang Selatan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
