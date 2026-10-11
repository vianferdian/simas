export const INITIAL_USERS = [
  {
    id: 'usr-1',
    nama: 'Siti Rahmawati, S.Kom',
    email: 'admin@smkn1.sch.id',
    password: 'password123',
    role: 'admin', // Admin TU
    jabatan: 'Koordinator Tata Usaha & Kearsipan',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    noHp: '0812-9876-5401'
  },
  {
    id: 'usr-2',
    nama: 'Drs. H. Ahmad Fauzi, M.Pd',
    email: 'kepsek@smkn1.sch.id',
    password: 'password123',
    role: 'kepsek', // Kepala Sekolah
    nip: '19710815 199703 1 004',
    jabatan: 'Kepala Sekolah SMKN 1 Unggul',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    noHp: '0811-2345-6789'
  },
  {
    id: 'usr-3',
    nama: 'Budi Santoso, S.Pd',
    email: 'budi@smkn1.sch.id',
    password: 'password123',
    role: 'guru', // Guru
    guruId: 'g-1',
    nip: '19820514 200801 1 007',
    jabatan: 'Guru Matematika & Pembina OSIS',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    noHp: '0812-3456-7890'
  },
  {
    id: 'usr-4',
    nama: 'Dewi Lestari, S.Pd',
    email: 'dewi@smkn1.sch.id',
    password: 'password123',
    role: 'guru',
    guruId: 'g-2',
    nip: '19860322 201001 2 015',
    jabatan: 'Guru Bahasa Inggris & Koordinator Kurikulum',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    noHp: '0813-9876-5432'
  },
  {
    id: 'usr-5',
    nama: 'Hendra Wijaya, M.Kom',
    email: 'hendra@smkn1.sch.id',
    password: 'password123',
    role: 'guru',
    guruId: 'g-3',
    nip: '19901105 201502 1 003',
    jabatan: 'Guru Rekayasa Perangkat Lunak',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    noHp: '0857-1122-3344'
  }
];

export const INITIAL_GURU = [
  {
    id: 'g-1',
    nama: 'Budi Santoso, S.Pd',
    nip: '19820514 200801 1 007',
    jabatan: 'Guru Matematika',
    unitKerja: 'Kurikulum & Kesiswaan',
    noHp: '0812-3456-7890',
    email: 'budi@smkn1.sch.id',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bebanTugasSaatIni: 2
  },
  {
    id: 'g-2',
    nama: 'Dewi Lestari, S.Pd',
    nip: '19860322 201001 2 015',
    jabatan: 'Guru Bahasa Inggris',
    unitKerja: 'Hubungan Industri & Kerjasama',
    noHp: '0813-9876-5432',
    email: 'dewi@smkn1.sch.id',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    bebanTugasSaatIni: 1
  },
  {
    id: 'g-3',
    nama: 'Hendra Wijaya, M.Kom',
    nip: '19901105 201502 1 003',
    jabatan: 'Guru Rekayasa Perangkat Lunak',
    unitKerja: 'Kepala Lab Komputer',
    noHp: '0857-1122-3344',
    email: 'hendra@smkn1.sch.id',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bebanTugasSaatIni: 0
  },
  {
    id: 'g-4',
    nama: 'Dra. Sri Wahyuni, M.Si',
    nip: '19760411 200212 2 002',
    jabatan: 'Guru Biologi & Pembina UKS',
    unitKerja: 'Sarana & Prasarana',
    noHp: '0821-4455-6677',
    email: 'sri@smkn1.sch.id',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bebanTugasSaatIni: 1
  }
];

export const INITIAL_SURAT_MASUK = [
  {
    id: 'sm-1',
    kode: 'SM-2026-001',
    nomor_surat: '421.3/089/Disdik.Prov/2026',
    tanggal: '2026-10-08',
    pengirim: 'Dinas Pendidikan Provinsi Jawa Barat',
    perihal: 'Undangan Workshop Pembelajaran Berbasis AI dan Kurikulum Digital',
    ringkasan: 'Mengundang 1 (satu) orang guru bidang studi eksakta/komputer untuk menghadiri workshop pengembangan kurikulum digital di Grand Pasundan Convention Center pada tanggal 15-17 Oktober 2026.',
    file: 'Surat_Undangan_Workshop_AI_Disdik.pdf',
    fileSize: '1.4 MB',
    status: 'Menunggu ACC Kepala Sekolah',
    urgensi: 'Penting',
    created_at: '2026-10-09 08:30:00',
    disposisiDraft: {
      guru_id: 'g-1',
      instruksi_tu: 'Diusulkan kepada Budi Santoso, S.Pd selaku Pembina OSIS & Guru Matematika untuk mewakili sekolah.',
      catatan_tu: 'Mohon ACC dan penerbitan Surat Perintah Tugas (SPT).'
    }
  },
  {
    id: 'sm-2',
    kode: 'SM-2026-002',
    nomor_surat: '015/B/PT-TELKOM/X/2026',
    tanggal: '2026-10-06',
    pengirim: 'PT Telkom Indonesia Tbk (Divisi CSR Edukasi)',
    perihal: 'Pemberitahuan Program Beasiswa Sertifikasi Cloud & Magang Industri',
    ringkasan: 'Kerjasama industri untuk penempatan 30 siswa magang program studi RPL dan pelatihan guru produktif di Telkom CorpU Bandung.',
    file: 'Kerjasama_Magang_Telkom_2026.pdf',
    fileSize: '2.8 MB',
    status: 'Didisposisikan',
    urgensi: 'Sangat Penting',
    created_at: '2026-10-06 10:15:00',
    disposisi: {
      guru_id: 'g-3',
      instruksi: 'Tindak lanjuti dengan menyusun jadwal seleksi siswa magang dan koordinasi PIC Telkom sebelum 20 Oktober 2026.',
      tanggal_acc: '2026-10-07 09:20:00',
      kepsek_id: 'usr-2',
      qr_code: 'https://domainsekolah.com/verifikasi/SM-2026-002',
      status_tugas: 'Sedang Diproses',
      deadline: '2026-10-20'
    }
  },
  {
    id: 'sm-3',
    kode: 'SM-2026-003',
    nomor_surat: '800/1420/BKN-REG.III/2026',
    tanggal: '2026-10-05',
    pengirim: 'Badan Kepegawaian Negara Kantor Regional III',
    perihal: 'Pemberkasan Usulan Kenaikan Pangkat Periode Desember 2026',
    ringkasan: 'Instruksi pengumpulan dokumen PAK dan SKP bagi guru PNS/PPPK yang memenuhi syarat kenaikan golongan.',
    file: 'BKN_Reg3_Pemberkasan_KP_2026.pdf',
    fileSize: '890 KB',
    status: 'Selesai',
    urgensi: 'Biasa',
    created_at: '2026-10-05 11:00:00',
    disposisi: {
      guru_id: 'g-2',
      instruksi: 'Sosialisasikan kepada seluruh dewan guru dan inventarisir berkas yang siap diajukan ke dinas.',
      tanggal_acc: '2026-10-05 14:00:00',
      kepsek_id: 'usr-2',
      qr_code: 'https://domainsekolah.com/verifikasi/SM-2026-003',
      status_tugas: 'Selesai',
      deadline: '2026-10-10',
      laporan: 'Seluruh berkas 8 guru telah diverifikasi dan dikirim ke loket kepegawaian Cabang Dinas Wilayah VII.',
      file_bukti: 'Tanda_Terima_Berkas_KenaikanPangkat.pdf',
      tanggal_selesai: '2026-10-09'
    }
  },
  {
    id: 'sm-4',
    kode: 'SM-2026-004',
    nomor_surat: '420/981/Puspresnas/Kemdikbud/2026',
    tanggal: '2026-10-10',
    pengirim: 'Pusat Prestasi Nasional (Kemendikbudristek)',
    perihal: 'Lomba Kompetensi Siswa (LKS) SMK Tingkat Nasional XXXIV',
    ringkasan: 'Petunjuk teknis dan pendaftaran mata lomba Cyber Security, Cloud Computing, dan Web Technologies.',
    file: 'Juknis_LKS_SMK_Nasional_2026.pdf',
    fileSize: '3.5 MB',
    status: 'Menunggu ACC Kepala Sekolah',
    urgensi: 'Sangat Penting',
    created_at: '2026-10-10 14:20:00',
    disposisiDraft: {
      guru_id: 'g-3',
      instruksi_tu: 'Diusulkan Hendra Wijaya, M.Kom sebagai pembimbing kontingen sekolah.',
      catatan_tu: 'Pendaftaran ditutup 25 Oktober 2026.'
    }
  },
  {
    id: 'sm-5',
    kode: 'SM-2026-005',
    nomor_surat: '005/778/Kec.Coblong/2026',
    tanggal: '2026-10-11',
    pengirim: 'Kecamatan Coblong Kota Bandung',
    perihal: 'Permohonan Peminjaman Aula Sekolah untuk Musrenbang Tingkat Kecamatan',
    ringkasan: 'Permohonan penggunaan gedung aula serbaguna pada hari Sabtu, 24 Oktober 2026 untuk musyawarah perencanaan pembangunan.',
    file: 'Surat_Peminjaman_Aula_Kecamatan.pdf',
    fileSize: '650 KB',
    status: 'Draft TU',
    urgensi: 'Biasa',
    created_at: '2026-10-11 09:15:00'
  }
];

export const INITIAL_SURAT_KELUAR = [
  {
    id: 'sk-1',
    kode: 'SK-2026-001',
    nomor_surat: '421.5/112/SMKN1-TU/X/2026',
    tanggal: '2026-10-10',
    tujuan: 'Orang Tua / Wali Murid Kelas X dan XI',
    perihal: 'Pemberitahuan Asesmen Sumatif Tengah Semester (ASTS) Ganjil',
    ringkasan: 'Penyampaian jadwal pelaksanaan ASTS berbasis komputer mandiri serta kewajiban administrasi kehadiran siswa.',
    file: 'Surat_Edaran_ASTS_Ganjil_2026.pdf',
    status: 'Disetujui & Diterbitkan',
    qr_code: 'https://domainsekolah.com/verifikasi/SK-2026-001',
    tanggal_acc: '2026-10-10 11:30:00',
    kepsek_nama: 'Drs. H. Ahmad Fauzi, M.Pd'
  },
  {
    id: 'sk-2',
    kode: 'SK-2026-002',
    nomor_surat: '421.5/113/SMKN1-TU/X/2026',
    tanggal: '2026-10-11',
    tujuan: 'Kepala Balai Besar Penjaminan Mutu Pendidikan (BBPMP)',
    perihal: 'Permohonan Narasumber In-House Training Kurikulum Berbasis Industri',
    ringkasan: 'Permohonan 2 narasumber ahli untuk workshop peningkatan kompetensi guru kejuruan pada 28-29 Oktober 2026.',
    file: 'Surat_Permohonan_Narasumber_BBPMP.pdf',
    status: 'Draft Menunggu TTD',
    qr_code: null,
    tanggal_acc: null
  },
  {
    id: 'sk-3',
    kode: 'SK-2026-003',
    nomor_surat: '421.5/114/SMKN1-TU/X/2026',
    tanggal: '2026-10-11',
    tujuan: 'Pimpinan PT Astra Honda Motor (Learning Center)',
    perihal: 'Konfirmasi Jadwal Kunjungan Industri Siswa Teknik Otomotif',
    ringkasan: 'Konfirmasi kunjungan 72 siswa dan 6 guru pendamping ke pabrik perakitan Cikarang.',
    file: 'Surat_Kunjungan_Industri_AHM.pdf',
    status: 'Draft Menunggu TTD',
    qr_code: null,
    tanggal_acc: null
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'approval',
    title: 'Surat Membutuhkan Review & ACC',
    message: 'Surat Undangan Workshop AI Disdik (No: 421.3/089/Disdik.Prov/2026) telah disiapkan draft disposisinya oleh Admin TU.',
    time: '15 menit yang lalu',
    unread: true,
    targetRole: 'kepsek',
    link: '/kepsek/review-surat/sm-1'
  },
  {
    id: 'notif-2',
    type: 'assignment',
    title: 'Tugas Disposisi Baru',
    message: 'Kepala Sekolah telah menyetujui penugasan Program Kerjasama Magang Telkom untuk Anda.',
    time: '2 jam yang lalu',
    unread: true,
    targetRole: 'guru',
    guruId: 'g-3',
    link: '/guru/tugas/sm-2'
  },
  {
    id: 'notif-3',
    type: 'signature',
    title: 'Surat Keluar Menunggu TTD',
    message: 'Draft Surat Permohonan Narasumber BBPMP siap untuk ditinjau dan ditandatangani secara digital.',
    time: '4 jam yang lalu',
    unread: true,
    targetRole: 'kepsek',
    link: '/kepsek/review-surat-keluar/sk-2'
  }
];

export const MONTHLY_STATS = [
  { bulan: 'Mei', masuk: 24, keluar: 18, disposisi: 22 },
  { bulan: 'Jun', masuk: 18, keluar: 14, disposisi: 17 },
  { bulan: 'Jul', masuk: 38, keluar: 32, disposisi: 35 },
  { bulan: 'Agu', masuk: 45, keluar: 28, disposisi: 42 },
  { bulan: 'Sep', masuk: 52, keluar: 39, disposisi: 48 },
  { bulan: 'Okt', masuk: 31, keluar: 22, disposisi: 29 },
];
