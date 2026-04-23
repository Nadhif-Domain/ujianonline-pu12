import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  ClipboardList, 
  Settings, 
  LogOut, 
  GraduationCap,
  Menu,
  X,
  FileText,
  Clock
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }: SidebarItemProps) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-primary text-white shadow-md shadow-red-100' 
        : 'text-gray-500 hover:bg-red-50 hover:text-primary'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={active ? 'text-white' : 'group-hover:text-primary'} />
      <span className="font-semibold text-sm">{label}</span>
    </div>
    {badge && (
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
        active ? 'bg-white/20 text-white' : 'bg-red-100 text-primary'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

export default function AppLayout({ children }: { 
  children: React.ReactNode
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = (role: Role) => {
    const items = [
      { id: '', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'absensi-karyawan', label: 'Absensi Saya', icon: Clock },
    ];

    if (role === 'ADMIN') {
      items.push(
        { id: 'absensi-siswa', label: 'Absensi Siswa', icon: UserCheck },
        { id: 'ujian-online', label: 'Ujian Online', icon: FileText },
        { id: 'user-management', label: 'Pengelola User', icon: Settings },
      );
    } else if (role === 'GURU') {
      items.push(
        { id: 'absensi-siswa', label: 'Absensi Siswa', icon: UserCheck },
        { id: 'ujian-online', label: 'Ujian Online', icon: FileText },
      );
    } else if (role === 'SISWA') {
      items.push(
        { id: 'ujian-online', label: 'Ujian Online', icon: FileText },
      );
    }

    return items;
  };

  const menuItems = getMenuItems(user?.role || 'SISWA');
  const activePath = location.pathname.split('/').pop() || '';

  const handleNav = (id: string) => {
    navigate(`/app/${id}`);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-right border-gray-100 transition-transform duration-300 transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 leading-none mb-1">SMK Prima</h1>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Unggul Online</span>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Menu Utama</p>
            {menuItems.map(item => (
              <SidebarItem 
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activePath === item.id}
                onClick={() => handleNav(item.id)}
              />
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <div className="bg-gray-50 p-4 rounded-2xl mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 text-primary font-bold shadow-sm">
                  {user?.name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-bottom border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center gap-4">
               <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Tangerang Selatan, Indonesia</p>
               </div>
          </div>

          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-primary hover:bg-red-50 rounded-xl transition-all font-semibold text-sm"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
