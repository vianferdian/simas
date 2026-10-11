import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DocumentViewer } from '../../components/common/DocumentViewer';
import { Badge } from '../../components/common/Badge';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Play, 
  Upload, 
  Send, 
  FileText, 
  UserCheck, 
  Calendar, 
  AlertCircle,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';

export const DetailTugas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { suratMasukList, startGuruTask, completeGuruTask } = useApp();

  const surat = suratMasukList.find(s => s.id === id) || suratMasukList[1];

  const [laporanTeks, setLaporanTeks] = useState(surat?.disposisi?.laporan || '');
  const [fileBukti, setFileBukti] = useState(surat?.disposisi?.file_bukti || 'Bukti_Kegiatan_Laporan.pdf');
  const [isUploading, setIsUploading] = useState(false);

  if (!surat || !surat.disposisi) {
    return (
      <div className="p-8 text-center text-slate-500">
        Disposisi tugas tidak ditemukan.
      </div>
    );
  }

  const { status_tugas, instruksi, deadline, tanggal_acc } = surat.disposisi;

  const handleStartProcess = () => {
    startGuruTask(surat.id);
  };

  const handleComplete = (e) => {
    e.preventDefault();
    if (!laporanTeks.trim()) {
      alert('Silakan tuliskan laporan ringkas hasil pelaksanaan tugas terlebih dahulu.');
      return;
    }
    completeGuruTask(surat.id, laporanTeks, fileBukti);
  };

  const handleSimulateUpload = (e) => {
    if (e.target.files?.[0]) {
      setFileBukti(e.target.files[0].name);
      setIsUploading(false);
      alert(`File bukti "${e.target.files[0].name}" berhasil diunggah.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate('/guru/tugas')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Daftar Tugas Saya</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Detail Pelaksanaan Tugas Disposisi
            </h1>
            <Badge status={status_tugas} />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Nomor Naskah: <span className="font-bold text-slate-700">{surat.nomor_surat}</span>
          </p>
        </div>

        {/* Status Callout */}
        <div className="flex items-center gap-2">
          {status_tugas === 'Baru' && (
            <span className="rounded-xl bg-sky-100 px-3 py-1.5 text-xs font-bold text-sky-800">
              Tugas Belum Dimulai
            </span>
          )}
          {status_tugas === 'Sedang Diproses' && (
            <span className="rounded-xl bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-800 flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> Sedang Dikerjakan
            </span>
          )}
          {status_tugas === 'Selesai' && (
            <span className="rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Tugas Telah Tuntas
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: LEFT SIDE DOCUMENT PDF | RIGHT SIDE DISPOSITION WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDE: Document Viewer */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-primary-600" />
              <span>Dokumen Surat PDF Resmi (Ber-TTD Digital)</span>
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Disposisi Sah
            </span>
          </div>

          <DocumentViewer surat={surat} showSignature={true} />
        </div>

        {/* RIGHT SIDE: Action Workbench */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-5">
            
            {/* Header Box */}
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-800 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200">
                Instruksi Kedinasan
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">
                Lembar Kerja Tindak Lanjut
              </h2>
            </div>

            {/* Informasi Disposisi Box */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 p-4 border border-slate-200/80 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Diberikan oleh:</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Kepala Sekolah</span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Tanggal ACC & TTD:</span>
                <span className="font-mono text-slate-700">{tanggal_acc || '2026-10-07 09:20:00'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Batas Waktu (Deadline):</span>
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {deadline || '20 Oktober 2026'}
                </span>
              </div>

              {/* Arahan / Instruksi Text */}
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">
                  Instruksi Resmi Kepala Sekolah:
                </span>
                <div className="rounded-xl bg-white p-3 border border-slate-200 text-slate-800 font-medium leading-relaxed italic shadow-2xs">
                  "{instruksi}"
                </div>
              </div>
            </div>

            {/* Button 1: MULAI PROSES */}
            {status_tugas === 'Baru' && (
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-center space-y-2">
                <p className="text-xs text-sky-900 font-medium">
                  Klik tombol di bawah ini untuk mengonfirmasi bahwa Anda telah membaca instruksi dan mulai memproses tugas.
                </p>
                <button
                  type="button"
                  onClick={handleStartProcess}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-3 text-xs font-bold text-white shadow-md hover:bg-sky-700 transition"
                >
                  <Play className="h-4 w-4" />
                  <span>Mulai Proses Tugas</span>
                </button>
              </div>
            )}

            {/* Form Laporan & Selesaikan Tugas */}
            <form onSubmit={handleComplete} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Laporan Hasil Pelaksanaan Tugas *
                </label>
                <textarea
                  rows="4"
                  required
                  value={laporanTeks}
                  onChange={(e) => setLaporanTeks(e.target.value)}
                  disabled={status_tugas === 'Selesai'}
                  placeholder="Tuliskan uraian hasil kegiatan, koordinasi yang telah dilakukan, atau rangkuman tindak lanjut..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-800 focus:bg-white focus:border-primary-500 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-500 transition"
                />
              </div>

              {/* Upload Bukti */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Upload Bukti Fisik / Dokumentasi Kegiatan
                </label>
                <div className="flex items-center gap-2">
                  <label className={`flex-1 flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer ${status_tugas === 'Selesai' ? 'pointer-events-none opacity-60' : ''}`}>
                    <Upload className="h-4 w-4 text-slate-500" />
                    <span>Pilih Berkas Bukti (PDF / JPG)</span>
                    <input 
                      type="file" 
                      onChange={handleSimulateUpload}
                      disabled={status_tugas === 'Selesai'}
                      className="hidden" 
                    />
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 truncate font-mono">
                  <span>File terlampir:</span>
                  <strong className="text-slate-700">{fileBukti}</strong>
                </p>
              </div>

              {/* Action Buttons: Selesaikan Tugas */}
              {status_tugas !== 'Selesai' ? (
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 text-xs font-extrabold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-700 hover:to-emerald-600 transition"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Selesaikan Tugas & Kirim Laporan</span>
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600 mb-1" />
                  <p className="text-xs font-bold text-emerald-900">Tugas Telah Tuntas & Terverifikasi</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Laporan tersimpan di arsip digital sekolah pada tanggal: {surat.disposisi.tanggal_selesai || '2026-10-09'}.
                  </p>
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};
