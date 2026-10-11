import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { DocumentViewer } from '../../components/common/DocumentViewer';
import { 
  Send, 
  Plus, 
  Search, 
  FileText, 
  Eye, 
  Calendar, 
  Building2, 
  X, 
  CheckCircle2, 
  ShieldCheck,
  Download
} from 'lucide-react';

export const SuratKeluar = () => {
  const { suratKeluarList, addSuratKeluar } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(suratKeluarList[0] || null);

  const [formData, setFormData] = useState({
    nomor_surat: `421.5/${Math.floor(Math.random() * 900 + 100)}/SMKN1-TU/X/2026`,
    tanggal: new Date().toISOString().split('T')[0],
    tujuan: '',
    perihal: '',
    ringkasan: '',
    file: 'Draft_Surat_Keluar_Resmi.pdf'
  });

  const handleOpenAdd = () => {
    setFormData({
      nomor_surat: `421.5/${Math.floor(Math.random() * 900 + 100)}/SMKN1-TU/X/2026`,
      tanggal: new Date().toISOString().split('T')[0],
      tujuan: '',
      perihal: '',
      ringkasan: '',
      file: 'Draft_Surat_Keluar_Resmi.pdf'
    });
    setIsAddModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const created = addSuratKeluar(formData);
    setSelectedSurat(created);
    setIsAddModalOpen(false);
  };

  const filteredList = suratKeluarList.filter(s => 
    s.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.perihal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Manajemen Surat Keluar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Penyusunan naskah dinas keluar, pengajuan TTD digital Kepala Sekolah, dan penerbitan nomor agenda.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-900 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-primary-900/20 hover:bg-primary-800 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Buat Draft Surat Keluar</span>
        </button>
      </div>

      {/* Main Grid: Left Table, Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table of Outgoing Mail */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari surat keluar..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filteredList.map((surat) => (
                <div 
                  key={surat.id}
                  onClick={() => setSelectedSurat(surat)}
                  className={`p-4 transition cursor-pointer flex flex-col gap-2 ${selectedSurat?.id === surat.id ? 'bg-primary-50/70 border-l-4 border-primary-600' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-xs text-slate-900">{surat.nomor_surat}</span>
                      <p className="text-[11px] text-slate-500 font-medium">Tujuan: {surat.tujuan}</p>
                    </div>
                    <Badge status={surat.status} />
                  </div>

                  <p className="text-xs text-slate-800 font-semibold line-clamp-1">{surat.perihal}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Tanggal: {surat.tanggal}</span>
                    <span className="text-primary-700 font-medium flex items-center gap-1">
                      <Eye className="h-3 w-3" /> Klik untuk Pratinjau
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pratinjau Surat Keluar Terpilih
            </span>
            {selectedSurat?.status === 'Disetujui & Diterbitkan' && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Telah Ditandatangani Digital
              </span>
            )}
          </div>

          <DocumentViewer surat={selectedSurat} showSignature={true} />
        </div>
      </div>

      {/* MODAL: BUAT DRAFT SURAT KELUAR */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary-100 p-2 text-primary-800">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Buat Draft Surat Keluar</h3>
                  <p className="text-xs text-slate-500">Naskah dinas akan diajukan ke Kepala Sekolah untuk ACC & TTD</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Surat Agenda *</label>
                  <input
                    type="text"
                    required
                    value={formData.nomor_surat}
                    onChange={(e) => setFormData({ ...formData, nomor_surat: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal Surat *</label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tujuan Surat / Penerima *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Orang Tua Siswa / Kepala BBPMP"
                  value={formData.tujuan}
                  onChange={(e) => setFormData({ ...formData, tujuan: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Perihal *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Permohonan Narasumber In-House Training"
                  value={formData.perihal}
                  onChange={(e) => setFormData({ ...formData, perihal: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ringkasan / Isi Pokok Surat</label>
                <textarea
                  rows="3"
                  placeholder="Ringkasan isi surat keluar..."
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Draft Surat (PDF)</label>
                <input
                  type="text"
                  value={formData.file}
                  onChange={(e) => setFormData({ ...formData, file: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-slate-50 text-slate-600"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Status awal: <strong>Draft Menunggu TTD</strong> (akan diproses di dashboard Kepala Sekolah)
                </span>
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary-900 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-primary-800"
                >
                  Ajukan untuk TTD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
