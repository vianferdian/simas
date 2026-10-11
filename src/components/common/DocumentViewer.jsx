import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Printer, 
  ShieldCheck, 
  Maximize2,
  Calendar,
  Building,
  UserCheck
} from 'lucide-react';

export const DocumentViewer = ({ surat, showSignature = true }) => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 15, 140));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 15, 75));
  const handleReset = () => setZoom(100);

  const handlePrint = () => {
    window.print();
  };

  if (!surat) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-400">
        <FileText className="mb-3 h-12 w-12 text-slate-300" />
        <p className="font-medium text-slate-600">Pilih dokumen untuk melihat pratinjau</p>
        <p className="text-xs text-slate-400">Pratinjau naskah dinas resmi dalam format digital</p>
      </div>
    );
  }

  const isApproved = surat.disposisi?.qr_code || surat.qr_code || surat.status === 'Disetujui & Diterbitkan' || surat.status === 'Didisposisikan' || surat.status === 'Selesai';
  const qrData = surat.disposisi?.qr_code || surat.qr_code || `https://domainsekolah.com/verifikasi/${surat.kode || surat.id}`;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-slate-900 shadow-xl overflow-hidden">
      {/* Viewer Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-300 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-medium text-white">
            <FileText className="h-4 w-4 text-primary-400" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{surat.file || `${surat.nomor_surat}.pdf`}</span>
          </div>
          <span className="hidden sm:inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
            PDF • 1 Halaman
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom controls */}
          <div className="flex items-center rounded-lg bg-slate-800 p-0.5">
            <button 
              type="button" 
              onClick={handleZoomOut} 
              title="Perkecil" 
              className="rounded p-1 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono text-slate-300 min-w-[42px] text-center">
              {zoom}%
            </span>
            <button 
              type="button" 
              onClick={handleZoomIn} 
              title="Perbesar" 
              className="rounded p-1 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button 
              type="button" 
              onClick={handleReset} 
              title="Reset Zoom" 
              className="rounded p-1 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <button 
            type="button" 
            onClick={handlePrint}
            title="Cetak Dokumen"
            className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Cetak</span>
          </button>
        </div>
      </div>

      {/* Document Body Area */}
      <div className="relative flex-1 overflow-auto bg-slate-900/90 p-4 sm:p-8 flex justify-center min-h-[580px] max-h-[750px]">
        {/* Paper Sheet Simulator */}
        <div 
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-[650px] transition-transform duration-150 origin-top bg-white text-slate-900 rounded shadow-2xl p-8 sm:p-12 font-serif text-[13px] leading-relaxed relative flex flex-col justify-between"
        >
          {/* Watermark for Approved Status */}
          {isApproved && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] rotate-[-25deg]">
              <span className="text-8xl font-black uppercase text-emerald-900 border-8 border-dashed border-emerald-900 p-8 rounded-3xl">
                TERVERIFIKASI
              </span>
            </div>
          )}

          <div>
            {/* Kop Surat Resmi */}
            <div className="border-b-4 border-double border-slate-900 pb-4 text-center font-sans">
              <div className="flex items-center justify-center gap-4 mb-2">
                {/* Logo Sekolah */}
                <div className="h-14 w-14 rounded-full bg-primary-900 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-400">
                  <span>SMK</span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                    PEMERINTAH DAERAH PROVINSI JAWA BARAT
                  </h4>
                  <h3 className="text-sm font-bold tracking-wide uppercase text-slate-900">
                    DINAS PENDIDIKAN - CABANG DINAS WILAYAH VII
                  </h3>
                  <h2 className="text-base font-extrabold text-primary-950 uppercase tracking-tight">
                    SMK NEGERI 1 UNGGUL NUSANTARA
                  </h2>
                  <p className="text-[10px] text-slate-500 font-normal">
                    Jalan Pendidikan No. 45 Bandung 40132 • Telp: (022) 2501234 • Email: info@smkn1unggul.sch.id
                  </p>
                </div>
              </div>
            </div>

            {/* Nomor & Meta Surat */}
            <div className="mt-5 mb-4 text-xs font-sans">
              <div className="flex justify-between items-start">
                <table className="text-left w-2/3">
                  <tbody>
                    <tr>
                      <td className="w-20 font-medium text-slate-600 py-0.5">Nomor</td>
                      <td className="w-4">:</td>
                      <td className="font-semibold text-slate-900 py-0.5">{surat.nomor_surat}</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-slate-600 py-0.5">Sifat</td>
                      <td>:</td>
                      <td className="py-0.5 text-slate-800">{surat.urgensi || 'Penting'}</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-slate-600 py-0.5">Lampiran</td>
                      <td>:</td>
                      <td className="py-0.5 text-slate-800">1 (Satu) Berkas Lengkap</td>
                    </tr>
                    <tr>
                      <td className="font-medium text-slate-600 py-0.5">Hal</td>
                      <td>:</td>
                      <td className="font-bold text-slate-900 py-0.5 underline">{surat.perihal}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-right text-slate-700">
                  <p>Bandung, {surat.tanggal || '10 Oktober 2026'}</p>
                </div>
              </div>
            </div>

            {/* Tujuan / Penerima */}
            <div className="my-5 font-sans text-xs">
              <p className="font-medium text-slate-600">Kepada Yth,</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {surat.tujuan || 'Kepala SMK Negeri 1 Unggul Nusantara'}
              </p>
              <p className="text-slate-600">
                {surat.pengirim ? `Dari Pengirim: ${surat.pengirim}` : 'Di Tempat'}
              </p>
            </div>

            {/* Isi Surat */}
            <div className="my-6 space-y-3 text-[13px] leading-relaxed text-slate-800 text-justify">
              <p className="indent-8">
                Dengan hormat, sehubungan dengan pelaksanaan agenda koordinasi peningkatan mutu kelembagaan dan kurikulum berbasis industri tahun ajaran 2026/2027, bersama surat ini kami sampaikan pokok naskah dinas sebagai berikut:
              </p>
              
              <div className="my-3 rounded-lg bg-slate-50 border border-slate-200/80 p-3.5 font-sans text-xs leading-normal">
                <span className="font-bold text-slate-800 block mb-1">Ringkasan Materi Naskah:</span>
                <p className="text-slate-700">{surat.ringkasan || 'Naskah dinas resmi terkait penugasan dan koordinasi kegiatan sekolah.'}</p>
              </div>

              <p className="indent-8">
                Demikian surat pemberitahuan/penugasan ini disampaikan untuk dapat dipedomani dan ditindaklanjuti dengan penuh tanggung jawab sesuai ketentuan kedinasan yang berlaku. Atas perhatian dan kerjasama Saudara, kami ucapkan terima kasih.
              </p>
            </div>
          </div>

          {/* Bagian Tanda Tangan & QR Code Digital */}
          <div className="mt-8 pt-4 border-t border-slate-200 font-sans">
            <div className="flex justify-between items-end">
              {/* Sisi Kiri: Cap Sistem Informasi */}
              <div className="text-[10px] text-slate-400 space-y-0.5 max-w-[200px]">
                <div className="flex items-center gap-1 text-slate-600 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>SIMAS DIGITAL SECURE</span>
                </div>
                <p>Naskah ini terdaftar resmi dalam arsip digital sekolah dengan Kode:</p>
                <p className="font-mono font-semibold text-slate-700">{surat.kode || surat.id}</p>
              </div>

              {/* Sisi Kanan: Tanda Tangan Elektronik */}
              <div className="text-center w-56">
                <p className="text-xs text-slate-700 mb-1">
                  Kepala SMK Negeri 1 Unggul
                </p>

                {showSignature && isApproved ? (
                  <div className="my-2 p-2 border-2 border-emerald-500/40 bg-emerald-50/50 rounded-xl flex flex-col items-center">
                    <div className="bg-white p-1.5 rounded-lg shadow-xs border border-emerald-200 mb-1">
                      <QRCodeSVG 
                        value={qrData} 
                        size={76} 
                        level="M" 
                        includeMargin={false}
                      />
                    </div>
                    <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-0.5">
                      <ShieldCheck className="h-3 w-3" /> TTD DIGITAL SAH
                    </span>
                    <span className="text-[8px] text-slate-500 font-mono">
                      {surat.disposisi?.tanggal_acc || surat.tanggal_acc || '2026-10-10 10:00:00'}
                    </span>
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center text-xs italic text-slate-400 border border-dashed border-slate-200 rounded my-2">
                    [ Menunggu TTD Digital ]
                  </div>
                )}

                <p className="text-xs font-bold text-slate-900 underline mt-1">
                  Drs. H. Ahmad Fauzi, M.Pd
                </p>
                <p className="text-[10px] text-slate-500">
                  NIP. 19710815 199703 1 004
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
