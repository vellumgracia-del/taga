"use client";

import { useState } from "react";
import { Package, Truck, CheckCircle2, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import IoTScanner from "@/components/IoTScanner";

export default function SupplierOrders() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"unpaid" | "toship" | "shipped">("toship");
  const [showScanner, setShowScanner] = useState(false);
  const [pairedDeviceId, setPairedDeviceId] = useState<string | null>(null);

  const handleScanSuccess = (deviceId: string) => {
    setTimeout(() => {
      setPairedDeviceId(deviceId);
      setShowScanner(false);
      setActiveTab("shipped"); // Pindah ke tab dikirim setelah scan
    }, 1500); // Jeda visual sukses
  };

  return (
    <div className="bg-white min-h-[calc(100vh-64px)]">
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab("unpaid")}
          className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors ${activeTab === "unpaid" ? "border-taniga-emerald text-taniga-emerald" : "border-transparent text-gray-500"}`}
        >
          Belum Bayar
        </button>
        <button 
          onClick={() => setActiveTab("toship")}
          className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors ${activeTab === "toship" ? "border-taniga-emerald text-taniga-emerald" : "border-transparent text-gray-500"}`}
        >
          Perlu Dikirim
        </button>
        <button 
          onClick={() => setActiveTab("shipped")}
          className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors ${activeTab === "shipped" ? "border-taniga-emerald text-taniga-emerald" : "border-transparent text-gray-500"}`}
        >
          Dikirim
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 bg-gray-50 min-h-[500px]">
        {activeTab === "toship" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-taniga-mint rounded-full flex items-center justify-center text-taniga-emerald">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">INV/2026/05/20/001</p>
                    <h4 className="text-sm font-bold text-gray-800">Supermarket Segar 88</h4>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">Siap Kirim</span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Sawi Hijau Segar (50 kg)</span>
                  <span className="font-semibold text-gray-800">Rp 600.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tomat Merah (20 kg)</span>
                  <span className="font-semibold text-gray-800">Rp 360.000</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div>
                  <span className="block text-xs text-gray-500">Total Harga</span>
                  <span className="block text-base font-bold font-poppins text-taniga-pine">Rp 960.000</span>
                </div>
                <button 
                  onClick={() => setShowScanner(true)}
                  className="px-4 py-2 bg-taniga-emerald text-white rounded-lg text-sm font-bold shadow-md hover:bg-taniga-pine active:scale-95 transition-all flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  Kirim Kargo
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipped" && (
          <div className="space-y-4">
            {pairedDeviceId ? (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-taniga-emerald/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-taniga-emerald text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                  Sedang Dipantau IoT
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-taniga-emerald border border-green-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Kargo Dalam Perjalanan</h4>
                    <p className="text-xs text-gray-500">INV/2026/05/20/001</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">ID Perangkat:</span>
                    <span className="text-xs font-mono font-bold text-gray-800 bg-gray-200 px-2 py-0.5 rounded">{pairedDeviceId}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1.5 rounded-md border border-blue-100">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Mengirim Telemetri (Suhu & GPS) secara real-time
                  </div>
                </div>

                <button 
                  onClick={() => router.push('/tracking/ESP32_TANIGA_001')}
                  className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Lihat Live Tracking
                </button>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-gray-500">Belum ada pesanan yang sedang dikirim.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "unpaid" && (
          <div className="text-center py-10">
            <p className="text-sm text-gray-500">Tidak ada pesanan menunggu pembayaran.</p>
          </div>
        )}
      </div>

      {/* Komponen Kamera Scanner */}
      {showScanner && (
        <IoTScanner 
          onClose={() => setShowScanner(false)} 
          onScanSuccess={handleScanSuccess} 
        />
      )}
    </div>
  );
}
