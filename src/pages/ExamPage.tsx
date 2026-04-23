import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  AlertTriangle,
  Timer,
  Trophy,
  XCircle,
  Brain,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Question } from '../types';

// Mock Question Generator for 30 Questions
const generateMockQuestions = (dept: string): Question[] => {
  const questions: Question[] = [];
  const subjects = ['Bahasa Indonesia', 'Matematika', 'Bahasa Inggris', 'Dasar Kejuruan ' + dept];
  
  for (let i = 1; i <= 30; i++) {
    const isHard = i > 15;
    questions.push({
      id: i.toString(),
      text: `Pertanyaan nomor ${i}: Pelajaran ${subjects[i % subjects.length]}. Apa yang dimaksud dengan elemen kunci dalam konteks kompetensi keahlian ${dept}?`,
      options: [
        'Opsi A: Deskripsi teknis mendasar',
        'Opsi B: Implementasi lapangan praktis',
        'Opsi C: Teori pendukung utama',
        'Opsi D: Evaluasi hasil kerja'
      ],
      correctAnswer: i % 4, // Pseudo random correct answer
      difficulty: isHard ? 'HARD' : 'EASY'
    });
  }
  return questions;
};

export default function ExamPage() {
  const { user } = useAuth();
  const [questions] = useState(() => generateMockQuestions(user?.department || 'TKJ'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleFinish(true); // Force finish
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const handleSelect = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleFinish = (force = false) => {
    if (force) {
      setIsFinished(true);
      window.scrollTo(0, 0);
      return;
    }

    const unanswered = questions.length - Object.keys(answers).length;
    let message = 'Yakin ingin mengumpulkan ujian sekarang?';
    if (unanswered > 0) {
      message = `Terdapat ${unanswered} soal yang belum dijawab. Yakin ingin mengumpulkan?`;
    }
    
    if (window.confirm(message)) {
      setIsFinished(true);
      window.scrollTo(0, 0);
    }
  };

  const calculateStats = () => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((q, i) => {
      if (answers[i] === undefined) {
        unanswered++;
      } else if (answers[i] === q.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);
    return { correct, wrong, unanswered, score };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    const { correct, wrong, unanswered, score } = calculateStats();
    const passed = score >= 50;
    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden"
            >
                {/* Result Header */}
                <div className={`p-12 text-center text-white ${passed ? 'bg-green-600' : 'bg-primary'}`}>
                    <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
                        {passed ? <Trophy size={48} /> : <XCircle size={48} />}
                    </div>
                    <h2 className="text-4xl font-black mb-2">Ujian Selesai!</h2>
                    <p className="text-white/80 font-bold uppercase tracking-widest text-sm">Hasil Akhir Evaluasi</p>
                </div>

                <div className="p-12">
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="p-8 bg-gray-50 rounded-3xl text-center border border-gray-100">
                             <div className="text-5xl font-black text-gray-900 mb-2">{score}</div>
                             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Skor Akhir</div>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-3xl text-center border border-gray-100 col-span-2">
                             <div className={`text-2xl font-black uppercase tracking-tighter mb-2 ${passed ? 'text-green-600' : 'text-primary'}`}>
                                {passed ? 'Dinyatakan Lulus' : 'Belum Mencapai KKM'}
                             </div>
                             <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Kelulusan (KKM: 50)</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-12">
                        <div className="flex flex-col items-center">
                            <div className="text-xl font-black text-green-600">{correct}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase">Benar</div>
                        </div>
                        <div className="flex flex-col items-center border-x border-gray-100">
                            <div className="text-xl font-black text-primary">{wrong}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase">Salah</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-xl font-black text-gray-400">{unanswered}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase">Kosong</div>
                        </div>
                    </div>

                    <button 
                        onClick={() => window.location.href = '/app'}
                        className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black shadow-xl shadow-gray-100 hover:bg-black transition-all flex items-center justify-center gap-3"
                    >
                        <LayoutDashboard size={20} />
                        Kembali ke Dashboard Utama
                    </button>
                    
                    <p className="text-center mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
                        Token Keamanan: {Math.random().toString(36).toUpperCase().substr(2, 10)}
                    </p>
                </div>
            </motion.div>
        </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
             {/* Header */}
             <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-red-50 text-primary rounded-xl flex items-center justify-center font-bold">
                       {currentIndex + 1}
                   </div>
                   <div>
                       <h3 className="font-bold text-gray-900">Pertanyaan {currentIndex + 1}</h3>
                       <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${currentQuestion.difficulty === 'HARD' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                           {currentQuestion.difficulty === 'HARD' ? 'Tingkat Sulit' : 'Tingkat Mudah'}
                       </span>
                   </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-900 text-white rounded-xl shadow-lg">
                    <Timer size={18} className="text-primary" />
                    <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                </div>
             </div>

             {/* Question Text */}
             <div className="space-y-8">
                <p className="text-xl font-bold text-gray-800 leading-relaxed">
                    {currentQuestion.text}
                </p>

                <div className="grid gap-4">
                   {currentQuestion.options.map((option, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSelect(i)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all group flex items-center gap-4 ${
                            answers[currentIndex] === i 
                                ? 'bg-primary/5 border-primary shadow-inner' 
                                : 'bg-white border-gray-100 hover:border-red-200'
                        }`}
                      >
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border-2 transition-colors ${
                              answers[currentIndex] === i 
                                ? 'bg-primary border-primary text-white' 
                                : 'bg-gray-50 border-gray-100 text-gray-400 group-hover:border-red-200'
                         }`}>
                             {String.fromCharCode(65 + i)}
                         </div>
                         <span className={`font-bold transition-colors ${answers[currentIndex] === i ? 'text-primary' : 'text-gray-600'}`}>
                            {option}
                         </span>
                      </button>
                   ))}
                </div>
             </div>

             {/* Footer Nav */}
             <div className="mt-12 flex items-center justify-between border-t border-gray-50 pt-8">
                <button 
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(prev => prev - 1)}
                    className="flex items-center gap-2 px-6 py-3 text-gray-500 font-bold hover:text-primary transition-all disabled:opacity-30"
                >
                    <ChevronLeft size={20} />
                    Sebelumnya
                </button>
                
                {currentIndex === questions.length - 1 ? (
                    <button 
                        onClick={handleFinish}
                        className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center gap-2"
                    >
                        Selesaikan Ujian
                        <CheckCircle2 size={20} />
                    </button>
                ) : (
                    <button 
                        onClick={() => setCurrentIndex(prev => prev + 1)}
                        className="bg-primary text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-red-100 hover:bg-primary-dark transition-all flex items-center gap-2"
                    >
                        Berikutnya
                        <ChevronRight size={20} />
                    </button>
                )}
             </div>
          </div>
        </div>

        {/* Sidebar Nav */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-50 pb-4">Kontrol Ujian</h4>
                <button 
                    onClick={() => handleFinish()}
                    className="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center justify-center gap-2 mb-4"
                >
                    <CheckCircle2 size={18} />
                    Kumpulkan Ujian
                </button>
                <div className="grid grid-cols-5 gap-2">
                    {questions.map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-black border-2 transition-all ${
                                currentIndex === i 
                                    ? 'bg-primary border-primary text-white shadow-lg' 
                                    : answers[i] !== undefined
                                        ? 'bg-green-50 border-green-200 text-green-600'
                                        : 'bg-white border-gray-100 text-gray-400 hover:border-red-200'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                <div className="flex items-center gap-2 text-orange-600 mb-3">
                    <Brain size={20} />
                    <h5 className="font-black text-sm uppercase">Tips Ujian</h5>
                </div>
                <ul className="text-xs text-orange-700 font-bold space-y-2 leading-relaxed opacity-80">
                    <li>• Kerjakan soal yang mudah dahulu.</li>
                    <li>• Perhatikan sisa waktu di pojok kanan.</li>
                    <li>• Pastikan semua nomor berwarna hijau.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}
