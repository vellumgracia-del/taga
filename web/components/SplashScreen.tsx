"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Mengecek apakah splash screen sudah ditampilkan di sesi ini
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (hasSeenSplash) {
      setShow(false);
      return;
    }

    // Jika belum, tampilkan selama 2.5 detik
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-taniga-pine flex flex-col items-center justify-center animate-out fade-out duration-700 delay-[2000ms] fill-mode-forwards">
      <div className="relative flex flex-col items-center animate-in zoom-in-95 duration-1000">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-16 bg-taniga-emerald text-white rounded-2xl flex items-center justify-center shadow-lg shadow-taniga-emerald/40 animate-pulse">
            <Leaf className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold font-poppins text-white tracking-tight">Taniga</h1>
        </div>
        <p className="text-taniga-mint text-xs font-medium tracking-wide mt-2 opacity-90">Kesegaran tani terjamin teknologi</p>
      </div>
    </div>
  );
}
