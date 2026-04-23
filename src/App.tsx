import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AppLayout from './components/AppLayout';
import AbsensiKaryawan from './pages/AbsensiKaryawan';
import AbsensiSiswa from './pages/AbsensiSiswa';
import UserManagement from './pages/UserManagement';
import ExamPage from './pages/ExamPage';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/app/*" element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/absensi-karyawan" element={<AbsensiKaryawan />} />
                <Route path="/absensi-siswa" element={<AbsensiSiswa />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/ujian-online" element={<ExamPage />} />
                <Route path="*" element={<Navigate to="/app" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
