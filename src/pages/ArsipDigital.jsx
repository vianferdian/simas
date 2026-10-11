import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { DocumentViewer } from '../components/common/DocumentViewer';
import { 
  Archive, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Printer, 
  Eye, 
  Calendar, 
  Building, 
  ArrowUpDown,
  X,
  FileSpreadsheet
} from 'lucide-react';

export const ArsipDigital = () => {
  const { suratMasukList, suratKeluarList } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTahun, setFilterTahun] = useState('Semua');
  const [filterJenis, setFilterJenis] = useState('Semua'); // Semua, Masuk, Keluar
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedSurat, setSelectedSurat] = useState(null);

  // Combine both incoming and outgoing letters
  const combinedArsip = [
    ...suratMasukList.map(s => ({ ...s, jenis: 'Surat Masuk' })),
    ...suratKeluarList.map(s => ({ ...s, jenis: 'Surat Keluar', pengirim: 'SMK Negeri 1 Unggul' }))
  ];

  const filteredArsip = combinedArsip.filter(item => {
    // Search
    const matchSearch = 
      item.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.perihal && item.perihal.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.pengirim && item.pengirim.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.tujuan && item.tujuan.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter Tahun
    const tahunItem = item.tanggal ? item.tanggal.split('-')[0] : '2026';
    const matchTahun = filterTahun === 'Semua' || tahunItem === filterTahun;

    // Filter Jenis
    const matchJenis = filterJenis === 'Semua' || item.jenis === filterJenis;

    // Filter Status
    const matchStatus = filterStatus === 'Semua' || item.status === filterStatus;

    return matchSearch && matchTahun && matchJenis && matchStatus;
  });

  const handleExportCSV = () => {
    const headers = ["Nomor Surat", "Jenis", "Tanggal", "Pihak Terkait", "Perihal", "Status"];
    const rows = filteredArsip.map(s => [
      `"${s.nomor_surat}"`,
      `"${s.jenis}"`,
      `"${s.tanggal}"`,
      `"${s.jenis === 'Surat Masuk' ? s.pengirim : s.tujuan}"`,
      `"${s.perihal}"`,
      `"${s.status}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Arsip_Surat_Sekolah_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Arsip Digital Persuratan
            </h1>
            <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-bold text-primary-800">
              {filteredArsip.length} Arsip Tersimpan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pusat repositori seluruh arsip surat masuk dan surat keluar sekolah dengan sistem pencarian dan filter cerdas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
        >
          <Download className="h-4 w-4" />
          <span>Export Data (CSV)</span>
        </button>
      </div>

      {/* FILTER BAR AS REQUESTED: Tahun, Jenis Surat, Status, Pengirim */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nomor surat, pengirim, perihal, atau tujuan..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-primary-500 focus:outline-hidden"
          />
        </div>

        {/* 3 Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Filter Tahun */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Tahun
            </label>
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:outline-hidden"
            >
              <option value="Semua">Semua Tahun</option>
              <option value="2026">2026 (Tahun Ini)</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          {/* Filter Jenis Surat */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Jenis Surat
            </label>
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:outline-hidden"
            >
              <option value="Semua">Semua Jenis Surat</option>
              <option value="Surat Masuk">Surat Masuk</option>
              <option value="Surat Keluar">Surat Keluar</option>
            </select>
          </div>

          {/* Filter Status */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Status Naskah
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:outline-hidden"
            >
              <option value="Semua">Semua Status</option>
              <option value="Draft TU">Draft TU</option>
              <option value="Menunggu ACC Kepala Sekolah">Menunggu ACC Kepala Sekolah</option>
              <option value="Didisposisikan">Didisposisikan</option>
              <option value="Selesai">Selesai</option>
              <option value="Draft Menunggu TTD">Draft Menunggu TTD</option>
              <option value="Disetujui & Diterbitkan">Disetujui & Diterbitkan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Arsip Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-4">Nomor & Kode</th>
                <th className="px-6 py-4">Jenis</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Pengirim / Tujuan</th>
                <th className="px-6 py-4">Perihal</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Pratinjau</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArsip.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                    <Archive className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                    <p className="font-medium">Tidak ada arsip naskah dinas yang cocok dengan filter.</p>
                  </td>
                </tr>
              ) : (
                filteredArsip.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{item.nomor_surat}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{item.kode || item.id}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${item.jenis === 'Surat Masuk' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {item.jenis}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-medium">
                      {item.tanggal}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800 max-w-[180px] truncate">
                      {item.jenis === 'Surat Masuk' ? item.pengirim : item.tujuan}
                    </td>

                    <td className="px-6 py-4 max-w-sm truncate text-slate-800 font-medium">
                      {item.perihal}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge status={item.status} />
                    </td>

                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedSurat(item)}
                        className="rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-primary-900 hover:text-white transition shadow-2xs"
                        title="Buka Dokumen Digital"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: PREVIEW ARSIP */}
      {selectedSurat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-primary-800 uppercase tracking-wider">
                  Pratinjau Arsip Digital
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedSurat.nomor_surat}</h3>
              </div>
              <button 
                onClick={() => setSelectedSurat(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <DocumentViewer surat={selectedSurat} showSignature={true} />
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedSurat(null)}
                className="rounded-xl border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
