import React from 'react';

export const Badge = ({ status, size = 'md' }) => {
  const getBadgeStyle = (statusText) => {
    switch (statusText) {
      case 'Draft TU':
        return 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-400/20';
      case 'Menunggu ACC Kepala Sekolah':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
      case 'Didisposisikan':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20';
      case 'Selesai':
      case 'Disetujui & Diterbitkan':
      case 'VALID':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      case 'Draft Menunggu TTD':
        return 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/20';
      case 'Revisi':
      case 'Ditolak':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20';
      case 'Baru':
        return 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-500/20';
      case 'Sedang Diproses':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/20';
      case 'Penting':
        return 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/20';
      case 'Sangat Penting':
        return 'bg-red-50 text-red-700 border-red-200 ring-red-500/20';
      case 'Biasa':
        return 'bg-slate-50 text-slate-600 border-slate-200 ring-slate-400/20';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-400/20';
    }
  };

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : size === 'lg'
    ? 'px-3 py-1.5 text-sm font-semibold'
    : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-xs ring-1 ring-inset ${sizeClasses} ${getBadgeStyle(status)}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
};
