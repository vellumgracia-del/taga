"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, Thermometer, Truck, Navigation, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ref, onValue, off } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import Link from "next/link";

// Leaflet map dan ChartJS harus di-load secara dinamis tanpa SSR karena menggunakan API window
const TelemetryMap = dynamic(() => import("@/components/TelemetryMap"), { ssr: false });
const TelemetryChart = dynamic(() => import("@/components/TelemetryChart"), { ssr: false });

export default function TrackingPage() {
  const DEVICE_ID = "ESP32_TANIGA_001"; // Simulasi untuk pesanan saat ini

  // State untuk Realtime DB
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [currentLat, setCurrentLat] = useState<number>(-6.200000);
  const [currentLng, setCurrentLng] = useState<number>(106.816666);
  const [lastUpdate, setLastUpdate] = useState<string>("Menunggu...");
  const [isLive, setIsLive] = useState(false);

  // State Historis untuk Chart
  const [tempHistory, setTempHistory] = useState<number[]>([]);
  const [timeHistory, setTimeHistory] = useState<string[]>([]);

  useEffect(() => {
    const telemetryRef = ref(rtdb, `telemetry/${DEVICE_ID}`);
    
    const unsubscribe = onValue(telemetryRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        setCurrentTemp(data.temp);
        setCurrentLat(data.lat);
        setCurrentLng(data.lng);
        setIsLive(true);
        
        // Format Waktu
        const date = new Date(data.timestamp || Date.now());
        const timeStr = date.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastUpdate(timeStr);

        // Update historis chart (Maksimal 10 titik terakhir)
        setTempHistory(prev => {
          const newArr = [...prev, data.temp];
          if (newArr.length > 10) return newArr.slice(newArr.length - 10);
          return newArr;
        });
        setTimeHistory(prev => {
          const newArr = [...prev, timeStr];
          if (newArr.length > 10) return newArr.slice(newArr.length - 10);
          return newArr;
        });

      } else {
        setIsLive(false);
      }
    });

    return () => {
      off(telemetryRef);
    };
  }, []);

  const isWarning = currentTemp >= 18;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 md:bg-gray-100">
      <div className="flex-1 w-full max-w-5xl mx-auto bg-gray-50 min-h-screen shadow-sm md:border-x md:border-gray-200 pb-10">
        
        {/* Header */}
        <div className="bg-white px-4 pt-4 pb-4 shadow-sm sticky top-0 z-50 flex items-center gap-3">
          <Link href="/supplier/orders" className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-lg font-bold font-poppins text-gray-800">Pelacakan Live Kargo</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-taniga-emerald animate-pulse' : 'bg-gray-400'}`}></span>
              <span className="text-xs text-gray-500 font-medium">
                {isLive ? 'Terhubung (ESP32)' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          
          {/* Card Info Utama */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-bold text-gray-800">Menuju Gudang Pusat</span>
              </div>
              <span className="text-xs text-gray-500">Update: {lastUpdate}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl border ${isWarning ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className={`w-4 h-4 ${isWarning ? 'text-taniga-danger animate-pulse' : 'text-taniga-emerald'}`} />
                  <span className="text-xs font-semibold text-gray-600">Suhu Kargo</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className={`text-2xl font-bold font-poppins ${isWarning ? 'text-taniga-danger' : 'text-taniga-pine'}`}>
                    {currentTemp.toFixed(1)}°C
                  </span>
                </div>
                {isWarning && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-taniga-danger font-bold">
                    <AlertTriangle className="w-3 h-3" /> Warning (Lebih 18°C)
                  </div>
                )}
              </div>
              
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-gray-600">Koordinat</span>
                </div>
                <div className="text-xs font-mono font-bold text-blue-800 break-words mt-1">
                  {currentLat.toFixed(4)},<br/>{currentLng.toFixed(4)}
                </div>
              </div>
            </div>
          </div>

          {/* Map View */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-64 flex flex-col">
            <h3 className="text-sm font-bold text-gray-800 mb-3 font-poppins">Peta GPS Real-time</h3>
            <div className="flex-1 relative">
              <TelemetryMap lat={currentLat} lng={currentLng} />
            </div>
          </div>

          {/* Chart View */}
          <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 h-72 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm md:text-base font-bold text-gray-800 font-poppins">Grafik Fluktuasi Suhu Kargo</h3>
              <span className="text-[10px] md:text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">10 Menit Terakhir</span>
            </div>
            <div className="flex-1 relative">
              <TelemetryChart temperatureData={tempHistory} timeLabels={timeHistory} />
            </div>
          </div>

          {/* Logistics Timeline */}
          <div className="bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 font-poppins mb-6">Status Logistik & Escrow</h3>
            <div className="relative pl-3 md:pl-4 border-l-2 border-taniga-emerald/20 space-y-8">
              
              <div className="relative">
                <div className="absolute -left-[27px] md:-left-[31px] top-0 w-6 h-6 md:w-8 md:h-8 bg-taniga-pine text-white rounded-full flex items-center justify-center shadow-md ring-4 ring-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-gray-800">Pesanan Dikemas (Suplier)</h4>
                  <p className="text-xs text-gray-500 mt-1">Sawi Hijau Segar Premium (50 kg) telah dimuat ke dalam truk berpendingin.</p>
                  <span className="text-[10px] text-gray-400 block mt-1">20 Mei 2026, 08:30 WIB</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] md:-left-[31px] top-0 w-6 h-6 md:w-8 md:h-8 bg-taniga-emerald text-white rounded-full flex items-center justify-center shadow-md shadow-taniga-emerald/30 ring-4 ring-white animate-bounce">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-taniga-pine">Dalam Perjalanan</h4>
                  <p className="text-xs text-gray-500 mt-1">Terdeteksi pergerakan menuju Gudang Pusat Pembeli via Tol Trans Jawa. Sistem pendingin IoT aktif memantau suhu.</p>
                  <span className="text-[10px] text-taniga-emerald font-semibold block mt-1">Sedang Berlangsung...</span>
                </div>
              </div>

              <div className="relative opacity-40">
                <div className="absolute -left-[27px] md:-left-[31px] top-0 w-6 h-6 md:w-8 md:h-8 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center ring-4 ring-white">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-gray-800">Tiba di Gudang Pembeli</h4>
                  <p className="text-xs text-gray-500 mt-1">IoT mendeteksi kargo tiba. Pembayaran otomatis diteruskan (Escrow Cair) ke Suplier.</p>
                  <span className="text-[10px] text-gray-400 block mt-1">Menunggu Kedatangan</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
