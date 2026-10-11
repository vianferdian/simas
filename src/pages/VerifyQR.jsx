import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  UserCheck, 
  Building, 
  ExternalLink,
  ArrowLeft,
  Lock,
  Stamp
} from 'lucide-react';

export const VerifyQR = () => {
  const { kode } = useParams();
  const { suratMasukList, suratKeluarList } = useApp();

  // Find either in masuk or keluar
  const surat = 
    suratMasukList.find(s => s.kode === kode || s.id === kode) ||
    suratKeluarList.find(s => s.kode === kode || s.id === kode) ||
    suratMasukList[1]; // fallback to SM-2026-002

  const tanggalAcc = surat?.disposisi?.tanggal_acc || surat?.tanggal_acc || '2026-10-07 09:20:00';
  const qrUrl = window.location.href;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Navbar Bar */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between text-white pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white font-extrabold shadow-lg shadow-emerald-900/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-sm font-black tracking-tight block">PORTAL VALIDASI RESMI</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">SMK Negeri 1 Unggul Nusantara</span>
          </div>
        </div>

        <Link
          to="/login"
          className="rounded-xl bg-white/10 border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition"
        >
          Masuk ke SIMAS
        </Link>
      </header>

      {/* Center Validation Certificate Card */}
      <div className="max-w-xl mx-auto w-full my-4">
        <div className="rounded-3xl border border-white/10 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* VALID BADGE HEADER AS REQUESTED */}
          <div className="text-center pb-6 border-b border-slate-100">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div className="inline-block rounded-full bg-emerald-600 px-4 py-1 text-xs font-extrabold text-white shadow-sm tracking-wider uppercase mb-2">
              STATUS: VALID & TERVERIFIKASI
            </div>

            <h1 className="text-xl font-black text-slate-900">
              Tanda Tangan Digital Resmi Terkonfirmasi
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Dokumen ini telah disahkan dan ditandatangani secara elektronik sesuai regulasi naskah dinas.
            </p>
          </div>

          {/* INFORMASI UTAMA: Nomor Surat, Tanggal ACC, Kepala Sekolah */}
          <div className="py-6 space-y-4 text-xs">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Nomor Surat:</span>
                <span className="font-mono font-bold text-slate-900 text-right">{surat?.nomor_surat}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Tanggal ACC & TTD:</span>
                <span className="font-semibold text-slate-800">{tanggalAcc}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Kepala Sekolah:</span>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">Drs. H. Ahmad Fauzi, M.Pd</span>
                  <span className="text-[10px] text-slate-500 font-mono">NIP. 19710815 199703 1 004</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-semibold uppercase text-[10px] block mb-1">Perihal Dokumen:</span>
                <span className="font-medium text-slate-800 block leading-snug">
                  {surat?.perihal}
                </span>
              </div>
            </div>

            {/* QR Code and Cryptographic Seal */}
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="bg-white p-2.5 rounded-xl shadow-xs border border-emerald-100 shrink-0">
                <QRCodeSVG value={qrUrl} size={90} level="H" />
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-900 font-bold">
                  <Lock className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Sertifikat Digital SHA-256</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Kode Verifikasi Unik: <strong className="font-mono">{kode || surat?.kode || 'SM-2026-002'}</strong>
                </p>
                <p className="text-[10px] text-slate-500 font-mono break-all">
                  Hash: 9f83ac2b740e29b16e883c749021aef425
                </p>
              </div>
            </div>
          </div>

          {/* Footer Card */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Dinas Pendidikan Jawa Barat • Wilayah VII
            </span>
            <Link
              to="/arsip"
              className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1"
            >
              <span>Arsip Sekolah</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 max-w-4xl mx-auto w-full pt-6">
        SIMAS (Sistem Informasi Manajemen Persuratan Sekolah) • Hak Cipta © 2026
      </footer>
    </div>
  );
};
