# Taniga — Product Requirements Document
**Tani & Niaga | B2B Smart Agriculture Supply Chain Platform**

> *"Dari Koperasi ke Supermarket — Transparan, Terlacak, Terpercaya"*
> Mendigitalisasi rantai pasok agrikultur B2B dengan marketplace cerdas, pelacakan IoT real-time, dan sistem escrow terotomasi.

| Field | Detail |
|---|---|
| Nama Produk | Taniga — Tani & Niaga |
| Versi | v1.0.0 |
| Platform | Progressive Web App (PWA) / Responsive Web App |
| Tema Desain | Clean Corporate — Monokromatik Hijau & Putih |
| Kategori | B2B Smart Supply Chain — Agriculture |
| Tanggal | Mei 2026 |

---

## 01. Executive Summary

Taniga adalah platform B2B Smart Supply Chain yang mendigitalisasi rantai pasok agrikultur antara **Koperasi Tani (Supplier)** dan **Supermarket/Restoran (Buyer)**. Sistem menggabungkan marketplace B2B, pelacakan IoT real-time untuk suhu dan lokasi (cold-chain monitoring), serta sistem pembayaran Rekening Bersama (Escrow) yang terotomasi.

**Poin Kunci:**
- 🌿 **Masalah Inti:** Rantai pasok sayur B2B masih manual, tidak transparan, rawan kerugian akibat kerusakan produk tanpa bukti.
- 💡 **Solusi:** Satu platform yang menyatukan transaksi B2B + tracking cold-chain IoT + escrow otomatis — semua real-time.
- 🎯 **Pengguna:** Koperasi Tani (Supplier) dan Supermarket/Restoran (Buyer).
- 📡 **Diferensiasi:** Alat IoT ESP32 milik Taniga dipinjamkan — data suhu & GPS langsung masuk dashboard Buyer.
- 🔐 **Kepercayaan:** Uang aman di escrow, baru cair ke Supplier setelah IoT membuktikan produk tiba dalam kondisi baik.

---

## 02. Latar Belakang & Pernyataan Masalah

### Konteks Industri
Distribusi hasil pertanian skala B2B di Indonesia masih didominasi proses manual. Supermarket memesan sayur via telepon/WhatsApp, pembayaran via transfer tanpa jaminan, dan kondisi produk selama perjalanan tidak terpantau sama sekali. Kedua pihak menanggung risiko yang seharusnya bisa dihindari dengan teknologi.

### Pain Points

#### Sisi Koperasi Tani (Supplier)
- Pembayaran tidak terjamin — buyer bisa menolak kargo tanpa bukti kondisi produk.
- Tidak ada visibilitas order masuk secara terpusat — semua masih lewat chat.
- Jika produk rusak di jalan, tidak ada bukti objektif — sengketa sulit diselesaikan.
- Pencairan dana lambat dan tidak transparan.

#### Sisi Supermarket / Restoran (Buyer)
- Tidak bisa verifikasi kondisi suhu produk selama pengiriman cold-chain.
- Tidak ada tracking GPS — tidak tahu posisi truk.
- Ketika produk tiba dalam kondisi buruk, sulit membuktikan di mana masalah terjadi.
- Proses pengadaan tersebar di banyak saluran komunikasi berbeda.

### Dampak Terukur

| Masalah | Dampak Nyata |
|---|---|
| Tidak ada cold-chain monitoring | ±15–25% produk sayur rusak sebelum tiba ke Buyer |
| Tidak ada escrow | Sengketa pembayaran tidak bisa diselesaikan secara objektif |
| Proses manual via chat | Waktu proses order 3–5x lebih lama dari yang seharusnya |
| Tidak ada data historis | Koperasi tidak bisa optimasi rute dan jadwal pengiriman |

---

## 03. Visi, Misi & Ukuran Keberhasilan

### Visi
> *"Menjadi infrastruktur digital rantai pasok agrikultur B2B yang paling terpercaya di Indonesia — di mana setiap transaksi terjamin, setiap pengiriman terpantau, dan setiap pihak terlindungi."*

### Misi
1. Eliminasi ketidakpastian transaksi B2B sayur dengan sistem escrow terotomasi.
2. Berikan visibilitas penuh rantai dingin kepada Buyer melalui data IoT real-time.
3. Permudah operasional Koperasi dengan manajemen order, katalog, dan dompet digital terpusat.
4. Bangun kepercayaan jangka panjang antara Supplier dan Buyer berbasis data objektif, bukan opini.

### Ukuran Keberhasilan (OKR)

| Target | Cara Ukur |
|---|---|
| Kepercayaan transaksi | Tingkat sengketa order < 2% dalam 6 bulan pertama |
| Kualitas pengiriman | Produk rusak terdeteksi IoT berkurang minimal 40% |
| Efisiensi operasional | Waktu proses order dari pengajuan ke dispatch berkurang 60% |
| Adopsi platform | 50 Koperasi aktif + 200 Buyer terdaftar di bulan ke-6 |
| Performa teknis | Lighthouse Score > 90 untuk Performance & PWA |
| Reliabilitas IoT | Uptime alat IoT > 99% selama masa perjalanan aktif |

---

## 04. User Personas

### 🌾 Pak Darmawan — Ketua Koperasi Tani (Supplier)

**Pain Points:**
- Buyer sering tolak kargo dengan alasan "basi" tanpa bukti
- Kelola 10+ order sekaligus hanya lewat WhatsApp
- Tidak tahu kapan pembayaran benar-benar masuk
- Alat pelacak pengiriman mahal dan susah dipakai

**Kebutuhan Utama:**
- Dashboard order masuk yang jelas dan terorganisir
- Konfirmasi dana aman di escrow sebelum kirim barang
- Pairing alat IoT ke order cukup dengan satu klik
- Laporan pencairan dana yang transparan

**Goal:** Kirim barang dengan tenang karena tahu produk terpantau dan uang terjamin.

---

### 🏬 Bu Sinta — Procurement Manager Supermarket (Buyer)

**Pain Points:**
- Tidak bisa buktikan di mana produk mulai rusak selama transit
- Koordinasi pengadaan tersebar di email, WA, dan telepon
- Truk terlambat tapi tidak bisa dipantau posisinya
- Supplier kadang kirim produk berbeda dari yang dipesan

**Kebutuhan Utama:**
- Live map + grafik suhu pengiriman yang bisa dipantau kapan saja
- Notifikasi otomatis jika suhu cold-chain melebihi batas aman
- Satu platform untuk semua vendor sayur
- Bukti data IoT sebagai dasar klaim sengketa

**Goal:** Pastikan produk tiba segar, tepat waktu, dan ada datanya jika ada masalah.

---

## 05. Arsitektur & Tech Stack

Sistem dibangun dengan arsitektur **Serverless + Microservices ringan** untuk skalabilitas tinggi dan latensi rendah, khususnya untuk streaming data IoT.

### 5A — Frontend (Web Client)

| Layer | Teknologi | Kenapa? |
|---|---|---|
| Framework | React.js (via Vite) | Performa build cepat + HMR. Ekosistem luas untuk komponen dashboard kompleks. |
| Styling | Tailwind CSS | Utility-first CSS untuk desain kustom cepat. Konsistensi visual tanpa framework berat. |
| Komponen UI | Headless UI / Radix UI | Komponen accessible (modal, dropdown) tanpa opini styling — cocok untuk desain korporat. |
| State Management | Zustand | Ringan dan terdesentralisasi. Cocok untuk dashboard kompleks tanpa boilerplate Redux. |
| Charts | Chart.js (react-chartjs-2) | Grafik historis suhu & kelembapan. Performa baik untuk data time-series. |
| Maps | Leaflet.js (react-leaflet) | Live Map Tracking dengan OpenStreetMap. Open-source, tidak butuh API key berbayar. |
| PWA | Workbox | Offline caching, Service Workers, Install to Homescreen. Target Lighthouse > 90. |

### 5B — Backend & Database (Firebase Ecosystem)

| Layer | Teknologi | Kenapa? |
|---|---|---|
| Auth | Firebase Authentication | Email/Password, Google OAuth, OTP HP. Custom Claims untuk otorisasi role. |
| Database Utama | Firebase Firestore | NoSQL untuk data relasional: profil user, katalog produk, transaksi, saldo dompet. |
| IoT Database | Firebase Realtime DB | Latensi super rendah untuk ratusan baris payload JSON per menit dari alat IoT. |
| Backend Logic | Firebase Cloud Functions | Trigger notifikasi bahaya (suhu > 18°C), webhook payment, sinkronisasi IoT. |
| Notifications | Firebase Cloud Messaging | Push notification ke browser/PWA — peringatan suhu kritis langsung ke Buyer. |

### 5C — Integrasi Pihak Ketiga

| Layer | Teknologi | Kenapa? |
|---|---|---|
| Payment / Escrow | Xendit / Midtrans | Generate VA + Split Payment otomatis ke rekening Koperasi setelah escrow release. |
| Push Notif | Firebase Cloud Messaging (FCM) | Alert suhu dan update status order ke semua device terdaftar. |

### 5D — Perangkat Keras IoT

| Komponen | Spesifikasi | Fungsi |
|---|---|---|
| MCU | ESP32 | Bertenaga, mendukung Store & Forward ke SPIFFS saat sinyal hilang. |
| Konektivitas | GSM SIM800L V2 | GPRS langsung ke Firebase RTDB via REST API. Tidak bergantung WiFi. |
| Sensor | DHT22 / SHT31 | Suhu dan kelembapan presisi. SHT31 lebih akurat untuk produk sensitif. |
| GPS | Ublox NEO-6M | Tracking lokasi truk real-time di peta Buyer. |
| Daya | Li-Ion 18650 x2 + BMS | Portabel, tahan 24+ jam. BMS cegah overcharge/discharge. |

### 5E — Alur Sistem

```
ESP32 (IoT Device)  →  GSM SIM800L  →  Firebase Realtime DB (telemetry node)
                                                 ↓
React PWA (Buyer Dashboard)  ←  subscribe()  ←  RTDB live listener

Buyer  →  Checkout  →  Xendit/Midtrans (VA)  →  Cloud Function webhook
                                                          ↓
                                Firestore order.status = PROCESSING
                                + FCM Notification ke Supplier

Supplier  →  IoT Pairing  →  Firestore + RTDB device binding
          →  Dispatch truk

GPS Geofence Trigger  →  Cloud Function  →  Escrow Release API
                                         →  Firestore status = COMPLETED
                                         →  FCM ke Supplier & Buyer
```

---

## 06. User Roles & Fitur Sistem

> Sistem membagi pengguna ke tiga peran utama dengan tampilan dashboard yang menyesuaikan **(Multi-tenant view)**.

### 6A — Fitur Supplier (Koperasi Tani)

| Fitur | Deskripsi | Prioritas |
|---|---|---|
| Manajemen Katalog | CRUD produk: nama, harga grosir harian, stok, foto. | P1 |
| Manajemen Pesanan | Dashboard order masuk per status. Notifikasi saat dana masuk escrow. | P1 |
| IoT Device Pairing | Kaitkan ID ESP32 ke ID Pesanan sebelum truk berangkat — satu klik. | P1 |
| Manajemen Perangkat IoT | Lihat status online/offline dan % baterai seluruh alat yang dipinjamkan. | P1 |
| Dompet & Pencairan | Pending Balance dan Available Balance. Withdraw ke rekening koperasi. | P1 |
| Riwayat Transaksi | Log lengkap semua order + data IoT terlampir. Export ke PDF/CSV. | P2 |
| Profil Koperasi | Halaman publik: nama, lokasi, komoditas unggulan, rating dari Buyer. | P2 |

### 6B — Fitur Buyer (Supermarket / Restoran)

| Fitur | Deskripsi | Prioritas |
|---|---|---|
| B2B Marketplace | Cari produk by kategori, Koperasi, harga grosir, minimum order. | P1 |
| Checkout & Multi-Payment | Bayar via VA, Kartu Kredit, E-Wallet. VA di-generate otomatis. | P1 |
| Live Telemetry Dashboard | Peta GPS live + grafik suhu & kelembapan live + indikator ETA. | P1 |
| Alerting System | Notifikasi pop-up + email merah jika suhu cold-chain melewati threshold. | P1 |
| Penerimaan & Komplain | Validasi kargo selamat ATAU ajukan sengketa dengan bukti log IoT. | P1 |
| Riwayat Pembelian | Semua order historis + data IoT terlampir sebagai bukti legal. | P2 |
| Manajemen Vendor | Daftar Koperasi langganan, rating personal, catatan internal. | P2 |

### 6C — Fitur Admin (Internal Taniga)

| Fitur | Deskripsi | Prioritas |
|---|---|---|
| KYC & Verifikasi | Review dokumen legal Koperasi (NIB, akta) sebelum akun diaktifkan. | P1 |
| Manajemen Alat IoT | Inventaris ESP32: status, lokasi terakhir, riwayat pairing, baterai. | P1 |
| Dispute Resolution | Review log IoT, komunikasi dua pihak, keputusan escrow release/refund. | P1 |
| Platform Analytics | Dashboard GMV, transaksi, komoditas terlaris, distribusi geografis. | P2 |

---

## 07. Alur Kerja Transaksi

### Happy Path
1. **ORDER CREATED** — Buyer checkout. Sistem generate Invoice Xendit/Midtrans. Status: `PAYMENT_PENDING`.
2. **ESCROW FUNDED** — Buyer transfer ke VA. Webhook picu Cloud Function. Status: `PROCESSING`. Supplier dapat notifikasi.
3. **DEVICE PAIRED & DISPATCH** — Supplier muat sayur, nyalakan IoT, pairing di Web App. Truk jalan. Status: `IN_TRANSIT`.
4. **DATA STREAMING** — ESP32 kirim JSON ke RTDB setiap 2 menit. React App Buyer subscribe RTDB secara real-time.
5. **DELIVERY ARRIVED** — GPS deteksi truk masuk geofence Buyer ATAU Buyer klik "Terima Kargo". Status: `DELIVERED`.
6. **ESCROW RELEASED** — Cloud Function cek log RTDB. Suhu aman → API Disbursement ke Supplier dipotong fee platform. Status: `COMPLETED`.

### Dispute Path
1. Buyer klik "Ajukan Sengketa" — produk tiba dalam kondisi rusak.
2. Sistem otomatis **lock Escrow** — dana tidak bisa cair ke Supplier.
3. Admin Taniga terima notifikasi dispute baru.
4. Admin review **log IoT** (grafik suhu, timestamp, koordinat GPS) sebagai bukti objektif.
5. Keputusan: Escrow dilepas ke Supplier (data aman) ATAU refund ke Buyer (terbukti rusak dalam transit).

---

## 08. Struktur Database

### 8A — Firestore (Data Relasional)

| Koleksi | Field Utama |
|---|---|
| `users` | uid, name, role, phone, verified, createdAt, businessName, bankAccount |
| `products` | productId, supplierId, name, category, price, stock, unit, imageUrl, minOrder |
| `orders` | orderId, buyerId, supplierId, items[], totalAmount, status, iotDeviceId, paymentRef |
| `iot_devices` | deviceId, supplierId, status (idle/active/maintenance), batteryLevel, lastSeen |
| `wallets` | supplierId, pendingBalance, availableBalance, bankAccount, withdrawHistory[] |
| `disputes` | disputeId, orderId, buyerId, supplierId, reason, iotEvidence, status, resolution |
| `reviews` | reviewId, orderId, buyerId, supplierId, rating, comment, iotDataSummary |

### 8B — Realtime Database (Data IoT)

```json
telemetry/
  {iotDeviceId}/
    current: {
      lat: -6.2088,
      lng: 106.8456,
      temp: 8.4,
      hum: 85.2,
      batteryPct: 74,
      timestamp: 1748234567
    }
    logs/
      {timestampKey}: { temp, hum, lat, lng }
```

> `current` → ditimpa setiap 2 menit, digunakan untuk peta live & indikator real-time.
> `logs` → append-only, digunakan untuk grafik historis suhu di dashboard Buyer.

---

## 09. Desain Sistem UI/UX

### Filosofi
Taniga menggunakan pendekatan **"Clean Corporate"** — profesional, bersih, mencerminkan kepercayaan B2B. Tidak ada elemen dekoratif yang tidak perlu. Palet monokromatik hijau-putih merepresentasikan kesegaran produk pertanian sekaligus citra korporat yang andal.

### Palet Warna

| Nama | Hex | Peran |
|---|---|---|
| Deep Forest Green | `#1A5C2A` | Warna korporat utama — navbar, sidebar, tombol primary |
| Mid Green | `#2E7D3E` | Aksen kedua — hover state, active menu, secondary button |
| Light Green BG | `#E8F5EA` | Background kartu dan section — segar tanpa ganggu konten |
| White | `#FFFFFF` | Background halaman utama dan konten area |
| Dark Charcoal | `#111827` | Teks utama — kontras tinggi, nyaman dibaca |
| Alert Red | `#B91C1C` | Peringatan suhu kritis IoT — tidak bisa diabaikan |
| Warning Amber | `#92400E` | Suhu mendekati batas — perlu perhatian, belum kritis |

### Tipografi

| Elemen | Font | Ukuran |
|---|---|---|
| Body & UI | Inter / Calibri | 14px Regular, line-height 1.5 |
| Data IoT | JetBrains Mono | 13px — suhu, koordinat, device ID |
| Heading 1 | Inter Bold | 28px — judul halaman dashboard |
| Heading 2 | Inter SemiBold | 22px — judul section dan panel |
| Caption | Inter Muted | 12px — timestamp, label grafik |

### Komponen Kunci

- **Sidebar Navigasi:** Fixed 240px kiri. Icon + label. Active state: background Deep Green + teks putih. Collapsible di mobile.
- **IoT Status Card:** Border kiri 4px berwarna (hijau=aman, merah=bahaya, abu=offline). Tampilkan suhu, kelembapan, GPS, baterai dalam satu card.
- **Live Temperature Chart:** Area chart hijau transparan. Garis threshold merah horizontal di 18°C. Titik anomali otomatis diberi marker merah.
- **Order Status Badge:** Pill-shaped — abu (Pending), biru (Processing), kuning (In Transit), hijau (Completed), merah (Dispute).
- **Escrow Progress Bar:** 4 langkah visual yang bergerak seiring status order — selalu terlihat di halaman detail order.
- **Alert Toast:** Muncul di pojok kanan atas saat suhu lewat threshold. Klik langsung ke detail telemetry order terkait.

### Halaman Utama per Peran

| Peran | Halaman |
|---|---|
| Supplier | Dashboard order masuk · Katalog produk · Pairing IoT · Status alat · Dompet |
| Buyer | Marketplace · Keranjang · Live telemetry dashboard · Riwayat · Vendor |
| Admin | Platform analytics · Antrian KYC · Inventaris IoT · Panel dispute |

---

## 10. Non-Functional Requirements

### 10.1 Offline Tolerance — Store & Forward
ESP32 **wajib** menyimpan data suhu ke SPIFFS/SD Card saat kehilangan sinyal GPRS. Setelah sinyal pulih, bulk upload berurutan dari timestamp tertua.

- Buffer lokal: maksimal 24 jam data
- Buyer UI: tampilkan segmen "Data Gap" dengan warna berbeda jika jeda upload > 10 menit
- Data tidak boleh hilang — ini bukti legal cold-chain

### 10.2 Security & Auth
- **Firebase Security Rules:** Supplier A tidak bisa baca/modifikasi data Supplier B. Ditest dengan Firebase Emulator Suite.
- **IoT Node Security:** RTDB node hanya bisa ditulis oleh device dengan token enkripsi unik per alat.
- **Custom Claims:** Role disimpan di JWT Firebase, divalidasi di setiap Cloud Function.
- **Escrow Lock:** Order `IN_TRANSIT` tidak bisa dimodifikasi dari sisi manapun — hanya Cloud Function.

### 10.3 PWA Performance

| Aspek | Target |
|---|---|
| Lighthouse Score | > 90 untuk Performance, PWA, Accessibility |
| Format Gambar | WebP — hemat bandwidth hingga 30% |
| Offline Mode | Halaman utama + order aktif tetap bisa diakses tanpa internet |
| Time to Interactive | < 3 detik di koneksi 4G standar |
| Install to Homescreen | PWA manifest dikonfigurasi — bisa install seperti native app |

### 10.4 Hardware Efficiency (IoT)
- Kirim data tiap 2 menit → mode **Deep Sleep** → hemat baterai hingga 60%
- Target ketahanan: **24+ jam** perjalanan non-stop
- **OTA (Over-The-Air) firmware update** via Firebase — tidak perlu ambil fisik alat dari lapangan

### 10.5 Reliability & SLA

| Aspek | SLA / Target |
|---|---|
| Firebase RTDB Uptime | 99.95% (SLA Google) |
| Cloud Functions | Retry otomatis untuk webhook payment |
| Escrow Release | Maks 30 detik dari trigger geofence ke Available Balance Supplier |
| Alert Notifikasi | FCM push notification < 5 detik setelah threshold terdeteksi |

---

## 11. Model Bisnis

| Sumber | Detail |
|---|---|
| Platform Fee | 1.5–2.5% dipotong otomatis dari setiap escrow yang berhasil direlease |
| Sewa Perangkat IoT | Rp 15.000–25.000 per trip tergantung jarak — alat milik Taniga |
| Subscription Premium | Supplier Premium: analytics lanjutan + prioritas listing. Buyer Enterprise: API integrasi ERP. |
| Data Insights | Laporan agregat tren harga komoditas untuk instansi pemerintah & lembaga riset |

**Kenapa model ini kuat:**
- Fee dipotong hanya saat transaksi berhasil — insentif Taniga aligned dengan kesuksesan kedua pihak
- IoT sebagai revenue stream sekaligus diferensiasi — kompetitor tidak bisa replikasi tanpa infrastruktur hardware
- Subscription B2B cenderung sticky — churn rate rendah setelah onboarding

---

## 12. Analisis Kompetitor

| Kompetitor | Gap yang Ditinggalkan |
|---|---|
| TaniHub / TaniFund | Ada marketplace B2B, tapi tidak ada IoT cold-chain monitoring + escrow terotomasi |
| Sayurbox | Fokus B2C, bukan B2B — tidak ada fitur Koperasi sebagai Supplier terstruktur |
| Kedeka / Pasarnow | Ada logistik sayur, tapi tidak ada integrasi sensor suhu + GPS dalam satu platform |
| SAP Agri / Oracle | Enterprise, terlalu besar dan mahal untuk Koperasi kecil-menengah Indonesia |

**Keunggulan Taniga:**
- Satu-satunya platform yang integrasikan **marketplace B2B + IoT cold-chain + escrow otomatis** dalam satu produk
- Alat IoT adalah milik Taniga — bukan bergantung hardware pihak ketiga
- Data IoT jadi **bukti objektif sengketa** — tidak ada platform lain yang menawarkan ini
- Dibangun khusus untuk skala Koperasi Indonesia

---

## 13. Timeline & Pembagian Tim

### Timeline 12 Minggu

| Fase | Yang Dikerjakan |
|---|---|
| Minggu 1–2 | Setup project (Firebase, Vite+React, Zustand). Desain database schema. Wireframe semua halaman. |
| Minggu 3–4 | Autentikasi Firebase (multi-role). Halaman marketplace Buyer. Katalog produk Supplier. |
| Minggu 5–6 | Flow checkout + integrasi Xendit/Midtrans (sandbox). Sistem escrow & webhook Cloud Function. |
| Minggu 7–8 | Dashboard IoT Buyer: live map Leaflet, grafik suhu Chart.js, subscribe RTDB. Pairing IoT Supplier. |
| Minggu 9–10 | Firmware ESP32: sensor DHT22, GPS, GPRS SIM800L, Store & Forward ke SPIFFS. |
| Minggu 11 | Dompet Supplier, pencairan dana, dispute panel Admin, notifikasi FCM. |
| Minggu 12 | PWA config (Workbox), testing end-to-end, Lighthouse audit, persiapan demo. |

### Pembagian Tim

| Peran | Tanggung Jawab |
|---|---|
| Frontend Dev (1–2) | React PWA, Zustand, Chart.js, Leaflet, integrasi Firebase RTDB listener, UI dashboard |
| Backend Dev (1) | Firebase Cloud Functions, Security Rules, integrasi Xendit/Midtrans, Firestore schema |
| IoT Engineer (1) | Firmware ESP32, wiring sensor + GPS + SIM800L, Store & Forward, OTA update |
| UI/UX Designer (1) | Desain sistem, prototype Figma, panduan warna & tipografi, review usability |

---

## 14. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Sinyal GPRS hilang di jalan | Store & Forward ke SPIFFS — data disimpan lokal, upload batch saat sinyal pulih |
| Baterai IoT habis sebelum tiba | Deep Sleep mode + 18650 x2 untuk 24+ jam. Alert baterai < 20% ke Supplier |
| Supplier tidak mau adopsi platform | Onboarding dibantu tim lapangan. Alat IoT dipinjamkan gratis di periode awal |
| Buyer ragu dengan data IoT | Sertifikasi akurasi sensor ditampilkan. Data write-only dari device — tidak bisa dimanipulasi |
| Firebase outage | Firestore offline persistence + Cloud Functions retry policy otomatis |
| Sengketa data IoT tidak konklusif | Admin akses raw log + timestamp. Bisa minta foto fisik sebagai bukti pendukung |
| Firmware ESP32 molor | MVP bisa demo dengan simulator (data dummy dari script Node.js) — hardware paralel dikembangkan |

---

## Ringkasan Teknis

```
Platform   : B2B Smart Supply Chain Agriculture
             Marketplace + IoT Cold-Chain + Escrow Otomatis

Frontend   : React.js (Vite) + Tailwind CSS + Zustand
             Chart.js + Leaflet.js + Workbox (PWA)

Backend    : Firebase Auth + Firestore + Realtime DB
             Cloud Functions (Node.js) + FCM

IoT HW     : ESP32 + DHT22/SHT31 + GPS NEO-6M
             GSM SIM800L + Li-Ion 18650 x2 + BMS

Payment    : Xendit / Midtrans
             Virtual Account + Escrow + Auto Disbursement

Desain     : Clean Corporate — Monokromatik Hijau & Putih
             #1A5C2A (Primary) · #FFFFFF (Base)
             Inter/Calibri (UI) · JetBrains Mono (Data IoT)
```