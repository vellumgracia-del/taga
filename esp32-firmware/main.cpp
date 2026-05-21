#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

// BACA PERINGATAN INI:
// Pastikan Anda telah menyalin config.example.h menjadi config.h
// dan mengisi nilai variabelnya dengan benar. File config.h sudah
// dikecualikan (diabaikan) oleh .gitignore demi keamanan rahasia.
#include "config.h"

// Contoh pengiriman data simulasi suhu dan koordinat GPS
float currentTemp = 14.5; // derajat Celcius
float currentLat = -6.200000;
float currentLng = 106.816666;

// Deklarasi fungsi
void connectWiFi();
void sendTelemetryData();

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n--- Memulai Inisialisasi Perangkat Taniga IoT ---");
  Serial.print("Device ID: ");
  Serial.println(DEVICE_ID);
  
  connectWiFi();
}

void loop() {
  if(WiFi.status() == WL_CONNECTED) {
    // Simulasi perubahan suhu untuk testing
    currentTemp += 0.2; 
    if (currentTemp > 20.0) currentTemp = 14.0;
    
    sendTelemetryData();
  } else {
    Serial.println("Koneksi Wi-Fi terputus, mencoba menghubungkan ulang...");
    connectWiFi();
  }
  
  // Mengirim data setiap 10 detik
  delay(10000);
}

void connectWiFi() {
  Serial.print("Menghubungkan ke Wi-Fi: ");
  Serial.println(WIFI_SSID);
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWi-Fi Berhasil Terhubung!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void sendTelemetryData() {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Membentuk endpoint URL ke Firebase RTDB
    // Struktur node: telemetry/DEVICE_ID.json
    String url = String("https://") + FIREBASE_HOST + "/telemetry/" + DEVICE_ID + ".json?auth=" + FIREBASE_AUTH;
    
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    
    // Membentuk JSON Payload
    // Kita membutuhkan format seperti: { "lat": -6.20, "lng": 106.81, "temp": 14.5, "timestamp": {".sv": "timestamp"} }
    // Field timestamp menggunakan token ServerValue bawaan Firebase
    String jsonPayload = "{";
    jsonPayload += "\"lat\": " + String(currentLat, 6) + ", ";
    jsonPayload += "\"lng\": " + String(currentLng, 6) + ", ";
    jsonPayload += "\"temp\": " + String(currentTemp, 2) + ", ";
    jsonPayload += "\"timestamp\": {\".sv\": \"timestamp\"}";
    jsonPayload += "}";
    
    Serial.print("Mengirim Telemetry Payload: ");
    Serial.println(jsonPayload);
    
    // Menggunakan metode PATCH (agar meng-update node tanpa menimpa node tetangga)
    // Jika menggunakan HTTP PUT, seluruh konten telemetry/DEVICE_ID akan tertimpa
    int httpResponseCode = http.PATCH(jsonPayload);
    
    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.print("Error saat mengirim HTTP PATCH: ");
      Serial.println(httpResponseCode);
      Serial.println(http.errorToString(httpResponseCode));
    }
    
    http.end();
  }
}
