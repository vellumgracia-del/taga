Product Requirements Document
Project Name: Taniga (Tani & Niaga)
Version: 1.0 (User Journey, Toko Saya, AI Prompts & IoT Firmware Config)
Platform: Progressive Web App (PWA) / Fully Responsive Web (Mobile, Tablet, Desktop)
Theme: Clean Corporate (Monokromatik Hijau & Putih - terinspirasi UI modern E-Grocery & Enterprise Dashboards)
1. Executive Summary
Taniga adalah platform B2B Smart Supply Chain yang mendigitalisasi rantai pasok agrikultur antara Koperasi Tani (Suplier) dan Supermarket/Restoran (Buyer). Sistem ini menggabungkan marketplace B2B yang adaptif di segala layar, fitur komunikasi langsung (Chat), pelacakan IoT (Internet of Things) secara real-time, sistem pembayaran Rekening Bersama (Escrow), serta panel kontrol Developer untuk pengawasan operasional teknis, keamanan data, dan manajemen konten promo.
2. Arsitektur & Tech Stack Lengkap
Sistem dibangun dengan arsitektur Serverless yang tangguh, memanfaatkan framework full-stack modern untuk keamanan tipe data (type-safety) dan performa maksimal lintas perangkat (Cross-Device).
A. Front-End & Core Framework (Web Client)
Core Framework: Next.js (App Router) dengan TypeScript.
Alasan: Next.js memberikan performa Server-Side Rendering (SSR) agar katalog B2B dimuat seketika dan SEO-friendly. TypeScript sangat krusial untuk mencegah bug (memastikan format data angka suhu IoT dan nominal uang Escrow selalu valid).
Styling & UI Kit: Tailwind CSS. Menggunakan pendekatan responsif (Breakpoint md:, lg:, xl:) untuk memastikan transisi tata letak yang mulus dari layar HP (Bottom Navigation) ke layar Desktop lebar (Sidebar Navigation & Data Tables).
State Management: Zustand (ringan dan terintegrasi baik dengan ekosistem React/Next.js).
Data Visualization: Chart.js & Leaflet.js (dioptimalkan untuk sentuhan di HP dan tampilan grid resolusi tinggi di Desktop, diload secara dinamis / dynamic import).
PWA Capabilities: Library next-pwa (berbasis Workbox) untuk memberikan pengalaman instalasi layaknya aplikasi Native Android/iOS/Windows Desktop dan fitur dukungan offline.
B. Back-End & Database (Firebase & Next.js Ecosystem)
API & Webhook Handling: Next.js API Routes (Route Handlers). Sangat aman untuk menyembunyikan Secret Key dari Xendit/Midtrans dan memproses otorisasi pembayaran.
Authentication (Alur Login): Firebase Auth.
Mendukung login via Email & Password serta Google OAuth (SSO).
Konsep Default: Setiap pendaftar baru secara default akan mendapatkan Custom Claim role: buyer. Jika lolos KYC, claim diperbarui menjadi role: supplier.
Primary Database: Firebase Firestore (Profil, Katalog Produk, Pesanan, Saldo, Data Promo/Banner).
Real-time Engine (IoT & Chat): Firebase Realtime Database (RTDB). Menangkap data IoT berkecepatan tinggi DAN memfasilitasi fitur Live Chat.
Background Tasks Logic: Firebase Cloud Functions (Proses berat di latar belakang seperti validasi KYC otomatis & push notification peringatan IoT).

C. Integrasi Pihak Ketiga & Hardware (IoT Edge)
Payment Gateway: Midtrans (Sistem Escrow / Split Payment).
Push Notifications: Firebase Cloud Messaging (FCM).
Hardware IoT: ESP32 + SIM800L + Sensor Suhu (SHT31) + GPS.
Manajemen Firmware IoT: Kode C++/Arduino dipisah dari repositori web dan menggunakan manajemen variabel lingkungan (seperti config.h) untuk mencegah kebocoran URL Firebase atau kunci API.

3. User Roles & Alur Transisi (User Journey)
Konsep platform ini adalah ekosistem terbuka di mana setiap pengguna baru adalah Pembeli, namun memiliki jalur (funnel) untuk meningkatkan akunnya menjadi Penjual.

A. Fitur Buyer (Supermarket / Restoran) - Akses Default
Setiap akun yang baru login otomatis mendapatkan akses ke fitur ini:
Omnichannel B2B Marketplace: Berbelanja instan di Mobile or Desktop. Menampilkan Dynamic Banner Slider, kategori, dan katalog produk.
Live B2B Chat & Telemetry: Mengobrol dengan Suplier dan melacak pesanan aktif melalui Peta GPS dan Grafik Suhu.
Pengajuan KYC (Upgrade ke Penjual): Di dalam menu navigasi bawah "Akun", terdapat halaman profil pengguna. Di sana ada bagian "Buka Toko Koperasi". Buyer dapat mengisi formulir pengajuan (KYC Form):
Nama Usaha / Koperasi.
Upload Foto KTP Penanggung Jawab (Wajib).
Upload NPWP (Opsional untuk saat ini).
Menunggu persetujuan Developer/Admin. Selama menunggu, pengguna tetap bisa berbelanja sebagai Buyer.

B. Fitur Suplier (Dasbor "Toko Saya") - Akses Terverifikasi
Jika dokumen KYC telah disetujui, maka di sudut kiri atas halaman "Akun" akan muncul tombol/ toggle "Toko Saya >" (Gaya navigasi mirip marketplace Shopee). Mengklik toggle ini akan mengalihkan pengguna ke Dashboard Supplier yang berisi menu-menu operasional:
Produk: Menu untuk menambah produk baru, mengunggah foto, serta mengubah detail harga grosir, stok harian, dan variasi komoditas.
Pesanan (Manajemen Alur & IoT): Terbagi menjadi 3 tab status utama:
Belum Dibayar: Pesanan masuk namun Buyer belum melunasi Virtual Account.
Perlu Dikirim: Buyer sudah bayar (dana masuk Escrow). Di tahap inilah Suplier menyiapkan sayur ke truk. [KRUSIAL] Pada pesanan ini terdapat tombol "Kirim Kargo". Saat diklik, kamera HP akan terbuka untuk melakukan Scan Barcode ID Perangkat IoT (ESP32).
Dikirim: Setelah IoT berhasil di-scan dan ditautkan, pesanan pindah ke tab ini. Sensor IoT akan mulai mengirimkan data suhu dan GPS secara live.
Keuangan: Dasbor financial koperasi. Menampilkan:
Dana Pending (Uang Escrow yang tertahan karena truk masih di perjalanan).
Saldo Available (Dana yang bisa dicairkan).
Tombol "Tarik Dana" ke rekening bank koperasi yang terdaftar.
Performa Toko & Promosi: * Performa: Statistik penjualan dan rating (SEO).
Promosi: Fitur agar Suplier bisa ikut serta dalam kampanye promosi platform (diskon khusus koperasi).
Pengaturan Toko & Preview:
Pengaturan: Mengubah nama, deskripsi koperasi, jam operasional, dan spanduk (banner) etalase toko.
Kunjungi Toko: Tombol di bagian atas halaman untuk membuka Preview (pratinjau) tampilan toko dari sudut pandang Buyer.

C. Fitur Developer / System Admin (/dev)
Akses eksklusif yang dioptimalkan untuk Desktop/Tablet bagi operator sistem.
Verifikasi KYC (Gatekeeper): Panel khusus untuk me-review pengajuan buka toko (KTP/Nama Usaha). Mengklik "Approve" otomatis mengaktifkan fitur "Toko Saya" bagi akun pengguna tersebut.
Monitoring Perangkat IoT (Device Fleet Management): Memantau seluruh perangkat keras ESP32 dan mendeteksi anomali/kerusakan.
Manajemen Konten & Promo (CMS Banner): Portal untuk mengatur jadwal, gambar, dan URL klik dari Slider Promo di beranda platform.
Pusat Resolusi (Dispute Management) & Database Override: Penengah sengketa transaksi dengan akses raw data suhu IoT.

4. Penataan Layout Responsif (Responsive Design Rules)
Aplikasi akan bereaksi terhadap ukuran layar (breakpoints Tailwind).

4.1. Tampilan Mobile (Lebar Layar < 768px)
Header: Logo di tengah, Ikon Notifikasi & Chat di kanan, Dropdown Lokasi di bawahnya.
Navigasi Utama: Menggunakan Bottom Navigation Bar dengan 5 ikon (Beranda, Kategori, Keranjang, Pesanan, Akun) yang mudah dijangkau ibu jari.
Halaman Akun: Profil pengguna. Jika status role adalah supplier, pojok kiri atas header akan memiliki tautan "Toko Saya >".
Layout Konten (Beranda):
Search Bar (Sticky saat di-scroll).
Banner Promo Slider: (Rasio 16:9 atau 2:1), otomatis bergeser (auto-play) dan bisa di-swipe dengan jari.
Kategori Cepat: Ikon bulat horizontal.
Product Grid: Kartu produk berjejer 2 kolom (grid-cols-2).
Interaksi Khusus: Mendukung fitur Pull-to-Refresh dan menggunakan Bottom Sheet Modals untuk pop-up.

4.2. Tampilan Desktop / Tablet (Lebar Layar >= 768px)
Navigasi Utama: Menggunakan Sidebar Navigation tetap (fixed) di sisi kiri layar dengan menu yang diperluas.
Header: Terdapat Search Bar raksasa di tengah, profil user, dan notifikasi di sudut kanan atas.
Layout Konten (Beranda): Banner Promo ditampilkan dalam bentuk Grid or Wide Carousel yang membentang luas. Product Grid lebarnya 4-6 kolom.
IoT Dashboard: Layar terbagi (Split View), menampilkan peta (Leaflet) berdampingan dengan grafik (Chart.js) dan panel metrik pesanan dalam satu layar penuh.

5. Batasan Akses, Privasi & Keamanan (Data Isolation)
Taniga menjamin keamanan dan privasi tingkat korporator (Enterprise-grade Data Isolation).
Isolasi Keranjang Belanja (Cart Isolation): Akun A tidak akan pernah bisa membaca, melihat, atau memodifikasi keranjang belanja milik Akun B.
Privasi Transaksi & Riwayat: Data pesanan, riwayat negosiasi (chat), dan alamat bersifat pribadi mutlak antara Buyer, Suplier terkait, dan Developer.
Keamanan Dompet & Saldo: Akses terhadap koleksi wallets diblokir sepenuhnya untuk entitas luar. Tarik dana (withdraw) hanya bisa ditujukan ke rekening bank yang disetujui saat KYC.
Proteksi Akses /dev: URL Developer Panel dikunci ganda menggunakan Middleware Next.js (hanya terbuka untuk Custom Claim dev: true).

6. Struktur Database Inti
A. Firestore (Data Aplikasi)
users -> {uid} -> role: "buyer" | "supplier" | "dev", name, email, authProvider
kyc_documents -> {uid} -> businessName, idCardUrl (wajib), npwpUrl (opsional), status: "PENDING|APPROVED|REJECTED", submittedAt
products -> {productId} -> Katalog Sayur (Hanya bisa di-create jika uid di users berstatus supplier)
orders -> {orderId} -> Data Pesanan (Memiliki field orderStatus: UNPAID, TO_SHIP, SHIPPED, COMPLETED)
promos -> {promoId} -> Koleksi Banner Promo

B. Realtime Database (Data Berkecepatan Tinggi)
telemetry (Node IoT RTDB) -> {iotDeviceId} -> { lat, lng, temp, timestamp }
chats (Node Pesan/Chat) -> {orderId_or_roomId}
