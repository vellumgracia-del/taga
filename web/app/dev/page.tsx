"use client";

import { Users, Truck, CheckCircle, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const TelemetryMap = dynamic(() => import("@/components/TelemetryMap"), { ssr: false });

export default function DevDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold font-poppins text-taniga-pine">IoT Fleet Management</h2>
          <p className="text-sm text-gray-500">Pemantauan massal perangkat keras di seluruh Indonesia.</p>
        </div>
        <button className="bg-taniga-emerald text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-taniga-pine transition-colors">
          + Daftarkan IoT Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Alat ESP32", value: "142", icon: MapPin, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Sedang Beroperasi (Live)", value: "24", icon: Truck, color: "text-taniga-emerald", bg: "bg-taniga-mint" },
          { label: "Pengajuan KYC (Pending)", value: "7", icon: Users, color: "text-taniga-warning", bg: "bg-orange-100" },
          { label: "Kondisi Normal", value: "100%", icon: CheckCircle, color: "text-taniga-pine", bg: "bg-green-100" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold font-poppins text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800">Peta Sebaran Kargo Aktif</h3>
          <span className="text-xs px-2 py-1 bg-taniga-mint text-taniga-emerald rounded-md font-bold">24 Titik Live</span>
        </div>
        <div className="h-[400px] w-full bg-gray-200 relative">
          {/* Untuk demonstrasi, kita gunakan peta yang sudah ada dengan zoom out */}
          <TelemetryMap lat={-6.20} lng={106.81} />
        </div>
      </div>
    </div>
  );
}
