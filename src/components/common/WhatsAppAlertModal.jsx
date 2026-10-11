import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, CheckCheck, X, Send, Phone, UserCheck, ExternalLink } from 'lucide-react';

export const WhatsAppAlertModal = () => {
  const { whatsAppModal, setWhatsAppModal } = useApp();

  if (!whatsAppModal.isOpen) return null;

  const { guru, surat, message } = whatsAppModal;

  const handleClose = () => {
    setWhatsAppModal({ isOpen: false, guru: null, surat: null, message: '' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    alert('Pesan WhatsApp disalin ke clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        {/* WhatsApp Header */}
        <div className="bg-[#075e54] p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={guru?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
                alt={guru?.nama} 
                className="h-10 w-10 rounded-full border border-white/30 object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#25d366] border-2 border-[#075e54]"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm leading-tight">{guru?.nama || 'Guru Penerima'}</span>
              </div>
              <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                <span>{guru?.noHp || '0812-3456-7890'}</span> • Online
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">WhatsApp Notification Sent</span>
          </div>
          <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-full font-mono">
            Gateway Terkirim
          </span>
        </div>

        {/* WhatsApp Chat Body */}
        <div 
          className="p-4 min-h-[220px] max-h-[340px] overflow-y-auto space-y-3"
          style={{ 
            backgroundColor: '#efeae2',
            backgroundImage: `radial-gradient(#d1d7db 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        >
          {/* Timestamp chip */}
          <div className="flex justify-center">
            <span className="rounded-lg bg-white/90 px-3 py-1 text-[10px] font-medium text-slate-600 shadow-xs">
              HARI INI
            </span>
          </div>

          {/* Outgoing Message Bubble */}
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-2xl rounded-tr-xs bg-[#d9fdd3] p-3 text-xs text-slate-800 shadow-sm leading-relaxed relative">
              <p className="whitespace-pre-line">
                {message || `Bapak/Ibu ${guru?.nama}, Anda mendapat tugas baru dari Kepala Sekolah.`}
              </p>
              
              <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-slate-500">
                <span>{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <UserCheck className="h-3.5 w-3.5 text-slate-400" />
            Notifikasi otomatis sistem SIMAS
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition shadow-xs"
            >
              Salin Teks
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition shadow-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
