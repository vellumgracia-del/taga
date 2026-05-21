"use client";

import ResponsiveLayout from "@/components/ResponsiveLayout";
import Auth from "@/components/Auth";
import { useAuthStore } from "@/store/authStore";
import { UserCircle, Store, FileText, Settings, ChevronRight, CheckCircle2, ShieldCheck, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LocationPickerMap = dynamic(() => import("@/components/LocationPickerMap"), { ssr: false });

export default function Account() {
  const { user, role, isLoading } = useAuthStore();
  const [showKycForm, setShowKycForm] = useState(false);
  const [kycLocation, setKycLocation] = useState({ lat: -6.200000, lng: 106.816666 });
  const [kycBusinessName, setKycBusinessName] = useState("");

  if (isLoading) {
    return (
      <ResponsiveLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-10 h-10 border-4 border-taniga-emerald border-t-transparent rounded-full animate-spin"></div>
        </div>
      </ResponsiveLayout>
    );
  }

  if (!user) {
    return (
      <ResponsiveLayout>
        <div className="p-4 md:p-10 max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-poppins text-gray-800">Selamat Datang</h2>
            <p className="text-sm text-gray-500 mt-2">Masuk untuk mengelola pesanan B2B Anda.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <Auth />
          </div>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout>
      {/* Profile Header (Premium) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-taniga-pine to-taniga-emerald rounded-b-[2.5rem] md:rounded-[2.5rem] md:m-4 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="px-6 pt-12 pb-8 md:p-12 relative z-10">
          {role === "supplier" && (
            <Link href="/supplier" className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white flex items-center gap-1 hover:bg-white/30 transition-all shadow-sm border border-white/20">
              Buka Dasbor Toko <ChevronRight className="w-3 h-3" />
            </Link>
          )}
          
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-white/20 shadow-xl">
              <UserCircle className="w-16 h-16 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold font-poppins text-white tracking-tight">{user.displayName || "Pengguna Taniga"}</h2>
              <p className="text-sm text-white/80 mt-1">{user.email}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-taniga-mint text-taniga-pine text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                <ShieldCheck className="w-3 h-3" /> Akun Terverifikasi ({role})
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6 md:space-y-8 -mt-4 relative z-20">
        
        {/* KYC Section */}
        {role === "buyer" && !showKycForm && (
          <div className="bg-white p-5 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                <Store className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-800">Buka Toko Koperasi</h3>
                <p className="text-xs text-gray-500 mt-1">Jadilah suplier dan jual komoditas Anda ke seluruh negeri.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowKycForm(true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-taniga-warning text-white text-sm font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-md shadow-orange-600/20"
            >
              Ajukan KYC
            </button>
          </div>
        )}

        {/* KYC Form */}
        {showKycForm && (
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold font-poppins text-gray-800">Verifikasi Dokumen (KYC)</h3>
                <p className="text-xs text-gray-500 mt-1">Pastikan data sesuai dengan dokumen legal.</p>
              </div>
              <button onClick={() => setShowKycForm(false)} className="text-sm font-semibold text-gray-400 hover:text-gray-800 transition-colors">Batal</button>
            </div>
            
            <form 
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
                const originalText = btn.innerHTML;
                btn.innerHTML = '<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Menyimpan...';
                btn.disabled = true;
                
                try {
                  const { doc, setDoc } = await import("firebase/firestore");
                  const { db } = await import("@/lib/firebase");
                  if (user) {
                    await setDoc(doc(db, "kyc_documents", user.uid), {
                      status: "pending",
                      businessName: kycBusinessName,
                      lat: kycLocation.lat,
                      lng: kycLocation.lng,
                      submittedAt: new Date().toISOString(),
                    });
                    alert("Dokumen KYC berhasil diajukan dan sedang direview oleh Admin Taniga.");
                    setShowKycForm(false);
                  }
                } catch (error) {
                  alert("Gagal mengirim KYC. Pastikan konfigurasi Firebase Anda sudah benar.");
                  console.error(error);
                } finally {
                  btn.innerHTML = originalText;
                  btn.disabled = false;
                }
              }}
            >
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Nama Usaha / Koperasi</label>
                <input 
                  type="text" 
                  value={kycBusinessName}
                  onChange={(e) => setKycBusinessName(e.target.value)}
                  className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-taniga-mint focus:border-taniga-emerald focus:bg-white transition-all" 
                  placeholder="Misal: Koperasi Tani Makmur" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Lokasi Gudang / Lahan (Penjemputan)</label>
                <p className="text-[10px] text-gray-500 mb-2">Tandai lokasi presisi agar tim logistik mudah melakukan penjemputan kargo IoT.</p>
                <LocationPickerMap 
                  initialLat={kycLocation.lat} 
                  initialLng={kycLocation.lng} 
                  onLocationSelect={(lat, lng) => setKycLocation({ lat, lng })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Upload KTP (Wajib)</label>
                  <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:bg-taniga-mint/30 hover:border-taniga-emerald hover:text-taniga-emerald transition-colors cursor-pointer group">
                    <FileText className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">Pilih File PDF/JPG</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Upload NPWP (Opsional)</label>
                  <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:bg-taniga-mint/30 hover:border-taniga-emerald hover:text-taniga-emerald transition-colors cursor-pointer group">
                    <CheckCircle2 className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">Pilih File PDF/JPG</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button type="submit" className="w-full py-3.5 bg-taniga-emerald text-white rounded-xl font-bold text-sm hover:bg-taniga-pine active:scale-95 transition-all shadow-md shadow-taniga-emerald/20 flex items-center justify-center gap-2">
                  Kirim Pengajuan KYC
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Menu List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {[
            { label: "Pesanan Saya", icon: FileText, desc: "Lacak status dan riwayat" },
            { label: "Pengaturan Akun", icon: Settings, desc: "Keamanan dan kata sandi" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 group-hover:bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 transition-colors">
                  <item.icon className="w-6 h-6 text-gray-500 group-hover:text-taniga-emerald transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{item.label}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-taniga-emerald transition-colors transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => {
            useAuthStore.getState().logout();
          }}
          className="w-full py-4 bg-white text-taniga-danger rounded-2xl font-bold text-sm border border-red-100 hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm mb-12"
        >
          Keluar dari Akun
        </button>

        {/* Rekomendasi Produk */}
        <div className="pt-6 border-t border-gray-200/60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold font-poppins text-gray-800">Rekomendasi untuk Anda</h3>
            <Link href="/" className="text-xs font-bold text-taniga-emerald flex items-center hover:text-taniga-pine">
              Lihat Semua <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 1, name: "Bawang Merah Brebes", price: "Rp 35.000", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=400&q=80", rating: 4.8 },
              { id: 2, name: "Apel Fuji Manis Ekspor", price: "Rp 45.000", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=400&q=80", rating: 5.0 },
            ].map((product) => (
              <Link href={`/`} key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="h-32 bg-gray-100 relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-xs md:text-sm text-gray-800 line-clamp-2 min-h-[2rem]">{product.name}</h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold font-poppins text-taniga-pine text-xs md:text-sm">{product.price}</span>
                    <button className="w-7 h-7 bg-taniga-mint text-taniga-emerald rounded-full flex items-center justify-center hover:bg-taniga-emerald hover:text-white transition-colors">
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </ResponsiveLayout>
  );
}
