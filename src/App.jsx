import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { SuratMasuk } from './pages/admin/SuratMasuk';
import { DraftDisposisi } from './pages/admin/DraftDisposisi';
import { SuratKeluar } from './pages/admin/SuratKeluar';
import { DataGuru } from './pages/admin/DataGuru';
import { KepsekDashboard } from './pages/kepsek/KepsekDashboard';
import { ReviewSurat } from './pages/kepsek/ReviewSurat';
import { ReviewSuratKeluar } from './pages/kepsek/ReviewSuratKeluar';
import { GuruDashboard } from './pages/guru/GuruDashboard';
import { TugasSaya } from './pages/guru/TugasSaya';
import { DetailTugas } from './pages/guru/DetailTugas';
import { ArsipDigital } from './pages/ArsipDigital';
import { VerifyQR } from './pages/VerifyQR';

// Root redirect component
const RootRedirect = () => {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (currentUser.role === 'kepsek') return <Navigate to="/kepsek/dashboard" replace />;
  return <Navigate to="/guru/dashboard" replace />;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication */}
          <Route path="/login" element={<Login />} />
          
          {/* Public Verification Route */}
          <Route path="/verify/:kode" element={<VerifyQR />} />

          {/* Authenticated Application Shell */}
          <Route path="/" element={<Layout />}>
            <Route index element={<RootRedirect />} />

            {/* Admin TU Routes */}
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/surat-masuk" element={<SuratMasuk />} />
            <Route path="admin/draft-disposisi/:id" element={<DraftDisposisi />} />
            <Route path="admin/draft-disposisi" element={<DraftDisposisi />} />
            <Route path="admin/surat-keluar" element={<SuratKeluar />} />
            <Route path="admin/guru" element={<DataGuru />} />

            {/* Kepala Sekolah Routes */}
            <Route path="kepsek/dashboard" element={<KepsekDashboard />} />
            <Route path="kepsek/review-surat/:id" element={<ReviewSurat />} />
            <Route path="kepsek/review-surat" element={<ReviewSurat />} />
            <Route path="kepsek/review-surat-keluar/:id" element={<ReviewSuratKeluar />} />
            <Route path="kepsek/review-surat-keluar" element={<ReviewSuratKeluar />} />

            {/* Guru Routes */}
            <Route path="guru/dashboard" element={<GuruDashboard />} />
            <Route path="guru/tugas" element={<TugasSaya />} />
            <Route path="guru/tugas/:id" element={<DetailTugas />} />

            {/* Shared Digital Archive */}
            <Route path="arsip" element={<ArsipDigital />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
