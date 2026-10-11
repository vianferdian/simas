import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DocumentViewer } from '../../components/common/DocumentViewer';
import { Badge } from '../../components/common/Badge';
import { 
  ArrowLeft, 
  ShieldCheck, 
  XCircle, 
  Send, 
  FileText, 
  CheckCircle2, 
  RotateCcw,
  Calendar,
  Building
} from 'lucide-react';

export const ReviewSuratKeluar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { suratKeluarList, approveSuratKeluar, rejectSuratKeluar } = useApp();

  const surat = suratKeluarList.find(s => s.id === id) || suratKeluarList[0];
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [alasanRevisi, setAlasanRevisi] = useState('');

  if (!surat) {
    return (
      <div className="p-8 text-center text-slate-500">
        Surat keluar tidak ditemukan.
      </div>
    );
  }

  const handleApprove = () => {
    approveSuratKeluar(surat.id);
  };

  const handleConfirmReject = () => {
    rejectSuratKeluar(surat.id, alasanRevisi || 'Revisi redaksi surat.');
    setRejectModalOpen(false);
    navigate('/kepsek/dashboard');
  };

  const isApproved = surat.status === 'Disetujui & Diterbitkan';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate('/kepsek/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Dashboard</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Review & Tanda Tangan Surat Keluar
            </h1>
            <Badge status={surat.status} />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pemeriksaan redaksi naskah dinas keluar dan pengesahan tanda tangan elektronik resmi Kepala Sekolah.
          </p>
        </div>

        {/* Letter picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500">Pilih Naskah:</label>
          <select
            value={surat.id}
            onChange={(e) => navigate(`/kepsek/review-surat-keluar/${e.target.value}`)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs focus:outline-hidden"
          >
            {suratKeluarList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nomor_surat} - {s.status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Document Preview */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-primary-600" />
              <span>Pratinjau Naskah Keluar Resmi</span>
            </span>
            <span className="text-[11px] text-slate-400">
              {isApproved ? 'Telah Ditandatangani Digital' : 'Draft Siap TTD'}
            </span>
          </div>

          <DocumentViewer surat={surat} showSignature={true} />
        </div>

        {/* Actions & Verification Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200">
                Pemeriksaan Redaksi
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-2">
                Persetujuan Naskah Keluar
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Nomor Agenda:</span>
                <span className="font-bold text-slate-900">{surat.nomor_surat}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Tujuan:</span>
                <span className="font-semibold text-slate-800">{surat.tujuan}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Perihal:</span>
                <span className="font-medium text-slate-800">{surat.perihal}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Tanggal:</span>
                <span className="font-medium text-slate-700">{surat.tanggal}</span>
              </div>
            </div>

            {/* Buttons: ACC & TTD or Return/Revisi */}
            {!isApproved ? (
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={handleApprove}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3.5 px-4 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-700 hover:to-emerald-600 transition"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>ACC & TTD DIGITAL RESMI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRejectModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 py-2.5 px-4 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                >
                  <XCircle className="h-4 w-4 text-rose-600" />
                  <span>Return / Revisi ke TU</span>
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center space-y-2">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-900">
                  Surat Telah Disetujui & Diterbitkan!
                </h3>
                <p className="text-[11px] text-emerald-700">
                  QR Code tanda tangan digital telah disematkan secara permanen pada dokumen.
                </p>
                <div className="pt-2">
                  <a
                    href={`/verify/${surat.kode || surat.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:underline"
                  >
                    <span>Cek Validitas QR Publik</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL REVISI */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <h3 className="text-base font-bold text-slate-900 mb-1">Catatan Revisi Surat Keluar</h3>
            <p className="text-xs text-slate-500 mb-4">Naskah akan dikembalikan ke status Revisi pada Admin TU</p>

            <textarea
              rows="3"
              value={alasanRevisi}
              onChange={(e) => setAlasanRevisi(e.target.value)}
              placeholder="Tuliskan koreksi redaksi atau format..."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-rose-500 focus:outline-hidden"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md"
              >
                Kembalikan Naskah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
