"use client";

import ResponsiveLayout from "@/components/ResponsiveLayout";
import { MessageCircle, MapPin, Truck, CheckCircle2, AlertCircle, Thermometer, Box, FileText } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import TelemetryChart from "@/components/TelemetryChart";
import { useState, useEffect } from "react";

const LocationPickerMap = dynamic(() => import("@/components/LocationPickerMap"), { ssr: false });

export default function Orders() {
  const [temperatureData, setTemperatureData] = useState<number[]>([18, 17, 19, 21, 20, 18, 16]);
  const [timeLabels, setTimeLabels] = useState<string[]>(["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]);

  // Simulasi real-time update telemetri
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperatureData(prev => {
        const newData = [...prev.slice(1)];
        const lastTemp = newData[newData.length - 1];
        // Fluktuasi suhu random antara -1.5 hingga +1.5
        const newTemp = Number((lastTemp + (Math.random() * 3 - 1.5)).toFixed(1));
        return [...newData, newTemp];
      });
      
      setTimeLabels(prev => {
        const lastTime = prev[prev.length - 1];
        const [hours, minutes] = lastTime.split(":").map(Number);
        let newHours = hours + 1;
        if (newHours >= 24) newHours = 0;
        return [...prev.slice(1), `${newHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`];
      });
    }, 5000); // Update setiap 5 detik untuk demo

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveLayout>
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 pt-6 pb-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold font-poppins text-gray-800">Pelacakan Pesanan</h1>
        <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
          Sedang Dikirim
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-6 bg-gray-50/50 min-h-screen pb-24">
        
        {/* Order Info & B2B Chat */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
              <span className="font-mono">#INV-2026-8890</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>Hari ini, 09:45 WIB</span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 font-poppins">Gudang Koperasi Tani Makmur</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
              <Truck className="w-4 h-4" /> Pengiriman Reguler (Pick-up Truk Pendingin)
            </p>
          </div>
          
          <button className="w-full md:w-auto px-6 py-3 bg-taniga-pine text-white rounded-xl font-bold text-sm shadow-lg shadow-taniga-pine/20 hover:bg-green-900 transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" /> Chat Suplier
          </button>
        </div>

        {/* Live GPS Map */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Live GPS Tracking</h3>
              <p className="text-[10px] text-gray-500">Akurasi tinggi via IoT GPS</p>
            </div>
          </div>
          <div className="h-48 md:h-64 w-full bg-gray-100 relative pointer-events-none opacity-80">
            {/* Map Mockup - Kita gunakan komponen map yang sudah ada dan di-disable interaksinya jika memungkinkan, atau sekadar menampilkannya */}
            <LocationPickerMap defaultPosition={[-6.2088, 106.8456]} onLocationSelect={() => {}} />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent z-[400]"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-lg z-[401] flex items-center gap-3">
              <div className="w-10 h-10 bg-taniga-emerald/10 text-taniga-emerald rounded-full flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Truk B-1234-XYZ</p>
                <p className="text-[10px] text-gray-500">Berjarak 2.4 km dari lokasi Anda</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Telemetry IoT */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Suhu Kargo IoT</h3>
                <p className="text-[10px] text-gray-500">Pembaruan real-time</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Suhu Saat Ini</p>
              <p className={`font-bold font-poppins text-lg ${temperatureData[temperatureData.length - 1] > 18 ? "text-red-500" : "text-taniga-emerald"}`}>
                {temperatureData[temperatureData.length - 1]}°C
              </p>
            </div>
          </div>
          <div className="p-4 h-48 md:h-64">
            <TelemetryChart temperatureData={temperatureData} timeLabels={timeLabels} />
          </div>
          <div className="px-4 pb-4">
            <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700 leading-relaxed">
                Sensor suhu aktif. Suhu kargo sempat mencapai batas peringatan (18°C+). Notifikasi peringatan telah dikirim otomatis ke suplier.
              </p>
            </div>
          </div>
        </div>

        {/* Rincian Produk */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center">
              <Box className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-gray-800 text-sm">Isi Muatan (3 Item)</h3>
          </div>
          <div className="p-4 space-y-4">
            {[
              { name: "Pakcoy Hidroponik Segar Premium", qty: "50 kg", img: "https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=150&q=80" },
              { name: "Tomat Ceri Manis Premium", qty: "20 kg", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80" },
              { name: "Pisang Cavendish Organik", qty: "30 sisir", img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=150&q=80" }
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-12 h-12 rounded-xl border border-gray-100 overflow-hidden relative shrink-0">
                  <Image src={item.img} alt={item.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-gray-800">{item.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Jumlah: <span className="font-bold text-gray-700">{item.qty}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ResponsiveLayout>
  );
}
