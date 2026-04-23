import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit2, 
  Trash2, 
  ShieldCheck, 
  MoreVertical,
  Mail,
  User,
  History
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { User as UserType } from '../types';

export default function UserManagement() {
  const [users, setUsers] = useState<UserType[]>(() => {
    const saved = localStorage.getItem('smk_users_list');
    return saved ? JSON.parse(saved) : [
        { id: '1', name: 'Administrator', username: 'admin', role: 'ADMIN' },
        { id: '2', name: 'Budi Guru', username: 'budi', role: 'GURU' },
        { id: '3', name: 'Siti Guru', username: 'siti', role: 'GURU' },
        { id: '4', name: 'Staff TU', username: 'staff', role: 'STAFF' },
    ];
  });
  
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', username: '', role: 'GURU' as any });

  useEffect(() => {
    localStorage.setItem('smk_users_list', JSON.stringify(users));
  }, [users]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserType = {
        id: Math.random().toString(36).substr(2, 9),
        ...newUser
    };
    setUsers([...users, user]);
    setShowAdd(false);
    setNewUser({ name: '', username: '', role: 'GURU' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus user ini selamanya?')) {
        setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-900">Kelola Pengguna</h1>
          <p className="text-gray-500 font-medium tracking-tight">Manajemen akun Guru, Staf, dan Administrator.</p>
        </div>
        <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-red-100 hover:bg-primary-dark transition-all"
        >
            <UserPlus size={18} />
            Tambah User Baru
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Cari user..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <History size={14} />
                Update Realtime
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Pengguna</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Username</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.username.includes(search)).map(u => (
                <tr key={u.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-primary font-bold shadow-sm">
                        {u.name.charAt(0)}
                      </div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{u.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">@{u.username}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        u.role === 'ADMIN' ? 'bg-red-50 text-primary border border-red-100' :
                        u.role === 'GURU' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        'bg-gray-50 text-gray-500 border border-gray-100'
                    }`}>
                        <ShieldCheck size={12} />
                        {u.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                        <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={16} /></button>
                        <button 
                            onClick={() => handleDelete(u.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 space-y-6"
              >
                  <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-black text-gray-900">Tambah Akun</h2>
                      <div className="p-2 bg-red-50 text-primary rounded-xl"><UserPlus size={24} /></div>
                  </div>

                  <form onSubmit={handleAdd} className="space-y-4">
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={newUser.name}
                            onChange={e => setNewUser({...newUser, name: e.target.value})}
                          />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Username Baru</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={newUser.username}
                            onChange={e => setNewUser({...newUser, username: e.target.value})}
                          />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Role Akun</label>
                          <select 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={newUser.role}
                            onChange={e => setNewUser({...newUser, role: e.target.value as any})}
                          >
                              <option value="GURU">Guru / Pengajar</option>
                              <option value="STAFF">Staf Kependidikan</option>
                              <option value="ADMIN">Administrator</option>
                          </select>
                      </div>
                      <div className="flex gap-4 pt-4">
                          <button 
                            type="button" 
                            onClick={() => setShowAdd(false)}
                            className="flex-1 px-6 py-3 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                          >
                              Batal
                          </button>
                          <button 
                            type="submit"
                            className="flex-1 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-primary-dark transition-all"
                          >
                              Simpan User
                          </button>
                      </div>
                  </form>
              </motion.div>
          </div>
      )}
    </div>
  );
}
