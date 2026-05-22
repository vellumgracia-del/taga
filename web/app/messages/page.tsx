"use client";

import ResponsiveLayout from "@/components/ResponsiveLayout";
import { MessageSquare, ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Messages() {
  const router = useRouter();

  return (
    <ResponsiveLayout>
      <div className="bg-white/90 backdrop-blur-md sticky top-0 z-30 px-4 pt-6 pb-4 shadow-sm border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold font-poppins text-gray-800">Pesan</h1>
      </div>

      <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-taniga-mint text-taniga-emerald rounded-full flex items-center justify-center mb-6 shadow-sm">
          <MessageSquare className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold font-poppins text-gray-800 mb-2">Belum Ada Pesan</h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Anda belum memiliki riwayat percakapan dengan suplier maupun agen pengiriman. Eksplor komoditas dan mulai transaksi Anda!
        </p>
        <Link href="/categories" className="mt-8 bg-taniga-emerald text-white px-8 py-3 rounded-full font-bold hover:bg-taniga-pine transition-colors shadow-lg shadow-taniga-emerald/20">
          Mulai Belanja
        </Link>
      </div>
    </ResponsiveLayout>
  );
}
