# SIMAS - Sistem Informasi Manajemen Surat & Disposisi Sekolah

Aplikasi web modern **Enterprise Education Management System** untuk tata kelola persuratan dinas sekolah, disposisi digital bertingkat, penandatanganan elektronik tersertifikasi (QR Code Digital Signature), dan pelaporan tugas terintegrasi.

---

## 🚀 Fitur Utama

### 1. Autentikasi & Multi-Role Access
- **Login Terpadu**: Halaman login modern berlatar belakang pendidikan profesional dengan logo sekolah di tengah.
- **Role Redirection**: Pengalihan otomatis sesuai peran:
  - **Admin Tata Usaha (TU)**: `/admin/dashboard`
  - **Kepala Sekolah**: `/kepsek/dashboard`
  - **Guru**: `/guru/dashboard`
- **Akses Pengujian Cepat (1-Klik)**: Tombol instan di halaman login dan menu navbar untuk beralih peran tanpa harus login ulang secara manual.

### 2. Modul Admin / Tata Usaha (TU)
- **Dashboard Statistik**:
  - Kartu ringkasan: Total Surat Masuk, Surat Menunggu Disposisi, Surat Keluar, dan Tugas Guru Belum Selesai.
  - Grafik analitik interaktif Recharts: Tren volume surat per bulan dan status penyelesaian tugas guru.
- **Manajemen Surat Masuk (`/admin/surat-masuk`)**:
  - Tabel dengan status: *Draft TU*, *Menunggu ACC Kepala Sekolah*, *Didisposisikan*, dan *Selesai*.
  - Formulir pendaftaran surat masuk baru (Nomor surat, tanggal, pengirim, perihal, ringkasan isi surat, upload naskah PDF).
  - Modal rincian dokumen, edit surat, dan ganti file PDF.
- **Draft Pengusulan Disposisi (`/admin/draft-disposisi/:id`)**:
  - Layout *split-view*: Sisi kiri pratinjau naskah dinas resmi (KOP surat resmi, nomor, perihal), sisi kanan formulir pengusulan guru penerima tugas dan instruksi awal.
  - Setelah diajukan, status otomatis berubah menjadi **"Menunggu Review Kepala Sekolah"**.
- **Manajemen Surat Keluar (`/admin/surat-keluar`)**:
  - Pembuatan draft naskah dinas keluar (tujuan, perihal, nomor agenda).
  - Pratinjau langsung naskah dinas.

### 3. Modul Kepala Sekolah
- **Pusat Tindakan & Notifikasi**:
  - Panel alert mencolok: *"X Surat Membutuhkan Tindakan"* dengan kartu preview surat masuk dan surat keluar yang siap ditinjau.
- **Pre-ACC Disposition Review (`/kepsek/review-surat/:id`)**:
  - **Sisi Kiri**: Document Viewer beresolusi tinggi dengan kontrol pembesaran (zoom in/out/reset) dan tombol cetak.
  - **Sisi Kanan**: Informasi naskah lengkap dan panel **Draft Penugasan TU** ("Diusulkan Kepada" menampilkan avatar guru, nama, NIP, dan jabatan).
  - **Fitur Ubah Penugasan**: Kepala Sekolah dapat mengganti calon guru penerima tugas (override usulan TU).
  - **Instruksi Khusus Kepala Sekolah**: Textarea arahan kedinasan resmi.
  - **Tombol ACC & TTD (Hijau)**:
    - Menghasilkan QR Code validasi digital sah.
    - Mencatat stempel waktu persetujuan dan tanda tangan digital Kepala Sekolah.
    - Memperbarui status surat menjadi **"Didisposisikan kepada Guru"**.
    - Memunculkan simulasi **WhatsApp Notification Sent** lengkap dengan nomor WA guru dan isi pesan resmi.
  - **Tombol Tolak / Revisi (Merah)**: Mengembalikan naskah ke Admin TU disertai catatan revisi.
- **Review Surat Keluar (`/kepsek/review-surat-keluar/:id`)**:
  - Peninjauan redaksi dan pengesahan TTD elektronik naskah dinas keluar.

### 4. Modul Dewan Guru
- **Dashboard Guru**:
  - Tiga kartu status utama: **Tugas Baru**, **Tugas Diproses**, dan **Tugas Selesai**.
- **Tugas Saya (`/guru/tugas`)**:
  - Tabel penugasan berkolom: *Surat | Perihal | Dari | Deadline | Status*.
- **Lembar Kerja & Detail Tugas (`/guru/tugas/:id`)**:
  - Dokumen surat resmi yang telah dibubuhi stempel QR Code tanda tangan Kepala Sekolah.
  - Rincian instruksi kedinasan.
  - Tombol alur kerja: **Mulai Proses**, **Upload Bukti Kegiatan**, dan **Selesaikan Tugas**.

### 5. Arsip Digital & Verifikasi Publik
- **Arsip Digital (`/arsip`)**:
  - Repositori seluruh surat masuk dan keluar sekolah.
  - Filter multi-kategori: Berdasarkan Tahun, Jenis Surat (Masuk/Keluar), Status, dan Pengirim/Tujuan.
  - Pencarian kata kunci instan dan fitur Ekspor CSV.
- **Verifikasi QR Digital Publik (`/verify/:kode`)**:
  - Halaman publik tanpa otentikasi login untuk memverifikasi keabsahan surat.
  - Menampilkan badge **VALID & TERVERIFIKASI**, nomor surat, tanggal ACC, identitas Kepala Sekolah, dan sertifikat kriptografi tanda tangan elektronik.

---

## 🛠️ Panduan Menjalankan Sistem

1. Pastikan server Vite aktif:
   ```bash
   npm run dev
   ```
2. Buka browser dan akses:
   - **Aplikasi Utama**: [http://localhost:5173/](http://localhost:5173/)
   - **Halaman Verifikasi QR Publik**: [http://localhost:5173/verify/SM-2026-002](http://localhost:5173/verify/SM-2026-002)

### Kredensial Akun Bawaan (Default):
| Role | Email | Password |
|---|---|---|
| Admin Tata Usaha (TU) | `admin@smkn1.sch.id` | `password123` |
| Kepala Sekolah | `kepsek@smkn1.sch.id` | `password123` |
| Guru (Penerima Tugas) | `budi@smkn1.sch.id` | `password123` |
