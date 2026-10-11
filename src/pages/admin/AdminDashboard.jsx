import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { 
  Inbox, 
  Clock, 
  Send, 
  AlertCircle, 
  ArrowUpRight, 
  PlusCircle, 
  FileText, 
  CheckCircle2, 
  FileSpreadsheet,
  TrendingUp,
  Users
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { MONTHLY_STATS } from '../../data/mockData';

export const AdminDashboard = () => {
  const { suratMasukList, suratKeluarList, guruList } = useApp();

  const totalSuratMasuk = suratMasukList.length;
  const menungguDisposisi = suratMasukList.filter(s => s.status === 'Draft TU' || s.status === 'Menunggu ACC Kepala Sekolah').length;
  const totalSuratKeluar = suratKeluarList.length;
  const tugasGuruPending = suratMasukList.filter(s => s.disposisi && s.disposisi.status_tugas !== 'Selesai').length;

  const teacherProgressData = [
    { name: 'Selesai', value: suratMasukList.filter(s => s.status === 'Selesai').length, color: '#10b981' },
    { name: 'Diproses', value: suratMasukList.filter(s => s.disposisi?.status_tugas === 'Sedang Diproses').length, color: '#6366f1' },
    { name: 'Tugas Baru', value: suratMasukList.filter(s => s.disposisi?.status_tugas === 'Baru').length, color: '#0ea5e9' },
    { name: 'Draft/Belum ACC', value: suratMasukList.filter(s => !s.disposisi).length, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-gradient-to-r from-primary-950 via-primary-900 to-navy-900 p-6 sm:p-8 text-white shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary-200 mb-2">
            <span>Sistem Tata Usaha & Kearsipan</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Dashboard Administrasi Persuratan
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Kelola arsip surat masuk, pengajuan draft disposisi tugas guru, dan administrasi surat keluar secara terstruktur dan efisien.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/surat-masuk"
            className="flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-400 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Tambah Surat Masuk</span>
          </Link>
          <Link
            to="/admin/surat-keluar"
            className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
          >
            <Send className="h-4 w-4" />
            <span>Buat Surat Keluar</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Surat Masuk</span>
            <div className="rounded-xl bg-blue-50 p-2 text-primary-700">
              <Inbox className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalSuratMasuk}</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              +12% bln ini
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Arsip digital aktif di sistem</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Menunggu Disposisi</span>
            <div className="rounded-xl bg-amber-50 p-2 text-amber-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{menungguDisposisi}</span>
            <span className="text-xs font-medium text-amber-600">Perlu tindak lanjut</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Draft TU & menunggu review Kepala Sekolah</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Surat Keluar</span>
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-700">
              <Send className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalSuratKeluar}</span>
            <span className="text-xs font-medium text-slate-500">Semester ini</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Naskah dinas resmi terbit & proses</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tugas Guru Berjalan</span>
            <div className="rounded-xl bg-indigo-50 p-2 text-indigo-700">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{tugasGuruPending}</span>
            <span className="text-xs font-medium text-indigo-600">Sedang diproses</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Tugas yang belum diselesaikan guru</p>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Chart: Monthly Trends */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Statistik Surat Per Bulan (2026)</h2>
              <p className="text-xs text-slate-500">Perbandingan volume surat masuk dan keluar</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                <span className="text-slate-600">Surat Masuk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600">Surat Keluar</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d5bd8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1d5bd8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorKeluar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="masuk" stroke="#1d5bd8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMasuk)" />
                <Area type="monotone" dataKey="keluar" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorKeluar)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Guru Task Status */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Status Penyelesaian Tugas Guru</h2>
            <p className="text-xs text-slate-500">Distribusi status beban penugasan disposisi</p>
          </div>

          <div className="h-48 w-full my-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={teacherProgressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {teacherProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3">
            {teacherProgressData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value} Surat</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Recent Surat Masuk Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Surat Masuk Terbaru</h2>
            <p className="text-xs text-slate-500">Daftar naskah dinas yang baru masuk ke sistem</p>
          </div>
          <Link
            to="/admin/surat-masuk"
            className="flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800"
          >
            Lihat Semua <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Nomor Surat</th>
                <th className="px-6 py-3.5">Tanggal</th>
                <th className="px-6 py-3.5">Pengirim</th>
                <th className="px-6 py-3.5">Perihal</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {suratMasukList.slice(0, 5).map((surat) => (
                <tr key={surat.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">
                    {surat.nomor_surat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{surat.tanggal}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{surat.pengirim}</td>
                  <td className="px-6 py-4 max-w-xs truncate text-slate-700">{surat.perihal}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={surat.status} />
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/draft-disposisi/${surat.id}`}
                        className="rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-100 transition flex items-center gap-1"
                      >
                        <FileSpreadsheet className="h-3 w-3" />
                        <span>Disposisi</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
