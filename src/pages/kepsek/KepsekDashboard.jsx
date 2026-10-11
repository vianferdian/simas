import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { 
  BellRing, 
  FileCheck, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  User, 
  Calendar,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const KepsekDashboard = () => {
  const { suratMasukList, suratKeluarList } = useApp();

  const pendingMasuk = suratMasukList.filter(s => s.status === 'Menunggu ACC Kepala Sekolah');
  const pendingKeluar = suratKeluarList.filter(s => s.status === 'Draft Menunggu TTD');
  const totalTindakan = pendingMasuk.length + pendingKeluar.length;

  const didisposisikanCount = suratMasukList.filter(s => s.status === 'Didisposisikan' || s.status === 'Selesai').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary-950 to-emerald-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 mb-2 border border-emerald-500/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Portal Otoritas Kepala Sekolah</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Pusat Persetujuan & Tanda Tangan Digital
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Tinjau usulan disposisi penugasan guru, berikan instruksi kedinasan, dan bubuhkan tanda tangan elektronik tersertifikasi.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 border border-white/15 backdrop-blur-sm text-center min-w-[160px]">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">Total Tindakan</span>
            <div className="text-3xl font-black text-amber-300 mt-1">{totalTindakan}</div>
            <span className="text-[11px] text-slate-300">Naskah menunggu ACC</span>
          </div>
        </div>
      </div>

      {/* NOTIFICATION PANEL (Requested in requirements) */}
      <div className="rounded-2xl border-2 border-amber-300/60 bg-gradient-to-r from-amber-50 to-orange-50 p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md animate-pulse">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {totalTindakan} Surat Membutuhkan Tindakan Segera
              </h2>
              <p className="text-xs text-amber-800">
                {pendingMasuk.length} surat masuk membutuhkan ACC disposisi • {pendingKeluar.length} surat keluar membutuhkan TTD digital
              </p>
            </div>
          </div>

          {pendingMasuk[0] && (
            <Link
              to={`/kepsek/review-surat/${pendingMasuk[0].id}`}
              className="hidden sm:flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 transition"
            >
              <span>Mulai Review Sekarang</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Action Cards Grid: Surat Masuk Baru Menunggu ACC */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Daftar Surat Masuk Menunggu ACC Disposisi</h2>
            <p className="text-xs text-slate-500">Tinjau usulan guru penerima tugas dari Admin Tata Usaha</p>
          </div>
          <span className="rounded-full bg-slate-200/80 px-2.5 py-1 text-xs font-bold text-slate-700">
            {pendingMasuk.length} Menunggu
          </span>
        </div>

        {pendingMasuk.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-emerald-500" />
            <p className="font-bold text-slate-800">Semua surat masuk telah ditindaklanjuti!</p>
            <p className="text-xs text-slate-400 mt-0.5">Tidak ada antrean disposisi baru saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingMasuk.map((surat) => (
              <div 
                key={surat.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {surat.nomor_surat}
                    </span>
                    <Badge status={surat.status} />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                    {surat.perihal}
                  </h3>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tanggal:</span>
                      <span className="font-medium text-slate-700">{surat.tanggal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pengirim:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[200px]">{surat.pengirim}</span>
                    </div>
                    {surat.disposisiDraft && (
                      <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-slate-400">Diusulkan TU:</span>
                        <span className="font-bold text-primary-800">Guru Terpilih</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end">
                  <Link
                    to={`/kepsek/review-surat/${surat.id}`}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                  >
                    <span>Review & Disposisi</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Surat Keluar Menunggu TTD */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Daftar Surat Keluar Menunggu TTD Digital</h2>
            <p className="text-xs text-slate-500">Naskah dinas resmi siap untuk ditandatangani dan dibubuhi QR Code</p>
          </div>
          <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-bold text-purple-800">
            {pendingKeluar.length} Menunggu TTD
          </span>
        </div>

        {pendingKeluar.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-500">
            <p className="font-semibold text-slate-700">Tidak ada surat keluar yang menunggu penandatanganan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingKeluar.map((surat) => (
              <div 
                key={surat.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-700">{surat.nomor_surat}</span>
                    <Badge status={surat.status} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{surat.perihal}</h3>
                  <p className="text-xs text-slate-500 mt-1">Tujuan: {surat.tujuan}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                  <Link
                    to={`/kepsek/review-surat-keluar/${surat.id}`}
                    className="flex items-center gap-1.5 rounded-xl bg-primary-900 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-primary-800 transition"
                  >
                    <span>Tinjau & Tanda Tangan Digital</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
