import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Inbox, 
  Send, 
  FileCheck, 
  Archive, 
  CheckSquare, 
  FileSpreadsheet, 
  QrCode, 
  ShieldCheck, 
  HelpCircle,
  X,
  Sparkles,
  Users
} from 'lucide-react';

export const Sidebar = ({ isOpen, closeSidebar }) => {
  const { currentUser, suratMasukList, suratKeluarList } = useApp();

  const role = currentUser?.role || 'admin';

  // Badge counts
  const pendingKepsekCount = suratMasukList.filter(s => s.status === 'Menunggu ACC Kepala Sekolah').length;
  const draftTuCount = suratMasukList.filter(s => s.status === 'Draft TU').length;
  const guruTaskCount = suratMasukList.filter(s => s.disposisi && s.disposisi.status_tugas !== 'Selesai').length;
  const pendingKeluarCount = suratKeluarList.filter(s => s.status === 'Draft Menunggu TTD').length;

  const adminNav = [
    { name: 'Dashboard TU', path: '/admin/dashboard', icon: LayoutDashboard },
    { 
      name: 'Surat Masuk', 
      path: '/admin/surat-masuk', 
      icon: Inbox, 
      badge: draftTuCount > 0 ? `${draftTuCount} Draft` : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { 
      name: 'Draft Disposisi', 
      path: '/admin/draft-disposisi/sm-1', 
      icon: FileSpreadsheet 
    },
    { 
      name: 'Surat Keluar', 
      path: '/admin/surat-keluar', 
      icon: Send,
      badge: pendingKeluarCount > 0 ? `${pendingKeluarCount} TTD` : null,
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    { name: 'Data Dewan Guru', path: '/admin/guru', icon: Users },
    { name: 'Arsip Digital', path: '/arsip', icon: Archive },
  ];

  const kepsekNav = [
    { 
      name: 'Dashboard Approval', 
      path: '/kepsek/dashboard', 
      icon: LayoutDashboard,
      badge: pendingKepsekCount > 0 ? `${pendingKepsekCount} Perlu ACC` : null,
      badgeColor: 'bg-rose-100 text-rose-800 font-bold'
    },
    { 
      name: 'Review Disposisi', 
      path: '/kepsek/review-surat/sm-1', 
      icon: FileCheck,
      badge: pendingKepsekCount > 0 ? `${pendingKepsekCount}` : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { 
      name: 'Review Surat Keluar', 
      path: '/kepsek/review-surat-keluar/sk-2', 
      icon: Send,
      badge: pendingKeluarCount > 0 ? `${pendingKeluarCount}` : null,
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    { name: 'Arsip Digital', path: '/arsip', icon: Archive },
  ];

  const guruNav = [
    { name: 'Dashboard Guru', path: '/guru/dashboard', icon: LayoutDashboard },
    { 
      name: 'Tugas Saya', 
      path: '/guru/tugas', 
      icon: CheckSquare,
      badge: guruTaskCount > 0 ? `${guruTaskCount} Tugas` : null,
      badgeColor: 'bg-emerald-100 text-emerald-800 font-semibold'
    },
    { name: 'Arsip Digital', path: '/arsip', icon: Archive },
  ];

  let currentNavItems = adminNav;
  if (role === 'kepsek') currentNavItems = kepsekNav;
  if (role === 'guru') currentNavItems = guruNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200/80 bg-white flex flex-col justify-between transition-transform duration-200 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Header */}
        <div>
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-900 to-primary-600 text-white font-extrabold shadow-md shadow-primary-900/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900">SIMAS</span>
                <span className="text-[10px] font-semibold text-primary-700 tracking-wider uppercase">Persuratan Digital</span>
              </div>
            </div>

            <button
              onClick={closeSidebar}
              className="lg:hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama ({role.toUpperCase()})
            </div>

            {currentNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) => `
                  group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all
                  ${isActive 
                    ? 'bg-primary-900 text-white shadow-md shadow-primary-900/20' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-primary-300' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Utility Section */}
            <div className="pt-6 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Validasi Publik
            </div>

            <NavLink
              to="/verify/SM-2026-002"
              onClick={closeSidebar}
              className={({ isActive }) => `
                group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all
                ${isActive 
                  ? 'bg-emerald-800 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'}
              `}
            >
              <div className="flex items-center gap-3">
                <QrCode className="h-4 w-4 text-emerald-600" />
                <span>Verifikasi QR TTD</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Publik
              </span>
            </NavLink>
          </div>
        </div>

        {/* Bottom Section: School Info Badge */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sparkles className="h-3.5 w-3.5 text-primary-600" />
              <span>Sistem Terintegrasi v2.4</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              SMKN 1 Unggul Nusantara • Akreditasi A Unggul
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
