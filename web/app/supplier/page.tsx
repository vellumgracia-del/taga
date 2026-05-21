"use client";

import { TrendingUp, Package, Clock, ShieldCheck, Wallet, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SupplierDashboard() {
  const stats = [
    { label: "Total Pendapatan", value: "Rp 12.450.000", icon: Wallet, color: "text-taniga-pine", bg: "bg-taniga-mint" },
    { label: "Pesanan Aktif", value: "8", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Produk Aktif", value: "24", icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
  ];

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto w-full">
      
      {/* Header */}
      <div className="mb-8 hidden md:block">
        <h2 className="text-2xl md:text-3xl font-bold font-poppins text-gray-800">Dasbor Utama</h2>
        <p className="text-sm text-gray-500 mt-1">Pantau performa penjualan Koperasi Tani Makmur.</p>
      </div>

      {/* Info Escrow Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl p-6 md:p-8 mb-8 text-white shadow-lg shadow-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-poppins mb-1">Sistem Escrow Aktif</h3>
            <p className="text-xs md:text-sm text-blue-50 opacity-90 max-w-lg leading-relaxed">Dana hasil penjualan B2B diamankan oleh Taniga. Dana otomatis cair ke saldo Anda saat sistem IoT mendeteksi barang telah tiba di gudang pembeli.</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-white text-blue-600 text-sm font-bold rounded-xl shadow-sm hover:bg-blue-50 transition-colors w-full md:w-auto relative z-10 whitespace-nowrap">
          Tarik Saldo
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-xl md:text-2xl font-bold font-poppins text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Pesanan Terbaru */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="px-5 md:px-6 py-4 md:py-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-base md:text-lg font-bold font-poppins text-gray-800">Pesanan B2B Terbaru</h3>
          <Link href="/supplier/orders" className="text-xs md:text-sm font-bold text-taniga-emerald hover:text-taniga-pine transition-colors flex items-center gap-1">
            Lihat Semua <ChevronRight className="w-4 h-4 hidden md:block" />
          </Link>
        </div>
        
        <div className="p-8 text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-8 h-8 text-gray-300" />
          </div>
          <p className="font-medium text-gray-800 mb-1">Belum ada pesanan baru</p>
          <p className="text-xs">Tunggu pembeli membuat pesanan dari toko Anda.</p>
        </div>
      </div>
      
    </div>
  );
}
