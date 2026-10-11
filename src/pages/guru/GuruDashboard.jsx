import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Sparkles,
  Calendar,
  Building
} from 'lucide-react';

export const GuruDashboard = () => {
  const { currentUser, suratMasukList } = useApp();

  // Find all tasks assigned to teachers
  // If logged in as specific guru, we can filter or show all relevant
  const assignedTasks = suratMasukList.filter(s => s.disposisi);

  const tugasBaru = assignedTasks.filter(s => s.disposisi.status_tugas === 'Baru');
  const tugasDiproses = assignedTasks.filter(s => s.disposisi.status_tugas === 'Sedang Diproses');
  const tugasSelesai = assignedTasks.filter(s => s.disposisi.status_tugas === 'Selesai');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-primary-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-300 mb-2 border border-primary-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Portal Penugasan Dewan Guru</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Dashboard Pelaksanaan Tugas & Disposisi
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Selamat datang, <strong className="text-white">{currentUser?.nama || 'Bapak/Ibu Guru'}</strong>. Pantau surat instruksi kepala sekolah, kelola progres, dan serahkan laporan hasil pelaksanaan tugas.
            </p>
          </div>

          <Link
            to="/guru/tugas"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-400 transition"
          >
            <CheckSquare className="h-4 w-4" />
            <span>Lihat Semua Tugas</span>
          </Link>
        </div>
      </div>

      {/* 3 CARDS AS REQUESTED: Tugas Baru, Tugas Diproses, Tugas Selesai */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Tugas Baru */}
        <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-white to-sky-50/40 p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">Tugas Baru</span>
            <div className="rounded-xl bg-sky-100 p-2.5 text-sky-700">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{tugasBaru.length}</span>
            <span className="text-xs font-medium text-sky-700">Belum diproses</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Disposisi baru yang siap dikerjakan</p>
        </div>

        {/* Card 2: Tugas Diproses */}
        <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-white to-indigo-50/40 p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">Tugas Diproses</span>
            <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{tugasDiproses.length}</span>
            <span className="text-xs font-medium text-indigo-700">Dalam pengerjaan</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Sedang berjalan sesuai batas deadline</p>
        </div>

        {/* Card 3: Tugas Selesai */}
        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-white to-emerald-50/40 p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Tugas Selesai</span>
            <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{tugasSelesai.length}</span>
            <span className="text-xs font-medium text-emerald-700">Tuntas terlapor</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Laporan & bukti fisik telah diarsipkan</p>
        </div>
      </div>

      {/* Task List Preview */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Daftar Disposisi Penugasan Terkini</h2>
            <p className="text-xs text-slate-500">Klik tugas untuk membuka naskah dinas dan melaporkan hasil kerja</p>
          </div>
          <Link
            to="/guru/tugas"
            className="flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800"
          >
            Buka Tabel Lengkap <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {assignedTasks.map((surat) => (
            <div key={surat.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                    {surat.nomor_surat}
                  </span>
                  <Badge status={surat.disposisi.status_tugas} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {surat.perihal}
                </h3>
                <p className="text-xs text-slate-500">
                  Dari: <strong>{surat.pengirim}</strong> • Batas Waktu: <strong className="text-amber-700">{surat.disposisi.deadline || '20 Oktober 2026'}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/guru/tugas/${surat.id}`}
                  className="rounded-xl bg-primary-900 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-800 transition flex items-center gap-1"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Buka Lembar Kerja</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
