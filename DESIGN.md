Taniga Design System (TDS)

Versi: 1.0 (Omnichannel & E-Grocery UI Update)

Tema Utama: "Agri-Tech Premium, Clean Corporate, & Modern E-Grocery"

Filosofi: Menggabungkan kemudahan belanja harian (seamless shopping) layaknya Sayurbox di layar Mobile, dengan kecanggihan dasbor analitik IoT dan manajemen toko ala Shopee Seller Center.

1. Palet Warna (Color Palette)

Menggunakan pendekatan monokromatik hijau untuk menjaga identitas Agritech yang segar dan bersih. Hindari penggunaan warna hitam pekat (#000000).

A. Primary Colors (Identitas Brand)

Taniga Emerald (Primary 600): #16A34A (Green 600) -> Warna pahlawan (Hero Color). Digunakan untuk Primary Buttons (seperti tombol "+ Keranjang"), Bottom Navigation aktif, dan garis grafik batas wajar IoT. Kesan: Segar, berteknologi.

Taniga Pine (Primary 900): #14532D (Green 900) -> Digunakan untuk teks judul tebal (Headers) dan elemen yang butuh penekanan korporat. Kesan: Kuat, stabil.

Taniga Mint (Primary 50): #F0FDF4 (Green 50) -> Digunakan untuk background highlight, latar badge status, dan efek hover pada tombol menu.

B. Neutral & Background Colors

Background Base Mobile: #F3F4F6 (Gray 100) -> Latar belakang utama aplikasi agar Card produk yang berwarna putih bisa menonjol (pop-up).

Card Surface: #FFFFFF (White) -> Warna dasar untuk kotak produk, banner, dan kontainer.

Text Body: #475569 (Slate 600) -> Untuk teks paragraf, deskripsi sayur, dan label tabel. Mengurangi kelelahan mata.

C. Semantic Colors (Status & Alerts)

Danger / Heat: #DC2626 (Red 600) -> HANYA digunakan saat suhu IoT naik melebihi batas (18°C), pesanan dibatalkan, atau peringatan saldo kurang.

Warning / Pending: #F59E0B (Amber 500) -> Status pesanan "Perlu Dikirim", atau baterai IoT lemah.

Info: #2563EB (Blue 600) -> Informasi netral, seperti pesanan sedang "Dalam Perjalanan".

2. Tipografi (Typography)

Font Utama (Headers, Harga, & Angka IoT): Poppins.

Karakteristik: Geometris dan bulat. Sangat kuat untuk menampilkan harga grosir (misal: Rp 21.500) dan angka suhu (misal: 14.5°C).

Font Body (Paragraf, Navigasi, Deskripsi): Inter.

Karakteristik: Sangat rapi untuk dibaca dalam ukuran kecil di layar HP.

3. Omnichannel Layout Rules (Aturan Tata Letak)

Aplikasi harus merespons mulus antara ukuran layar di bawah ini menggunakan utilitas Tailwind (md:, lg:).

A. Mobile View (Default / < 768px)

Pola Navigasi: Menggunakan Bottom Navigation Bar tetap di bawah layar (Beranda, Kategori, Keranjang, Pesanan, Akun). Header mengecil or hilang saat di-scroll ke bawah.

Area Sentuh (Touch Targets): Area tappable minimal 44x44px (Standar Aksesibilitas iOS/Android).

Modals: Semua interaksi pop-up (seperti memilih varian berat sayur) HARUS muncul dari bawah layar sebagai Bottom Sheet, bukan kotak di tengah layar.

B. Desktop / Tablet View (>= 768px)

Pola Navigasi: Bottom Navigation disembunyikan, digantikan oleh Sidebar Menu di sisi kiri.

Ruang Kerja (Workspace): Ruang layar dimanfaatkan maksimal. Peta IoT dan Grafik ditampilkan bersebelahan (Split Screen). Keranjang belanja bisa muncul sebagai Side Panel (Laci Samping) di kanan, bukan halaman baru.

4. Komponen UI Spesifik (Feature-Specific UI)

Berdasarkan referensi benchmark aplikasi terkemuka:

A. Dynamic Promo Banner (Style: Sayurbox)

Rasio: 2:1 or 16:9 yang membentang horizontal dengan ujung membulat (rounded-xl).

Interaksi: Dapat digeser (swipeable carousel) dengan indikator titik (dot indicators) di bagian bawah. Banner harus terasa snappy saat digeser di HP.

B. Product Cards (Style: Sayurbox)

Layout: Grid 2 kolom di Mobile, 4-6 kolom di Desktop.

Elemen Kartu:

Foto sayuran besar dengan latar belakang bersih/transparan.

Label "Harga Spesial B2B" or "Diskon Volume" melayang di atas foto.

Judul dua baris maksimal (Truncated).

Harga dicetak tebal dengan font Poppins.

Tombol "+": Tombol bulat warna Taniga Emerald berada mencolok di pojok kanan bawah foto/kartu untuk "1-Click Add to Cart".

C. Menu Akun & "Toko Saya" (Style: Shopee)

Halaman Akun (Default): Berisi profil pengguna, pesanan terakhir, voucher, dan pengaturan.

Toggle Suplier: Di bagian paling atas (Header), terdapat tombol toggle or link bertuliskan "Toko Saya >".

Dashboard Suplier: Ketika toggle diklik, tema berubah sedikit lebih administratif. Menampilkan Grid Menu berbentuk ikon besar: Produk, Pesanan (Belum Bayar, Perlu Dikirim, Dikirim), Keuangan, Performa Toko, dan Pengaturan.

D. Dasbor Pemantauan IoT

Animasi "Live": Gunakan elemen titik kecil (pulsing dot) warna hijau yang berdenyut untuk indikator bahwa data sensor (suhu/GPS) saat ini sedang terhubung dan live.

Area Chart: Grafik suhu tidak menggunakan line biasa, melainkan Area Chart dengan gradasi warna hijau memudar ke bawah transparan. Dilengkapi garis batas merah putus-putus (border-dashed) di suhu 18°C.

5. Micro-Interactions & UX Polish

Pull-to-Refresh: Halaman Beranda dan Pesanan harus mendukung pull-to-refresh (tarik ke bawah untuk muat ulang) pada perangkat touchscreen.

Skeleton Loading: Hindari spinner bulat bawaan saat menunggu data dari Firebase. Gunakan blok abu-abu pudar (bg-gray-200 animate-pulse) yang menyerupai kerangka konten aslinya.

Haptic Feedback Visual: Tombol seperti "+ Keranjang" harus memiliki efek active (skala mengecil scale-95 and warna sedikit menggelap) saat disentuh, memberikan feedback visual yang memuaskan.
