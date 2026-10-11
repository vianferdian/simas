import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  User, 
  LogOut, 
  ChevronDown, 
  CheckCheck, 
  Sparkles, 
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const Navbar = ({ toggleSidebar }) => {
  const { currentUser, logout, switchRole, notifications } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleSwitchOpen, setRoleSwitchOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const roleRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (roleRef.current && !roleRef.current.contains(e.target)) setRoleSwitchOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleName = (role) => {
    switch (role) {
      case 'admin': return 'Admin Tata Usaha (TU)';
      case 'kepsek': return 'Kepala Sekolah';
      case 'guru': return 'Guru Mata Pelajaran';
      default: return 'Pengguna';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left side: Hamburger button + School Branding */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden focus:outline-hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-900 to-primary-600 text-white font-black shadow-md shadow-primary-900/10">
            SMK
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">
              SMK Negeri 1 Unggul
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Sistem Informasi Manajemen Persuratan & Disposisi
            </p>
          </div>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher for seamless pair testing */}
        <div className="relative" ref={roleRef}>
          <button
            type="button"
            onClick={() => setRoleSwitchOpen(!roleSwitchOpen)}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition shadow-2xs"
            title="Klik untuk beralih peran simulasi"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="hidden md:inline text-slate-500">Peran:</span>
            <span className="text-primary-800 font-bold">{getRoleName(currentUser?.role)}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {roleSwitchOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-slate-900/5 animate-in fade-in zoom-in-95 duration-150 z-50">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Simulasi Peran Aktif
              </div>
              <button
                type="button"
                onClick={() => { switchRole('admin'); setRoleSwitchOpen(false); navigate('/admin/dashboard'); }}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${currentUser?.role === 'admin' ? 'bg-primary-50 text-primary-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                <div>
                  <p className="font-semibold">Admin Tata Usaha</p>
                  <p className="text-[10px] text-slate-400">Input surat & usulan disposisi</p>
                </div>
                {currentUser?.role === 'admin' && <div className="h-1.5 w-1.5 rounded-full bg-primary-600" />}
              </button>

              <button
                type="button"
                onClick={() => { switchRole('kepsek'); setRoleSwitchOpen(false); navigate('/kepsek/dashboard'); }}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${currentUser?.role === 'kepsek' ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                <div>
                  <p className="font-semibold">Kepala Sekolah</p>
                  <p className="text-[10px] text-slate-400">Review & ACC TTD Digital</p>
                </div>
                {currentUser?.role === 'kepsek' && <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => { switchRole('guru'); setRoleSwitchOpen(false); navigate('/guru/dashboard'); }}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${currentUser?.role === 'guru' ? 'bg-sky-50 text-sky-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                <div>
                  <p className="font-semibold">Guru (Penerima Tugas)</p>
                  <p className="text-[10px] text-slate-400">Eksekusi tugas & lapor hasil</p>
                </div>
                {currentUser?.role === 'guru' && <div className="h-1.5 w-1.5 rounded-full bg-sky-600" />}
              </button>
            </div>
          )}
        </div>

        {/* Notification Center */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            aria-label="Notifikasi"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-100 bg-white shadow-2xl ring-1 ring-slate-900/5 z-50 overflow-hidden animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">Pemberitahuan</span>
                  <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[11px] font-semibold text-primary-800">
                    {unreadCount} Baru
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Real-time</span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Tidak ada notifikasi baru saat ini.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => {
                        setNotifOpen(false);
                        if (n.link) navigate(n.link);
                      }}
                      className="p-3.5 hover:bg-slate-50 transition cursor-pointer flex gap-3 text-left"
                    >
                      <div className="mt-0.5 h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-900 leading-snug">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-slate-100 bg-slate-50 p-2 text-center">
                <Link
                  to={currentUser?.role === 'kepsek' ? '/kepsek/dashboard' : '/guru/dashboard'}
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-semibold text-primary-700 hover:text-primary-800 flex items-center justify-center gap-1"
                >
                  Lihat Semua Aktivitas <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 rounded-full p-1 pl-2 hover:bg-slate-100 transition"
          >
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"}
              alt={currentUser?.nama}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-primary-500/20"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-none">{currentUser?.nama}</p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{getRoleName(currentUser?.role)}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-slate-900/5 z-50 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 px-3 py-2.5">
                <p className="text-xs font-bold text-slate-900">{currentUser?.nama}</p>
                <p className="text-[11px] text-slate-500">{currentUser?.email}</p>
                {currentUser?.nip && (
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">NIP. {currentUser?.nip}</p>
                )}
              </div>

              <div className="py-1">
                <Link
                  to="/arsip"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  Arsip Digital
                </Link>
                <Link
                  to="/verify/SM-2026-002"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  Cek Verifikasi QR Publik
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar dari Sistem
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
