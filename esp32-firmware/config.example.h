#ifndef CONFIG_H
#define CONFIG_H

// ==========================================
// KONFIGURASI JARINGAN (GSM / Wi-Fi)
// ==========================================

// Jika menggunakan modul GSM (SIM800L)
const char* APN_GSM      = "internet"; // Ganti dengan APN provider (contoh: telkomsel, indosatgprs)
const char* GPRS_USER    = "";
const char* GPRS_PASS    = "";

// Jika menggunakan Wi-Fi (Untuk fallback / testing)
const char* WIFI_SSID     = "NAMA_WIFI_ANDA";
const char* WIFI_PASSWORD = "PASSWORD_WIFI_ANDA";

// ==========================================
// KONFIGURASI FIREBASE REALTIME DATABASE
// ==========================================

// URL Host Firebase Realtime Database (tanpa https:// atau karakter '/' di akhir)
const char* FIREBASE_HOST = "proyek-taniga-default-rtdb.firebaseio.com";

// Firebase Database Secret (Legacy) atau Service Account Key
const char* FIREBASE_AUTH = "KUNCI_RAHASIA_FIREBASE_ANDA";

// ==========================================
// KONFIGURASI IDENTITAS PERANGKAT (IoT)
// ==========================================

// ID Unik Perangkat (Dipasangkan melalui Barcode Scan pada Web App)
const char* DEVICE_ID     = "ESP32_TANIGA_001";

#endif // CONFIG_H
