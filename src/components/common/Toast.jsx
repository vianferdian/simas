import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const { message, type } = toast;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />;
      default:
        return <Info className="h-5 w-5 text-sky-500 shrink-0" />;
    }
  };

  const getBorder = () => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-white text-slate-800';
      case 'error':
        return 'border-rose-200 bg-white text-slate-800';
      default:
        return 'border-sky-200 bg-white text-slate-800';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border p-4 shadow-xl ring-1 ring-black/5 animate-in slide-in-from-bottom-5 duration-300 max-w-md bg-white">
      {getIcon()}
      <div className="text-sm font-medium leading-relaxed">{message}</div>
    </div>
  );
};
