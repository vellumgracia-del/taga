"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X, CheckCircle } from "lucide-react";

interface IoTScannerProps {
  onScanSuccess: (deviceId: string) => void;
  onClose: () => void;
}

export default function IoTScanner({ onScanSuccess, onClose }: IoTScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Gagal mengakses kamera:", err);
        setHasPermission(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Simulasi berhasil scan setelah 3 detik
  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      onScanSuccess("ESP32_TANIGA_001");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex justify-between items-center p-4 bg-black/50 text-white absolute top-0 left-0 right-0 z-10">
        <h3 className="font-bold">Scan Barcode IoT ESP32</h3>
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 relative bg-gray-900 flex items-center justify-center overflow-hidden">
        {hasPermission === false ? (
          <div className="text-white text-center p-6">
            <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Izin kamera ditolak. Harap izinkan akses kamera di browser Anda untuk melakukan pemindaian.</p>
            <button onClick={simulateScan} className="mt-6 px-4 py-2 bg-taniga-emerald rounded-lg font-bold">
              Simulasi Sukses Scan
            </button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            {/* Overlay Scanner UI */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
              <div className="w-64 h-64 border-2 border-taniga-emerald rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-taniga-emerald rounded-tl-xl -translate-x-1 -translate-y-1"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-taniga-emerald rounded-tr-xl translate-x-1 -translate-y-1"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-taniga-emerald rounded-bl-xl -translate-x-1 translate-y-1"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-taniga-emerald rounded-br-xl translate-x-1 translate-y-1"></div>
                
                {/* Laser line animation */}
                <div className="w-full h-0.5 bg-taniga-emerald absolute top-1/2 left-0 shadow-[0_0_8px_2px_rgba(22,163,74,0.8)] animate-bounce"></div>
              </div>
              <p className="text-white mt-6 text-sm font-medium">Arahkan kamera ke barcode alat IoT</p>
              
              {/* Fallback button for demo purposes */}
              <button 
                onClick={simulateScan}
                disabled={isScanning}
                className="mt-8 px-6 py-2.5 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full font-bold text-sm active:scale-95 transition-all"
              >
                {isScanning ? "Memproses..." : "Atau Klik untuk Simulasi"}
              </button>
            </div>
          </>
        )}

        {isScanning && (
          <div className="absolute inset-0 bg-taniga-pine/90 z-20 flex flex-col items-center justify-center text-white">
            <CheckCircle className="w-16 h-16 text-taniga-emerald mb-4 animate-pulse" />
            <h2 className="text-xl font-bold font-poppins">Alat Berhasil Dipasangkan!</h2>
            <p className="text-sm mt-2 opacity-80">Menautkan ID: ESP32_TANIGA_001...</p>
          </div>
        )}
      </div>
    </div>
  );
}
