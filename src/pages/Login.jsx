import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { API_BASE_URL } from '../services/api';
import { 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle,
  GraduationCap,
  Sparkles,
  Users,
  Eye,
  EyeOff,
  Server,
  KeyRound,
  Info
} from 'lucide-react';

export const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@smkn1.sch.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('admin');

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        if (res.user.role === 'admin') navigate('/admin/dashboard');
        else if (res.user.role === 'kepsek') navigate('/kepsek/dashboard');
        else navigate('/guru/dashboard');
      } else {
        setError(res.message || 'Email atau kata sandi tidak valid.');
      }
    } catch (err) {
      setLoading(false);
      setError('Terjadi kendala koneksi saat menghubungi server otentikasi.');
    }
  };

  const handlePresetSelect = (roleKey, presetEmail, presetPass) => {
    setActiveTab(roleKey);
    setEmail(presetEmail);
    setPassword(presetPass);
    setError('');
  };

  const handleQuickLoginNow = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setLoading(true);
    setError('');
    try {
      const res = await login(demoEmail, 'password123');
      setLoading(false);
      if (res.success) {
        if (res.user.role === 'admin') navigate('/admin/dashboard');
        else if (res.user.role === 'kepsek') navigate('/kepsek/dashboard');
        else navigate('/guru/dashboard');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setLoading(false);
      setError('Gagal masuk.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-950 overflow-hidden font-sans">
      {/* Background Lighting & Geometry */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-primary-700/25 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-[550px] w-[550px] rounded-full bg-emerald-600/25 blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg my-8">
        
        {/* Top API Server Status Badge */}
        <div className="mb-3 flex items-center justify-between px-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full backdrop-blur-sm shadow-xs">
            <Server className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] text-slate-300">API Endpoint:</span>
            <span className="font-mono text-[11px] text-emerald-400 font-semibold truncate max-w-[170px] sm:max-w-xs">{API_BASE_URL}</span>
          </div>
          <span className="text-[11px] bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400 hidden sm:inline">
            T.A. 2026/2027
          </span>
        </div>

        {/* Card Body */}
        <div className="rounded-3xl border border-white/10 bg-white/95 p-7 sm:p-9 shadow-2xl backdrop-blur-xl ring-1 ring-slate-900/5">
          
          {/* Logo & School Header */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-950 via-primary-800 to-primary-600 text-white shadow-xl shadow-primary-950/20 ring-4 ring-primary-50">
              <GraduationCap className="h-8 w-8 text-amber-300" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-100/80 px-3 py-0.5 text-[11px] font-bold text-primary-900 uppercase tracking-wider mb-1">
              <span>Sistem Manajemen Surat (SIMAS)</span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              SMK Negeri 1 Unggul
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Portal Terpadu Tata Kelola Naskah Dinas, Disposisi Elektronik & Tanda Tangan Digital Tersertifikasi
            </p>
          </div>

          {/* Role Preset Tabs */}
          <div className="mb-5 grid grid-cols-3 gap-1.5 rounded-2xl bg-slate-100 p-1 text-center text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => handlePresetSelect('admin', 'admin@smkn1.sch.id', 'password123')}
              className={`rounded-xl py-2 transition ${activeTab === 'admin' ? 'bg-white text-primary-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
            >
              Admin TU
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('kepsek', 'kepsek@smkn1.sch.id', 'password123')}
              className={`rounded-xl py-2 transition ${activeTab === 'kepsek' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
            >
              Kepsek
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('guru', 'budi@smkn1.sch.id', 'password123')}
              className={`rounded-xl py-2 transition ${activeTab === 'guru' ? 'bg-white text-sky-900 shadow-xs font-bold' : 'hover:text-slate-900'}`}
            >
              Dewan Guru
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Email / NIP Akun Resmi *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@smkn1.sch.id"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Kata Sandi *
                </label>
                <span className="text-[11px] text-primary-700 hover:underline cursor-pointer">
                  Lupa sandi?
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-primary-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
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
                <span className="text-xs font-medium text-slate-600">Ingat sesi saya</span>
              </label>
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Enkripsi TLS 1.3
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-950 via-primary-900 to-primary-700 py-3 text-xs font-bold text-white shadow-lg shadow-primary-950/20 hover:from-primary-900 hover:to-primary-600 focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Mengautentikasi ke Server...</span>
                </div>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Access Grid */}
          <div className="mt-7 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Akses Instan Pengujian (1-Klik):
              </span>
              <span className="text-[10px] text-slate-400">Pilih peran</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLoginNow('admin@smkn1.sch.id')}
                className="flex flex-col items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-primary-50 hover:border-primary-200 transition text-center group shadow-2xs"
              >
                <span className="h-2 w-2 rounded-full bg-primary-600 mb-1 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-primary-800">Admin TU</span>
                <span className="text-[10px] text-slate-400">Tata Usaha</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoginNow('kepsek@smkn1.sch.id')}
                className="flex flex-col items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition text-center group shadow-2xs"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-600 mb-1 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">Kepsek</span>
                <span className="text-[10px] text-slate-400">Approval & TTD</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLoginNow('budi@smkn1.sch.id')}
                className="flex flex-col items-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 transition text-center group shadow-2xs"
              >
                <span className="h-2 w-2 rounded-full bg-sky-600 mb-1 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-sky-800">Guru</span>
                <span className="text-[10px] text-slate-400">Lembar Tugas</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <p className="mt-5 text-center text-xs text-slate-400">
          SIMAS v2.4 • Dinas Pendidikan Provinsi Jawa Barat • Cabang Dinas Wilayah VII
        </p>
      </div>
    </div>
  );
};
