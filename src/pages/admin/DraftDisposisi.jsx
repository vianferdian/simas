import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DocumentViewer } from '../../components/common/DocumentViewer';
import { Badge } from '../../components/common/Badge';
import { 
  FileSpreadsheet, 
  UserCheck, 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  User,
  Info
} from 'lucide-react';

export const DraftDisposisi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { suratMasukList, guruList, saveDraftDisposisi } = useApp();

  // Find surat or default to first
  const surat = suratMasukList.find(s => s.id === id) || suratMasukList[0];

  const [selectedGuruId, setSelectedGuruId] = useState('');
  const [instruksiAwal, setInstruksiAwal] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (surat) {
      if (surat.disposisiDraft) {
        setSelectedGuruId(surat.disposisiDraft.guru_id || guruList[0]?.id || '');
        setInstruksiAwal(surat.disposisiDraft.instruksi_tu || '');
      } else if (surat.disposisi) {
        setSelectedGuruId(surat.disposisi.guru_id || guruList[0]?.id || '');
        setInstruksiAwal(surat.disposisi.instruksi || '');
      } else {
        setSelectedGuruId(guruList[0]?.id || '');
        setInstruksiAwal('Mewakili sekolah dan berkoordinasi dengan pihak terkait untuk kelancaran kegiatan.');
      }
    }
  }, [surat, guruList]);

  if (!surat) {
    return (
      <div className="p-8 text-center text-slate-500">
        Surat tidak ditemukan. Silakan kembali ke daftar surat masuk.
      </div>
    );
  }

  const selectedGuru = guruList.find(g => g.id === selectedGuruId) || guruList[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    saveDraftDisposisi(surat.id, selectedGuruId, instruksiAwal);
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/admin/surat-masuk');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate('/admin/surat-masuk')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Surat Masuk</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Draft Pengajuan Disposisi
            </h1>
            <Badge status={surat.status} />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Admin Tata Usaha mengusulkan calon guru penerima tugas untuk ditinjau oleh Kepala Sekolah.
          </p>
        </div>

        {/* Quick select other letters if needed */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500 hidden sm:inline">Pilih Surat Lain:</label>
          <select
            value={surat.id}
            onChange={(e) => navigate(`/admin/draft-disposisi/${e.target.value}`)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs focus:outline-hidden"
          >
            {suratMasukList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nomor_surat} - {s.pengirim.substring(0, 20)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Split View: Left Card Document Preview, Right Card Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CARD KIRI: Preview Dokumen PDF */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-primary-600" />
              <span>Pratinjau Dokumen PDF Asli</span>
            </span>
            <span className="text-[11px] text-slate-400">Naskah Terverifikasi Sistem</span>
          </div>

          <DocumentViewer surat={surat} showSignature={false} />
        </div>

        {/* CARD KANAN: Form Pengusulan Guru Penerima Tugas */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary-100 p-2 text-primary-800">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Form Usulan Disposisi</h2>
                  <p className="text-xs text-slate-500">Usulkan penugasan kepada Kepala Sekolah</p>
                </div>
              </div>
            </div>

            {/* Read-Only Mail Details */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2.5 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Nomor Surat:</span>
                <span className="font-bold text-slate-900">{surat.nomor_surat}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Pengirim:</span>
                <span className="font-semibold text-slate-800">{surat.pengirim}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Perihal:</span>
                <span className="font-medium text-slate-700">{surat.perihal}</span>
              </div>
            </div>

            {/* Form Usulan */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pilih Guru Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Pilih Guru Yang Diusulkan *
                </label>
                <select
                  required
                  value={selectedGuruId}
                  onChange={(e) => setSelectedGuruId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden transition"
                >
                  {guruList.map((guru) => (
                    <option key={guru.id} value={guru.id}>
                      {guru.nama} — {guru.jabatan} (NIP. {guru.nip})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview Card Guru Terpilih */}
              {selectedGuru && (
                <div className="rounded-2xl border border-primary-100 bg-primary-50/50 p-3.5 flex items-center gap-3">
                  <img
                    src={selectedGuru.avatar}
                    alt={selectedGuru.nama}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-primary-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{selectedGuru.nama}</p>
                    <p className="text-[11px] text-primary-800 font-medium">{selectedGuru.jabatan}</p>
                    <p className="text-[10px] text-slate-500 font-mono">NIP. {selectedGuru.nip}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Tersedia
                    </span>
                  </div>
                </div>
              )}

              {/* Instruksi Awal Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Instruksi Awal / Catatan Usulan Tata Usaha *
                </label>
                <textarea
                  required
                  rows="4"
                  value={instruksiAwal}
                  onChange={(e) => setInstruksiAwal(e.target.value)}
                  placeholder="Tuliskan usulan detail penugasan guru..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-hidden transition"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Kepala Sekolah berwenang menyetujui atau mengganti guru yang diusulkan pada tahapan review.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-900 py-3 text-xs font-bold text-white shadow-lg shadow-primary-900/20 hover:bg-primary-800 transition disabled:opacity-60"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Tersimpan! Mengalihkan...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Simpan Draft Disposisi</span>
                  </>
                )}
              </button>

              <div className="rounded-xl bg-amber-50 p-3 border border-amber-100 flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Setelah disimpan, status surat akan otomatis berubah menjadi:
                  <strong className="block font-bold">"Menunggu Review Kepala Sekolah"</strong>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
