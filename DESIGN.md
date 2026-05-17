# Taniga Design System (TDS)

**Versi:** 1.0  
**Tema Utama:** "Agri-Tech Premium & Clean Corporate"  
**Filosofi:** Menghilangkan kesan tradisional dan kotor dari industri pertanian, mengubahnya menjadi dasbor data yang transparan, modern, kredibel, dan sangat mudah dibaca (*glanceable*).

---

## 1. Palet Warna (Color Palette)

Alih-alih menggunakan warna "hijau daun" standar yang generik, Taniga menggunakan warna **"Hijau Zamrud" (Emerald)** dan **"Hijau Pinus" (Pine)** untuk memberikan kesan teknologi finansial (*Fintech*) dan kestabilan.

### A. Primary Colors (Identitas Brand)
*   **Taniga Pine (Primary 900):** `#14532D`
    *   *Penggunaan:* Teks judul tebal (Headers), Sidebar aktif, dan elemen navigasi utama.
    *   *Kesan:* Kuat, korporat.
*   **Taniga Emerald (Primary 600):** `#059669`
    *   *Penggunaan:* Primary Buttons, garis grafik batas wajar, dan ikon aktif.
    *   *Kesan:* Segar, berteknologi.
*   **Taniga Mint (Primary 100):** `#D1FAE5`
    *   *Penggunaan:* Background highlight, badge status, dan efek hover pada tombol.

### B. Neutral & Background Colors
> [!IMPORTANT]
> Sangat penting untuk tidak menggunakan warna hitam pekat `#000000`.

*   **Background Base:** `#F8FAFC` (Slate 50)
    *   *Penggunaan:* Latar belakang aplikasi utama. Memberikan kesan *clean* dan lega (tidak menyilaukan mata).
*   **Card Surface:** `#FFFFFF` (White)
    *   *Penggunaan:* Warna dasar untuk kotak dashboard dan kontainer dengan sedikit bayangan (*shadow*).
*   **Text Body:** `#475569` (Slate 600)
    *   *Penggunaan:* Untuk teks paragraf biasa, label data. Lebih lembut dari hitam pekat, mengurangi kelelahan mata.

### C. Semantic Colors (Status & Alerts)
Sangat penting untuk indikator sistem IoT.

*   **Danger / Heat (Alert):** `#DC2626` (Red 600)
    *   *Penggunaan:* HANYA saat suhu IoT naik melebihi batas atau transaksi gagal. Latar belakang badge menggunakan `#FEE2E2`.
*   **Warning:** `#D97706` (Amber 600)
    *   *Penggunaan:* Estimasi pengiriman terlambat atau baterai IoT lemah.
*   **Safe / Success:** `#059669` (Emerald)
    *   *Penggunaan:* Berbagi warna dengan Primary, suhu aman, dana cair.

---

## 2. Tipografi (Typography)

Pemilihan font adalah kunci untuk menghindari tampilan "seperti template gratis".

*   **Font Utama (Headers & Angka Metrik):** *Plus Jakarta Sans* atau *Poppins*.
    *   *Karakteristik:* Geometris, lebar, modern. Memberikan kesan kokoh untuk angka suhu (misal: `14.5°C`) dan nominal uang di Escrow.
    *   *Penggunaan:* H1, H2, H3, dan Angka utama pada Dashboard Card.
*   **Font Body (Paragraf & Data Tabel):** *Inter*.
    *   *Karakteristik:* Netral, sangat rapi untuk dibaca dalam ukuran kecil.
    *   *Penggunaan:* Label tabel, deskripsi pesanan, navigasi sidebar, dan tooltip grafik.

---

## 3. Komponen UI Inti (Core Components)

### A. Cards & Containers (Gaya "Glass & Elevated")
Jangan gunakan garis batas (*border*) hitam tebal. Gunakan teknik *subtle shadow* (bayangan lembut).

*   **Radius Sudut (Border Radius):** `16px` (`rounded-2xl` di Tailwind) untuk kontainer besar, `8px` (`rounded-lg`) untuk input dan button.
*   **Bayangan (Shadow):** `0 4px 20px rgba(20, 83, 45, 0.05)`. Bayangan ini tidak berwarna abu-abu, melainkan mengambil sedikit warna hijau gelap agar menyatu dengan identitas, menciptakan efek kedalaman yang elegan.
*   **Borders:** Jika menggunakan border, gunakan garis sangat tipis `1px` dengan warna `#E2E8F0` (Slate 200).

### B. Buttons (Tombol Interaksi)
*   **Primary Button:** Latar belakang Taniga Emerald, teks Putih, tanpa border. Saat di-hover, tombol sedikit terangkat (`translate-y: -2px`) dengan penambahan bayangan hijau.
*   **Secondary/Ghost Button:** Latar belakang transparan, teks Taniga Emerald, dengan border tipis.
*   **Danger Button:** Digunakan untuk aksi destruktif (misal: "Batalkan Pesanan"), menggunakan warna merah redup, **BUKAN** merah terang yang mencolok mata.

---

## 4. Pola Interaksi & Layout Dasar

### A. Konsep "Dashboard Glanceability" (Tampak Sekilas)
*   **Aturan 3 Detik:** Pengguna harus bisa memahami status kargo mereka dalam 3 detik. Letakkan 3 metrik paling penting (Suhu, Kelembapan, Estimasi Tiba) di baris paling atas, persis di bawah judul halaman. Gunakan ukuran font raksasa (misal: `48px` tebal) untuk angkanya.

### B. Peta & Grafik Terintegrasi (Split View)
*   **Kiri (60% layar):** Peta GPS interaktif. Peta tidak boleh menampilkan terlalu banyak label (seperti restoran atau SPBU yang tidak relevan). Gunakan style peta "Muted" atau "Light" agar rute dan ikon truk logistik (berwarna hijau) menjadi satu-satunya hal yang menonjol.
*   **Kanan (40% layar):** Grafik area suhu. Hindari grafik garis biasa. Gunakan *Area Chart* dengan arsiran gradasi hijau di bawah garisnya, dan garis merah putus-putus tebal sebagai penanda "Batas Kritis 18°C".

### C. Micro-Interactions (Human Touch)
Agar web tidak terasa kaku seperti robot:
*   **Pulsing Dots:** Untuk indikator "Live IoT" atau "Truk Sedang Berjalan", gunakan elemen titik kecil (*dot*) warna hijau yang berdenyut lambat (*slow pulse animation*) untuk menandakan sistem sedang bernapas (menarik data).
*   **Skeleton Loading:** Jangan gunakan *Spinner* bulat biasa saat memuat grafik. Gunakan *Skeleton Screen* (blok abu-abu pudar) yang membentuk kerangka grafik, agar transisi saat data masuk terasa lebih halus.

---

## 5. Aset Ikonografi (Iconography)

*   **Style:** *Line icons* (garis luar, bukan blok pekat). Gunakan library seperti *Phosphor Icons* atau *Lucide* (hindari *FontAwesome solid* yang terlalu umum).
*   **Ketebalan Garis (Stroke Width):** Konsisten di `2px`.
*   **Implementasi:** Ikon menu sidebar berwarna abu-abu redup, namun ketika aktif berubah menjadi Taniga Pine (Hijau gelap) dengan ketebalan (*font-weight*) meningkat.
