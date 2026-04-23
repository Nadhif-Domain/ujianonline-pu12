import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  AlertCircle,
  Camera,
  History,
  ScanLine
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AbsensiKaryawan() {
  const { user } = useAuth();
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'SUCCESS'>('IDLE');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAbsen = () => {
    setStatus('SCANNING');
    setTimeout(() => {
        setStatus('SUCCESS');
        // Register in history locally
        const history = JSON.parse(localStorage.getItem('absensi_karyawan') || '[]');
        history.unshift({
            id: Date.now(),
            name: user?.name,
            role: user?.role,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            type: 'MASUK',
            location: 'SMK Prima Unggul (Area A)'
        });
        localStorage.setItem('absensi_karyawan', JSON.stringify(history));
    }, 1500);
  };

  const history = JSON.parse(localStorage.getItem('absensi_karyawan') || '[]');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900">Absensi Mandiri</h1>
            <p className="text-gray-500 font-medium">Staf & Guru SMK Prima Unggul</p>
          </div>
          <div className="px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
             <span className="text-sm font-bold text-gray-700">GPS Terkoneksi</span>
          </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-6">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Waktu Sekarang</p>
                 <h2 className="text-5xl font-black text-gray-900 tracking-tighter">{time}</h2>
                 <p className="text-sm font-bold text-gray-400 capitalize">{new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
              </div>

              <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group">
                 <AnimatePresence mode="wait">
                    {status === 'IDLE' && (
                        <motion.div 
                          key="idle"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex flex-col items-center gap-4 p-8 text-center"
                        >
                           <div className="w-20 h-20 bg-red-50 text-primary rounded-full flex items-center justify-center">
                              <Camera size={32} />
                           </div>
                           <div>
                              <p className="font-bold text-gray-900">Siap Melakukan Absensi</p>
                              <p className="text-xs text-gray-500 font-medium mt-1">Pastikan wajah Anda jelas dan berada di area sekolah</p>
                           </div>
                        </motion.div>
                    )}
                    {status === 'SCANNING' && (
                        <motion.div 
                          key="scanning"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="w-full h-full flex items-center justify-center bg-gray-900"
                        >
                            <div className="w-48 h-48 border-2 border-primary rounded-2xl relative">
                                <motion.div 
                                  animate={{ top: ['0%', '100%', '0%'] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                  className="absolute left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <ScanLine className="text-primary opacity-20" size={64} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {status === 'SUCCESS' && (
                        <motion.div 
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center gap-4 p-8 text-center"
                        >
                             <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle2 size={40} />
                             </div>
                             <div>
                                <p className="font-bold text-gray-900">Absensi Berhasil!</p>
                                <p className="text-xs text-green-600 font-bold uppercase tracking-wider mt-1">Status: Hadir (Tepat Waktu)</p>
                             </div>
                             <button onClick={() => setStatus('IDLE')} className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">Lakukan Lagi</button>
                        </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              <button 
                onClick={handleAbsen}
                disabled={status !== 'IDLE'}
                className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-red-100 flex items-center justify-center gap-3 hover:bg-primary-dark transition-all disabled:bg-gray-200 disabled:shadow-none"
              >
                {status === 'IDLE' ? (
                    <>
                        <Clock size={20} />
                        Absen Masuk Sekarang
                    </>
                ) : (
                    status === 'SCANNING' ? 'Memindai...' : 'Selesai'
                )}
              </button>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
               <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                       <History size={18} className="text-gray-400" />
                       <h3 className="font-bold text-gray-900">Riwayat Terkini</h3>
                   </div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Log</span>
               </div>
               <div className="flex-1 p-6 overflow-auto max-h-[500px]">
                   {history.length > 0 ? (
                       <div className="space-y-4">
                           {history.map((h: any) => (
                               <div key={h.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${h.type === 'MASUK' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                       {h.type === 'MASUK' ? 'IN' : 'OUT'}
                                   </div>
                                   <div className="flex-1 min-w-0">
                                       <div className="flex justify-between items-start mb-1">
                                           <p className="text-sm font-bold text-gray-900 truncate">{h.name}</p>
                                           <p className="text-[10px] font-bold text-gray-400">{h.time}</p>
                                       </div>
                                       <p className="text-xs text-gray-500 flex items-center gap-1">
                                          <MapPin size={10} />
                                          {h.location}
                                       </p>
                                   </div>
                               </div>
                           ))}
                       </div>
                   ) : (
                       <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-40">
                           <AlertCircle size={48} />
                           <p className="font-bold text-sm">Belum ada riwayat absensi hari ini</p>
                       </div>
                   )}
               </div>
           </div>
        </div>
      </div>
    </div>
  );
}
