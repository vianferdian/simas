import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { 
  CheckSquare, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  Building, 
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const TugasSaya = () => {
  const { suratMasukList } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // All surat that have disposisi assigned to guru
  const myTasks = suratMasukList.filter(s => s.disposisi);

  const filteredTasks = myTasks.filter((surat) => {
    const matchSearch = 
      surat.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surat.perihal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surat.pengirim.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Semua' || surat.disposisi.status_tugas === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Daftar Tugas & Disposisi Saya
            </h1>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
              {filteredTasks.length} Tugas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Daftar naskah dinas kedinasan yang didisposisikan Kepala Sekolah kepada Anda untuk ditindaklanjuti.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari surat, perihal, atau pengirim..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-medium text-slate-700 focus:bg-white focus:outline-hidden"
          >
            <option value="Semua">Semua Status</option>
            <option value="Baru">Baru</option>
            <option value="Sedang Diproses">Sedang Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* REQUESTED TABLE: | Surat | Perihal | Dari | Deadline | Status | */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-4">Surat</th>
                <th className="px-6 py-4">Perihal</th>
                <th className="px-6 py-4">Dari</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    <CheckSquare className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                    <p className="font-medium">Tidak ada tugas penugasan yang sesuai kriteria.</p>
                  </td>
                </tr>
              ) : (
                filteredTasks.map((surat) => (
                  <tr key={surat.id} className="hover:bg-slate-50/80 transition">
                    {/* Surat */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{surat.nomor_surat}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{surat.kode || surat.id}</div>
                    </td>

                    {/* Perihal */}
                    <td className="px-6 py-4 max-w-sm">
                      <p className="font-semibold text-slate-900 line-clamp-1">{surat.perihal}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        Instruksi: {surat.disposisi.instruksi}
                      </p>
                    </td>

                    {/* Dari */}
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">
                      {surat.pengirim}
                    </td>

                    {/* Deadline */}
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-amber-700">
                      {surat.disposisi.deadline || '20 Oktober 2026'}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge status={surat.disposisi.status_tugas} />
                    </td>

                    {/* Aksi */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        to={`/guru/tugas/${surat.id}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-primary-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-800 transition shadow-xs"
                      >
                        <span>Buka Detail</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
