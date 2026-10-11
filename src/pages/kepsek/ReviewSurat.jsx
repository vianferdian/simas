import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DocumentViewer } from '../../components/common/DocumentViewer';
import { Badge } from '../../components/common/Badge';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  QrCode, 
  UserCheck, 
  Edit3, 
  Send, 
  Building, 
  Calendar, 
  FileText, 
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ReviewSurat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    suratMasukList, 
    guruList, 
    approveDisposisiKepsek, 
    rejectDisposisiKepsek, 
    currentUser 
  } = useApp();

  const surat = suratMasukList.find(s => s.id === id) || suratMasukList[0];

  // Default proposed teacher from TU draft or first guru
  const proposedGuruId = surat?.disposisiDraft?.guru_id || surat?.disposisi?.guru_id || 'g-1';
  const initialGuru = guruList.find(g => g.id === proposedGuruId) || guruList[0];

  const [selectedGuruId, setSelectedGuruId] = useState(proposedGuruId);
  const [instruksiKepsek, setInstruksiKepsek] = useState('');
  const [isOverridingGuru, setIsOverridingGuru] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [alasanRevisi, setAlasanRevisi] = useState('');
  const [isSuccessApproved, setIsSuccessApproved] = useState(false);

  useEffect(() => {
    if (surat) {
      const gId = surat.disposisiDraft?.guru_id || surat.disposisi?.guru_id || 'g-1';
      setSelectedGuruId(gId);
      setInstruksiKepsek(
        surat.disposisi?.instruksi || 
        surat.disposisiDraft?.instruksi_tu || 
        'Segera pelajari berkas naskah dinas ini dan susun rencana tindak lanjut kegiatan.'
      );
    }
  }, [surat]);

  if (!surat) {
    return (
      <div className="p-8 text-center text-slate-500">
        Surat tidak ditemukan.
      </div>
    );
  }

  const activeGuru = guruList.find(g => g.id === selectedGuruId) || initialGuru;
  const isGuruChanged = selectedGuruId !== proposedGuruId;

  // Handle ACC & TTD
  const handleApprove = () => {
    approveDisposisiKepsek(surat.id, selectedGuruId, instruksiKepsek);
    setIsSuccessApproved(true);
  };

  // Handle Reject / Revisi
  const handleConfirmReject = () => {
    rejectDisposisiKepsek(surat.id, alasanRevisi || 'Perlu perbaikan draft disposisi oleh Admin TU.');
    setRejectModalOpen(false);
    navigate('/kepsek/dashboard');
  };

  const isAlreadyDisposed = surat.status === 'Didisposisikan' || surat.status === 'Selesai';

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate('/kepsek/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Dashboard Kepsek</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Pre-ACC Disposition Review
            </h1>
            <Badge status={surat.status} />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tinjau berkas naskah dinas asli, evaluasi usulan guru penerima tugas, dan terbitkan disposisi ber-TTD digital resmi.
          </p>
        </div>

        {/* Quick Letter Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500 hidden sm:inline">Pilih Berkas:</label>
          <select
            value={surat.id}
            onChange={(e) => navigate(`/kepsek/review-surat/${e.target.value}`)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs focus:outline-hidden"
          >
            {suratMasukList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nomor_surat} ({s.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: LEFT SIDE DOCUMENT VIEWER | RIGHT SIDE REVIEW PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDE: Document Viewer */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-primary-600" />
              <span>Document Viewer (File Asli PDF)</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Format Standar Naskah Dinas Sekolah
            </span>
          </div>

          <DocumentViewer surat={surat} showSignature={isAlreadyDisposed || isSuccessApproved} />
        </div>

        {/* RIGHT SIDE: Review Information & Disposition Form */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-5">
            
            {/* Header info */}
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Pemeriksaan Disposisi Kepala Sekolah
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">
                Informasi & Keputusan Disposisi
              </h2>
            </div>

            {/* Informasi Surat Box */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Nomor Surat:</span>
                <span className="font-bold text-slate-900 text-right">{surat.nomor_surat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Tanggal:</span>
                <span className="font-medium text-slate-800">{surat.tanggal}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Pengirim:</span>
                <span className="font-semibold text-slate-800 text-right">{surat.pengirim}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-0.5">Perihal:</span>
                <span className="font-semibold text-slate-900 leading-snug block">{surat.perihal}</span>
              </div>
            </div>

            {/* BAGIAN PENTING: DRAFT PENUGASAN TU */}
            <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50/70 to-blue-50/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-primary-700" />
                  <span className="text-xs font-bold text-primary-950 uppercase tracking-wide">
                    Draft Penugasan TU
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-primary-700 bg-primary-100/80 px-2 py-0.5 rounded-full">
                  Diusulkan Kepada
                </span>
              </div>

              {/* Guru Avatar & Details */}
              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-xl border border-primary-100 shadow-2xs">
                <img
                  src={activeGuru.avatar}
                  alt={activeGuru.nama}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-500/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{activeGuru.nama}</p>
                  <p className="text-[11px] text-primary-800 font-semibold mt-0.5">{activeGuru.jabatan}</p>
                  <p className="text-[10px] text-slate-500 font-mono">NIP. {activeGuru.nip}</p>
                  <p className="text-[10px] text-slate-400">No. WA: {activeGuru.noHp}</p>
                </div>
              </div>

              {isGuruChanged && (
                <div className="text-[11px] text-amber-800 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>Kepala Sekolah memilih guru baru (override usulan TU).</span>
                </div>
              )}
            </div>

            {/* FITUR: UBAH PENUGASAN (Dropdown Pilih Guru Baru) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Ubah Penugasan (Pilih Guru Baru)</span>
                </label>
                <span className="text-[10px] text-slate-400">Otoritas Kepsek</span>
              </div>

              <select
                value={selectedGuruId}
                onChange={(e) => {
                  setSelectedGuruId(e.target.value);
                  setIsOverridingGuru(true);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-primary-500 focus:outline-hidden transition"
              >
                {guruList.map((guru) => (
                  <option key={guru.id} value={guru.id}>
                    {guru.nama} — {guru.jabatan} (NIP. {guru.nip})
                  </option>
                ))}
              </select>
            </div>

            {/* Instruksi Khusus Kepala Sekolah */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Instruksi Disposisi Kepala Sekolah
              </label>
              <textarea
                rows="3"
                value={instruksiKepsek}
                onChange={(e) => setInstruksiKepsek(e.target.value)}
                placeholder="Tuliskan arahan resmi untuk guru pelaksana..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-800 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition"
              />
            </div>

            {/* BUTTON BESAR: HIJAU (ACC & TTD) & MERAH (Tolak/Revisi) */}
            <div className="pt-2 space-y-2.5">
              {/* BUTTON BESAR HIJAU: ACC & TTD */}
              <button
                type="button"
                onClick={handleApprove}
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3.5 px-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-700 hover:to-emerald-600 focus:outline-hidden transition group"
              >
                <ShieldCheck className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>ACC & TTD DIGITAL RESMI</span>
              </button>

              {/* BUTTON MERAH: Tolak / Revisi */}
              <button
                type="button"
                onClick={() => setRejectModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50/80 py-2.5 px-4 text-xs font-bold text-rose-700 hover:bg-rose-100 hover:border-rose-300 transition"
              >
                <XCircle className="h-4 w-4 text-rose-600" />
                <span>Tolak / Kembalikan Revisi ke TU</span>
              </button>
            </div>

            {/* Keterangan Otomatisasi Sistem */}
            <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <QrCode className="h-3.5 w-3.5 text-primary-700" />
                <span>Validasi Otomatis Setelah Klik ACC:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-500 text-[10px]">
                <li>Generate QR Code validasi digital tersertifikasi</li>
                <li>Mencatat identitas & waktu persetujuan Kepala Sekolah</li>
                <li>Update status naskah menjadi: "Didisposisikan kepada Guru"</li>
                <li>Simulasi pengiriman notifikasi WhatsApp ke nomor guru</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL: ALASAN REVISI / TOLAK */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="rounded-xl bg-rose-100 p-2 text-rose-700">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Kembalikan ke Admin TU</h3>
                <p className="text-xs text-slate-500">Berikan catatan revisi penugasan atau berkas</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-xs font-semibold text-slate-700">Catatan Revisi / Alasan:</label>
              <textarea
                rows="3"
                value={alasanRevisi}
                onChange={(e) => setAlasanRevisi(e.target.value)}
                placeholder="Contoh: Lampiran kurang lengkap atau usulan guru perlu disesuaikan dengan beban mengajar..."
                className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-rose-500 focus:outline-hidden"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-rose-700"
              >
                Kirim Revisi ke TU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
