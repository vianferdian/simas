import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { 
  Inbox, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  Upload, 
  FileSpreadsheet, 
  X, 
  FileText, 
  Calendar, 
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SuratMasuk = () => {
  const { suratMasukList, addSuratMasuk, updateSuratMasuk, deleteSuratMasuk } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedSurat, setSelectedSurat] = useState(null);

  // Form states for Add/Edit
  const [formData, setFormData] = useState({
    nomor_surat: '',
    tanggal: new Date().toISOString().split('T')[0],
    pengirim: '',
    perihal: '',
    ringkasan: '',
    urgensi: 'Penting',
    file: 'Surat_Dinas_Masuk.pdf'
  });

  const handleOpenAdd = () => {
    setFormData({
      nomor_surat: `421.3/${Math.floor(Math.random() * 900 + 100)}/Disdik/2026`,
      tanggal: new Date().toISOString().split('T')[0],
      pengirim: '',
      perihal: '',
      ringkasan: '',
      urgensi: 'Penting',
      file: 'Surat_Dinas_Masuk.pdf'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (surat) => {
    setSelectedSurat(surat);
    setFormData({
      nomor_surat: surat.nomor_surat,
      tanggal: surat.tanggal,
      pengirim: surat.pengirim,
      perihal: surat.perihal,
      ringkasan: surat.ringkasan || '',
      urgensi: surat.urgensi || 'Penting',
      file: surat.file || 'Surat_Dinas.pdf'
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDetail = (surat) => {
    setSelectedSurat(surat);
    setIsDetailModalOpen(true);
  };

  const handleOpenUpload = (surat) => {
    setSelectedSurat(surat);
    setIsUploadModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    addSuratMasuk(formData);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (selectedSurat) {
      updateSuratMasuk(selectedSurat.id, formData);
      setIsEditModalOpen(false);
    }
  };

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    if (selectedSurat) {
      updateSuratMasuk(selectedSurat.id, { file: 'Dokumen_Revisi_Terbaru.pdf' });
      setIsUploadModalOpen(false);
    }
  };

  // Filtered letters
  const filteredList = suratMasukList.filter((s) => {
    const matchSearch = 
      s.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pengirim.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.perihal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Manajemen Surat Masuk
            </h1>
            <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-bold text-primary-800">
              {filteredList.length} Berkas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola penerimaan naskah dinas, registrasi agenda, dan usulan disposisi ke Kepala Sekolah.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-900 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-primary-900/20 hover:bg-primary-800 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Surat Masuk</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nomor surat, pengirim, atau perihal..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-primary-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:border-primary-500 focus:outline-hidden"
          >
            <option value="Semua">Semua Status</option>
            <option value="Draft TU">Draft TU</option>
            <option value="Menunggu ACC Kepala Sekolah">Menunggu ACC Kepala Sekolah</option>
            <option value="Didisposisikan">Didisposisikan</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-4">Nomor Surat</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Pengirim</th>
                <th className="px-6 py-4">Perihal</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    <Inbox className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                    <p className="font-medium">Tidak ada surat masuk yang sesuai filter</p>
                  </td>
                </tr>
              ) : (
                filteredList.map((surat) => (
                  <tr key={surat.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{surat.nomor_surat}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{surat.kode || surat.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-medium">
                      {surat.tanggal}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {surat.pengirim}
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <p className="font-medium text-slate-900 truncate">{surat.perihal}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{surat.ringkasan}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge status={surat.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Detail */}
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(surat)}
                          title="Lihat Detail & Dokumen"
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(surat)}
                          title="Edit Surat"
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>

                        {/* Upload */}
                        <button
                          type="button"
                          onClick={() => handleOpenUpload(surat)}
                          title="Upload Ulang File"
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                        >
                          <Upload className="h-4 w-4" />
                        </button>

                        {/* Shortcut Draft Disposisi */}
                        <Link
                          to={`/admin/draft-disposisi/${surat.id}`}
                          title="Susun Draft Disposisi"
                          className="flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-700 hover:bg-primary-100 transition shadow-2xs"
                        >
                          <FileSpreadsheet className="h-3.5 w-3.5" />
                          <span>Disposisi</span>
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus surat ${surat.nomor_surat}?`)) {
                              deleteSuratMasuk(surat.id);
                            }
                          }}
                          title="Hapus Surat"
                          className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: TAMBAH SURAT MASUK */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary-100 p-2 text-primary-800">
                  <Inbox className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Registrasi Surat Masuk</h3>
                  <p className="text-xs text-slate-500">Input naskah dinas baru ke dalam agenda TU</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Surat *</label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Instansi / Pengirim *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dinas Pendidikan Provinsi Jawa Barat"
                  value={formData.pengirim}
                  onChange={(e) => setFormData({ ...formData, pengirim: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Perihal / Hal *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Undangan Koordinasi Pengembangan Kurikulum"
                  value={formData.perihal}
                  onChange={(e) => setFormData({ ...formData, perihal: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ringkasan Isi Surat</label>
                <textarea
                  rows="3"
                  placeholder="Ringkasan poin-poin utama surat..."
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sifat / Urgensi</label>
                  <select
                    value={formData.urgensi}
                    onChange={(e) => setFormData({ ...formData, urgensi: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                  >
                    <option value="Biasa">Biasa</option>
                    <option value="Penting">Penting</option>
                    <option value="Sangat Penting">Sangat Penting / Segera</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Upload File PDF</label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-600 hover:bg-slate-100 transition">
                      <span>Pilih File PDF</span>
                      <input 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setFormData({ ...formData, file: e.target.files[0].name });
                          }
                        }}
                      />
                    </label>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
                    File: {formData.file}
                  </span>
                </div>
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
                  Simpan Surat Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SURAT */}
      {isEditModalOpen && selectedSurat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Data Surat Masuk</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Surat</label>
                <input
                  type="text"
                  required
                  value={formData.nomor_surat}
                  onChange={(e) => setFormData({ ...formData, nomor_surat: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="date"
                    required
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pengirim</label>
                  <input
                    type="text"
                    required
                    value={formData.pengirim}
                    onChange={(e) => setFormData({ ...formData, pengirim: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Perihal</label>
                <input
                  type="text"
                  required
                  value={formData.perihal}
                  onChange={(e) => setFormData({ ...formData, perihal: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ringkasan</label>
                <textarea
                  rows="3"
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary-900 px-5 py-2 text-xs font-bold text-white shadow-md"
                >
                  Perbarui Surat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETAIL SURAT */}
      {isDetailModalOpen && selectedSurat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-primary-700 uppercase tracking-wider">
                  Detail Informasi Dokumen
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedSurat.nomor_surat}</h3>
              </div>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Saat Ini:</span>
                  <Badge status={selectedSurat.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Masuk:</span>
                  <span className="font-semibold text-slate-800">{selectedSurat.tanggal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pengirim:</span>
                  <span className="font-semibold text-slate-800">{selectedSurat.pengirim}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lampiran File:</span>
                  <span className="font-mono text-primary-700">{selectedSurat.file || 'Naskah.pdf'}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Perihal:</span>
                <p className="text-slate-800 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {selectedSurat.perihal}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Ringkasan Naskah:</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                  {selectedSurat.ringkasan || 'Tidak ada ringkasan.'}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center pt-3 border-t border-slate-100">
              <Link
                to={`/admin/draft-disposisi/${selectedSurat.id}`}
                className="rounded-xl bg-primary-900 px-4 py-2 text-xs font-bold text-white shadow-md flex items-center gap-1.5"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Buka Form Disposisi</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD FILE */}
      {isUploadModalOpen && selectedSurat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Upload / Ganti Dokumen PDF</h3>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateUpload} className="mt-4 space-y-4">
              <p className="text-xs text-slate-600">
                Pilih file scan naskah dinas resmi (format PDF maksimal 10MB) untuk surat:
                <strong className="block text-slate-800 mt-1">{selectedSurat.nomor_surat}</strong>
              </p>

              <div className="rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/50 p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-primary-600 mb-2" />
                <p className="text-xs font-semibold text-slate-800">Tarik file PDF ke sini atau klik untuk browse</p>
                <p className="text-[10px] text-slate-400 mt-1">Format: .pdf (Maks. 10 MB)</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary-900 px-4 py-2 text-xs font-bold text-white shadow-md"
                >
                  Simpan & Unggah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
