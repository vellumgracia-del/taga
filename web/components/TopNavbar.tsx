"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Bell, MessageCircle, Leaf, Star } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

export default function TopNavbar() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/categories?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      router.push(`/categories?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="hidden md:block sticky top-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Logo & Branding */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-taniga-pine text-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-poppins text-gray-800 tracking-tight">Taniga</h1>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-2xl relative group ml-4">
          <input 
            type="text" 
            placeholder="Cari komoditas, suplier, atau wilayah (tekan Enter)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-gray-50/80 border border-gray-200 text-sm py-3.5 pl-12 pr-4 rounded-full outline-none focus:bg-white focus:ring-4 focus:ring-taniga-mint focus:border-taniga-emerald transition-all"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 group-focus-within:text-taniga-emerald transition-colors" />
          <div className="absolute right-2 top-2">
            <button onClick={handleSearchClick} className="bg-taniga-pine text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-taniga-emerald transition-colors shadow-sm">
              Cari
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/categories" className="mr-2 text-sm font-bold text-gray-600 hover:text-taniga-emerald transition-colors">
            Eksplor
          </Link>
          
          <Link href="/messages" className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-taniga-emerald hover:bg-taniga-mint rounded-full transition-colors relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-taniga-danger rounded-full border-2 border-white"></span>
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-taniga-emerald hover:bg-taniga-mint rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-taniga-danger rounded-full border-2 border-white"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-sm">Notifikasi</h3>
                  <span className="text-[10px] text-taniga-emerald font-bold bg-taniga-mint px-2 py-1 rounded-full">2 Baru</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors bg-blue-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-taniga-emerald text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">Program Subsidi Petani B2B</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Taniga mengadakan program khusus subsidi ongkos kirim untuk pesanan di atas 100 kg. Cek syaratnya!</p>
                        <p className="text-[10px] text-gray-400 mt-1">2 jam yang lalu</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors bg-blue-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">Promo Flash Sale Sayuran</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Harga spesial Pakcoy dan Tomat langsung dari petani hari ini saja. Jangan sampai kehabisan!</p>
                        <p className="text-[10px] text-gray-400 mt-1">5 jam yang lalu</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 text-center border-t border-gray-50 hover:bg-gray-50">
                  <button className="text-xs font-bold text-taniga-emerald w-full py-1">Tandai semua sudah dibaca</button>
                </div>
              </div>
            )}
          </div>
          
          <Link href="/cart" className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-taniga-emerald hover:bg-taniga-mint rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-taniga-emerald text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              3
            </span>
          </Link>
          <div className="w-px h-6 bg-gray-200 mx-2"></div>
          {user ? (
            <Link href="/account" className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-4 rounded-full transition-colors border border-transparent hover:border-gray-200">
              <div className="w-9 h-9 bg-gradient-to-tr from-taniga-emerald to-taniga-pine rounded-full text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {user.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-gray-800 leading-none">{user.displayName || "Pengguna"}</p>
                <p className="text-[10px] text-gray-500 mt-1">Akun Saya</p>
              </div>
            </Link>
          ) : (
            <Link href="/account" className="bg-taniga-emerald text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-taniga-pine shadow-sm shadow-taniga-emerald/20 transition-all active:scale-95">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
