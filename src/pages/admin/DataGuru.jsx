import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { API_BASE_URL } from '../../services/api';
import { 
  Users, 
  Plus, 
  Search, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  Server, 
  Phone, 
  Mail, 
  Briefcase, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const DataGuru = () => {
  const { 
    guruList, 
    guruDataSource, 
    isGuruLoading, 
    refreshGuruList, 
    addGuru, 
    updateGuru, 
    deleteGuru 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState(null);

  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    jabatan: '',
    unitKerja: 'Kurikulum & Pembelajaran',
    noHp: '0812-',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bebanTugasSaatIni: 0
  });

  const handleOpenAdd = () => {
    setFormData({
      nama: '',
      nip: `19${Math.floor(Math.random() * 20 + 80)}0101 201${Math.floor(Math.random() * 9 + 0)}01 1 00${Math.floor(Math.random() * 9 + 1)}`,
      jabatan: 'Guru Mata Pelajaran',
      unitKerja: 'Kurikulum & Pembelajaran',
      noHp: '0812-3456-7890',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      bebanTugasSaatIni: 0
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (guru) => {
    setSelectedGuru(guru);
    setFormData({
      nama: guru.nama,
      nip: guru.nip,
      jabatan: guru.jabatan,
      unitKerja: guru.unitKerja || 'Kurikulum & Pembelajaran',
      noHp: guru.noHp || '',
      email: guru.email || '',
      avatar: guru.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      bebanTugasSaatIni: guru.bebanTugasSaatIni || 0
    });
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    await addGuru(formData);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (selectedGuru) {
      await updateGuru(selectedGuru.id, formData);
      setIsEditModalOpen(false);
    }
  };

  const filteredGuru = guruList.filter(g => 
    g.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Manajemen Data Dewan Guru
            </h1>
            <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-bold text-primary-800">
              {filteredGuru.length} Guru
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data master guru terintegrasi dengan REST API untuk penugasan disposisi surat dinas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh via API Button */}
          <button
            type="button"
            onClick={() => refreshGuruList(false)}
            disabled={isGuruLoading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition disabled:opacity-60"
            title="Tarik data terbaru dari REST API"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isGuruLoading ? 'animate-spin text-primary-600' : 'text-slate-500'}`} />
            <span>{isGuruLoading ? 'Menyinkronkan...' : 'Sinkronkan API'}</span>
          </button>

          {/* Add Teacher Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-900 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-primary-900/20 hover:bg-primary-800 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Data Guru</span>
          </button>
        </div>
      </div>

      {/* API Endpoint & Status Banner */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700 border border-primary-100">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">Integrasi REST API Dewan Guru</span>
              {guruDataSource === 'api' ? (
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  REST API Terhubung
                </span>
              ) : (
                <span className="rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  Mode Lokal (Offline API Fallback)
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Target URL: <strong>{API_BASE_URL}/guru</strong> (Konfigurasi di .env: VITE_API_URL)
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Metode: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">GET</span> / <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">POST</span> / <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">PUT</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari guru berdasarkan nama, NIP, atau mata pelajaran/jabatan..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Teachers Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuru.map((guru) => (
          <div
            key={guru.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={guru.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={guru.nama}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-500/20"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{guru.nama}</h3>
                    <p className="text-xs text-primary-800 font-semibold mt-0.5">{guru.jabatan}</p>
                    <p className="text-[10px] text-slate-500 font-mono">NIP. {guru.nip}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> No. WhatsApp:
                  </span>
                  <span className="font-semibold text-slate-800">{guru.noHp || '0812-3456-7890'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Mail className="h-3 w-3" /> Email:
                  </span>
                  <span className="font-medium text-slate-700 truncate max-w-[150px]">{guru.email || `${guru.nama.split(' ')[0].toLowerCase()}@smkn1.sch.id`}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="text-slate-400">Unit Kerja:</span>
                  <span className="font-medium text-slate-800">{guru.unitKerja || 'Dewan Guru'}</span>
                </div>
              </div>
            </div>

            {/* Footer Card with Action Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Tersedia untuk Disposisi
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(guru)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                  title="Edit data guru"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Hapus guru ${guru.nama}?`)) {
                      deleteGuru(guru.id);
                    }
                  }}
                  className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition"
                  title="Hapus data guru"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: TAMBAH DATA GURU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-primary-100 p-2 text-primary-800">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Tambah Data Guru Baru</h3>
                  <p className="text-xs text-slate-500">Kirim data ke REST API backend</p>
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
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso, S.Pd"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">NIP *</label>
                  <input
                    type="text"
                    required
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">No. WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={formData.noHp}
                    onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan / Guru Mapel *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Guru Matematika & Pembina OSIS"
                  value={formData.jabatan}
                  onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Email Resmi</label>
                <input
                  type="email"
                  placeholder="budi@smkn1.sch.id"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-primary-500 focus:outline-hidden"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2 border-t border-slate-100">
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
                  Simpan ke API
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DATA GURU */}
      {isEditModalOpen && selectedGuru && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Data Guru</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">NIP</label>
                  <input
                    type="text"
                    required
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">No. WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={formData.noHp}
                    onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan / Mapel</label>
                <input
                  type="text"
                  required
                  value={formData.jabatan}
                  onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
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
                  Perbarui ke API
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
