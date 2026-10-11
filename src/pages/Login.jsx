import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle,
  GraduationCap,
  Sparkles,
  Users
} from 'lucide-react';

export const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@smkn1.sch.id');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        if (res.user.role === 'admin') navigate('/admin/dashboard');
        else if (res.user.role === 'kepsek') navigate('/kepsek/dashboard');
        else navigate('/guru/dashboard');
      } else {
        setError(res.message);
      }
    }, 400);
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setLoading(true);
    setTimeout(() => {
      const res = login(demoEmail, 'password123');
      setLoading(false);
      if (res.success) {
        if (res.user.role === 'admin') navigate('/admin/dashboard');
        else if (res.user.role === 'kepsek') navigate('/kepsek/dashboard');
        else navigate('/guru/dashboard');
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-900 overflow-hidden">
      {/* Background Education Themed Lighting & Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary-600/20 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-emerald-600/20 blur-[130px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          
          {/* Logo & School Branding In Center */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-3.5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-950 via-primary-800 to-primary-600 text-white shadow-xl shadow-primary-950/30 ring-4 ring-primary-50">
              <GraduationCap className="h-8 w-8 text-amber-300" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              SIMAS DIGITAL
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-800 mt-0.5">
              SMK Negeri 1 Unggul Nusantara
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Sistem Manajemen Surat & Disposisi Elektronik Terpadu
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700 animate-in fade-in">
              {error}
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Email / NIP
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smkn1.sch.id"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Kata Sandi
                </label>
                <span className="text-[11px] text-primary-700 hover:underline cursor-pointer">
                  Lupa sandi?
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-xs font-medium text-slate-600">Ingat Saya</span>
              </label>
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Enkripsi TLS 1.3
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-900 to-primary-700 py-3 text-xs font-bold text-white shadow-lg shadow-primary-900/20 hover:from-primary-800 hover:to-primary-600 focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition disabled:opacity-70"
            >
              {loading ? (
                <span>Memverifikasi Akun...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Role Switcher Demo */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              Akses Cepat Pengujian (1-Klik):
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@smkn1.sch.id')}
                className="flex flex-col items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-primary-50 hover:border-primary-200 transition text-center group"
              >
                <span className="h-2 w-2 rounded-full bg-primary-600 mb-1 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-primary-800">Admin TU</span>
                <span className="text-[10px] text-slate-400">Tata Usaha</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('kepsek@smkn1.sch.id')}
                className="flex flex-col items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition text-center group"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-600 mb-1 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">Kepsek</span>
                <span className="text-[10px] text-slate-400">Approval & TTD</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('budi@smkn1.sch.id')}
                className="flex flex-col items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 transition text-center group"
              >
                <span className="h-2 w-2 rounded-full bg-sky-600 mb-1 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-sky-800">Guru</span>
                <span className="text-[10px] text-slate-400">Tugas Saya</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 Cabang Dinas Pendidikan Wilayah VII • SMKN 1 Unggul
        </p>
      </div>
    </div>
  );
};
