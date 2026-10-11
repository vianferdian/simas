import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USERS, 
  INITIAL_GURU, 
  INITIAL_SURAT_MASUK, 
  INITIAL_SURAT_KELUAR, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('simas_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to Admin TU
  });

  // Data collections with localStorage persistence
  const [suratMasukList, setSuratMasukList] = useState(() => {
    const saved = localStorage.getItem('simas_surat_masuk');
    return saved ? JSON.parse(saved) : INITIAL_SURAT_MASUK;
  });

  const [suratKeluarList, setSuratKeluarList] = useState(() => {
    const saved = localStorage.getItem('simas_surat_keluar');
    return saved ? JSON.parse(saved) : INITIAL_SURAT_KELUAR;
  });

  const [guruList, setGuruList] = useState(() => {
    const saved = localStorage.getItem('simas_guru');
    return saved ? JSON.parse(saved) : INITIAL_GURU;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('simas_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Simulated WhatsApp notification state
  const [whatsAppModal, setWhatsAppModal] = useState({
    isOpen: false,
    guru: null,
    surat: null,
    message: ''
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('simas_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('simas_surat_masuk', JSON.stringify(suratMasukList));
  }, [suratMasukList]);

  useEffect(() => {
    localStorage.setItem('simas_surat_keluar', JSON.stringify(suratKeluarList));
  }, [suratKeluarList]);

  useEffect(() => {
    localStorage.setItem('simas_guru', JSON.stringify(guruList));
  }, [guruList]);

  useEffect(() => {
    localStorage.setItem('simas_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Auth functions
  const login = (email, password) => {
    const user = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      showToast(`Selamat datang, ${user.nama}!`, 'success');
      return { success: true, user };
    }
    // Fallback demo matching
    if (email.includes('admin')) {
      const u = INITIAL_USERS[0];
      setCurrentUser(u);
      return { success: true, user: u };
    }
    if (email.includes('kepsek')) {
      const u = INITIAL_USERS[1];
      setCurrentUser(u);
      return { success: true, user: u };
    }
    if (email.includes('guru') || email.includes('budi')) {
      const u = INITIAL_USERS[2];
      setCurrentUser(u);
      return { success: true, user: u };
    }
    return { success: false, message: 'Email atau password tidak valid.' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('simas_user');
    showToast('Anda telah berhasil keluar.', 'info');
  };

  const switchRole = (role) => {
    const targetUser = INITIAL_USERS.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      showToast(`Beralih peran sebagai: ${targetUser.nama} (${targetUser.role.toUpperCase()})`, 'info');
    }
  };

  // Admin: Surat Masuk CRUD
  const addSuratMasuk = (newSurat) => {
    const id = `sm-${Date.now()}`;
    const kode = `SM-2026-${String(suratMasukList.length + 1).padStart(3, '0')}`;
    const createdItem = {
      ...newSurat,
      id,
      kode,
      status: 'Draft TU',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setSuratMasukList([createdItem, ...suratMasukList]);
    showToast(`Surat Masuk baru (${createdItem.nomor_surat}) berhasil disimpan sebagai Draft TU.`, 'success');
    return createdItem;
  };

  const updateSuratMasuk = (id, updatedData) => {
    setSuratMasukList(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
    showToast('Data surat masuk berhasil diperbarui.', 'success');
  };

  const deleteSuratMasuk = (id) => {
    setSuratMasukList(prev => prev.filter(item => item.id !== id));
    showToast('Surat masuk berhasil dihapus.', 'info');
  };

  // Admin: Draft Disposisi (Admin proposes teacher)
  const saveDraftDisposisi = (suratId, guruId, instruksiAwal) => {
    setSuratMasukList(prev => prev.map(surat => {
      if (surat.id === suratId) {
        return {
          ...surat,
          status: 'Menunggu ACC Kepala Sekolah',
          disposisiDraft: {
            guru_id: guruId,
            instruksi_tu: instruksiAwal,
            catatan_tu: 'Diusulkan oleh Admin Tata Usaha untuk ditinjau Kepala Sekolah.'
          }
        };
      }
      return surat;
    }));

    // Add notification for Kepsek
    const notifItem = {
      id: `notif-${Date.now()}`,
      type: 'approval',
      title: 'Disposisi Menunggu ACC Kepala Sekolah',
      message: `Admin TU telah mengajukan draft disposisi untuk surat ${suratId}.`,
      time: 'Baru saja',
      unread: true,
      targetRole: 'kepsek',
      link: `/kepsek/review-surat/${suratId}`
    };
    setNotifications(prev => [notifItem, ...prev]);
    showToast('Draft disposisi berhasil disimpan. Status berubah menjadi: Menunggu Review Kepala Sekolah.', 'success');
  };

  // Kepala Sekolah: ACC & TTD Disposisi
  const approveDisposisiKepsek = (suratId, selectedGuruId, instruksiFinal) => {
    const targetSurat = suratMasukList.find(s => s.id === suratId);
    const targetGuru = guruList.find(g => g.id === selectedGuruId) || guruList[0];
    const qrVerificationCode = targetSurat?.kode || `SM-2026-${Date.now().toString().slice(-3)}`;
    const qrUrl = `https://domainsekolah.com/verifikasi/${qrVerificationCode}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setSuratMasukList(prev => prev.map(surat => {
      if (surat.id === suratId) {
        return {
          ...surat,
          status: 'Didisposisikan',
          disposisi: {
            guru_id: targetGuru.id,
            instruksi: instruksiFinal || surat.disposisiDraft?.instruksi_tu || 'Harap segera ditindaklanjuti sesuai instruksi.',
            tanggal_acc: timestamp,
            kepsek_id: currentUser?.id || 'usr-2',
            qr_code: qrUrl,
            status_tugas: 'Baru',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        };
      }
      return surat;
    }));

    // Notification for Guru
    const notifGuru = {
      id: `notif-${Date.now()}`,
      type: 'assignment',
      title: 'Tugas Disposisi Baru dari Kepala Sekolah',
      message: `Bapak/Ibu ${targetGuru.nama}, Anda mendapat tugas baru: "${targetSurat?.perihal}".`,
      time: 'Baru saja',
      unread: true,
      targetRole: 'guru',
      guruId: targetGuru.id,
      link: `/guru/tugas/${suratId}`
    };
    setNotifications(prev => [notifGuru, ...prev]);

    // Open simulated WhatsApp modal
    const waMessage = `Assalamu'alaikum wr. wb. Yth. Bapak/Ibu *${targetGuru.nama}*,\n\nAnda mendapatkan tugas disposisi baru dari Kepala Sekolah terkait:\n📄 *Perihal:* ${targetSurat?.perihal}\n🔢 *No. Surat:* ${targetSurat?.nomor_surat}\n📝 *Instruksi:* ${instruksiFinal || targetSurat?.disposisiDraft?.instruksi_tu}\n\nSilakan akses sistem SIMAS untuk memulai proses pengerjaan:\n🔗 https://simas.sekolah.sch.id/guru/tugas/${suratId}`;

    setWhatsAppModal({
      isOpen: true,
      guru: targetGuru,
      surat: targetSurat,
      message: waMessage
    });

    showToast('Surat berhasil di-ACC & ditandatangani secara digital. Disposisi telah diteruskan ke guru terkait!', 'success');
  };

  // Kepala Sekolah: Tolak / Revisi
  const rejectDisposisiKepsek = (suratId, catatanRevisi = 'Perlu penyesuaian penugasan atau kelengkapan berkas.') => {
    setSuratMasukList(prev => prev.map(surat => {
      if (surat.id === suratId) {
        return {
          ...surat,
          status: 'Draft TU',
          disposisiDraft: {
            ...surat.disposisiDraft,
            catatan_revisi: catatanRevisi
          }
        };
      }
      return surat;
    }));
    showToast('Disposisi dikembalikan ke Admin TU untuk revisi.', 'info');
  };

  // Guru Task Actions
  const startGuruTask = (suratId) => {
    setSuratMasukList(prev => prev.map(surat => {
      if (surat.id === suratId && surat.disposisi) {
        return {
          ...surat,
          disposisi: {
            ...surat.disposisi,
            status_tugas: 'Sedang Diproses'
          }
        };
      }
      return surat;
    }));
    showToast('Status tugas telah diubah menjadi: Sedang Diproses.', 'info');
  };

  const completeGuruTask = (suratId, laporan, fileBukti = 'Bukti_Pelaksanaan_Tugas.pdf') => {
    const timestamp = new Date().toISOString().split('T')[0];
    setSuratMasukList(prev => prev.map(surat => {
      if (surat.id === suratId && surat.disposisi) {
        return {
          ...surat,
          status: 'Selesai',
          disposisi: {
            ...surat.disposisi,
            status_tugas: 'Selesai',
            laporan,
            file_bukti: fileBukti,
            tanggal_selesai: timestamp
          }
        };
      }
      return surat;
    }));
    showToast('Tugas berhasil diselesaikan dan laporan telah terarsip!', 'success');
  };

  // Surat Keluar Actions
  const addSuratKeluar = (data) => {
    const id = `sk-${Date.now()}`;
    const kode = `SK-2026-${String(suratKeluarList.length + 1).padStart(3, '0')}`;
    const item = {
      ...data,
      id,
      kode,
      status: 'Draft Menunggu TTD',
      qr_code: null,
      tanggal_acc: null
    };
    setSuratKeluarList([item, ...suratKeluarList]);
    showToast('Draft Surat Keluar berhasil dibuat dan menunggu TTD Kepala Sekolah.', 'success');
    return item;
  };

  const approveSuratKeluar = (id) => {
    const item = suratKeluarList.find(s => s.id === id);
    const qrUrl = `https://domainsekolah.com/verifikasi/${item?.kode || id}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setSuratKeluarList(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'Disetujui & Diterbitkan',
          qr_code: qrUrl,
          tanggal_acc: timestamp,
          kepsek_nama: currentUser?.nama || 'Drs. H. Ahmad Fauzi, M.Pd'
        };
      }
      return s;
    }));
    showToast('Surat Keluar telah disetujui & ditandatangani digital!', 'success');
  };

  const rejectSuratKeluar = (id, alasan = 'Perlu peninjauan redaksi surat.') => {
    setSuratKeluarList(prev => prev.map(s => s.id === id ? { ...s, status: 'Revisi', catatan_revisi: alasan } : s));
    showToast('Surat Keluar dikembalikan untuk revisi.', 'info');
  };

  // Reset to initial dummy data
  const resetToDefault = () => {
    localStorage.clear();
    setSuratMasukList(INITIAL_SURAT_MASUK);
    setSuratKeluarList(INITIAL_SURAT_KELUAR);
    setGuruList(INITIAL_GURU);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentUser(INITIAL_USERS[0]);
    showToast('Data sistem telah di-reset ke nilai bawaan.', 'info');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      login,
      logout,
      switchRole,
      suratMasukList,
      suratKeluarList,
      guruList,
      notifications,
      addSuratMasuk,
      updateSuratMasuk,
      deleteSuratMasuk,
      saveDraftDisposisi,
      approveDisposisiKepsek,
      rejectDisposisiKepsek,
      startGuruTask,
      completeGuruTask,
      addSuratKeluar,
      approveSuratKeluar,
      rejectSuratKeluar,
      whatsAppModal,
      setWhatsAppModal,
      toast,
      showToast,
      resetToDefault
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
