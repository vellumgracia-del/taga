"use client";

import ResponsiveLayout from "@/components/ResponsiveLayout";
import { ShoppingCart, Trash2, ChevronRight, ShieldCheck, MapPin, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import dynamic from "next/dynamic";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const LocationPickerMap = dynamic(() => import("@/components/LocationPickerMap"), { ssr: false });

export default function Cart() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [addressData, setAddressData] = useState({ name: "", phone: "", address: "", lat: -6.200000, lng: 106.816666 });
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);

  useEffect(() => {
    async function loadAddress() {
      if (!user) {
        setIsLoadingAddress(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().address) {
          setAddressData(userDoc.data().address);
          setIsAddressSaved(true);
        }
      } catch (error) {
        console.error("Gagal memuat alamat:", error);
      } finally {
        setIsLoadingAddress(false);
      }
    }
    loadAddress();
  }, [user]);

  const handleSaveAddress = async () => {
    if (!user) {
      alert("Anda harus login untuk menyimpan alamat.");
      return;
    }
    try {
      await setDoc(doc(db, "users", user.uid), {
        address: addressData
      }, { merge: true });
      setIsAddressSaved(true);
    } catch (error) {
      console.error("Gagal menyimpan alamat:", error);
      alert("Gagal menyimpan alamat ke database.");
    }
  };

  const cartItems = [
    { id: 1, name: "Sawi Hijau Segar Premium", price: "Rp 12.000", qty: 50, unit: "kg", image: "https://images.unsplash.com/photo-1622381373515-d1ce4999f7d2?auto=format&fit=crop&w=150&q=80", supplier: "Koperasi Tani Makmur" },
    { id: 2, name: "Tomat Merah Super Grade A", price: "Rp 18.000", qty: 20, unit: "kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80", supplier: "Koperasi Tani Makmur" },
  ];

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push('/supplier/orders');
    }, 1500);
  };

  return (
    <ResponsiveLayout>
      {/* Mobile Header */}
      <div className="md:hidden bg-white/90 backdrop-blur-md px-4 pt-4 pb-3 shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <h2 className="text-xl font-bold font-poppins text-taniga-pine">Keranjang Belanja</h2>
      </div>

      <div className="p-4 md:p-8">
        <div className="hidden md:flex items-center gap-2 mb-8 text-sm text-gray-500">
          <span>Beranda</span> <ChevronRight className="w-4 h-4" /> <span className="font-bold text-gray-800">Keranjang</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Left Column - Items */}
          <div className="w-full lg:w-2/3 space-y-4">
            <h1 className="hidden md:block text-2xl font-bold font-poppins text-gray-800 mb-6">Keranjang Belanja</h1>
            
            {cartItems.length > 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header Koperasi */}
                <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-taniga-emerald rounded border-gray-300 focus:ring-taniga-emerald" defaultChecked />
                    <span className="font-bold text-gray-800 text-sm">Koperasi Tani Makmur</span>
                  </div>
                  <span className="text-[10px] bg-taniga-mint text-taniga-pine font-bold px-2 py-1 rounded uppercase tracking-wider">Suplier B2B</span>
                </div>
                
                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-5 flex gap-4 bg-white hover:bg-gray-50/50 transition-colors">
                      <div className="pt-2">
                        <input type="checkbox" className="w-4 h-4 text-taniga-emerald rounded border-gray-300 focus:ring-taniga-emerald" defaultChecked />
                      </div>
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-sm md:text-base text-gray-800">{item.name}</h4>
                          <p className="text-xs text-taniga-emerald font-bold font-poppins mt-1">{item.price}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <button className="text-gray-400 hover:text-taniga-danger transition-colors flex items-center gap-1 text-xs">
                            <Trash2 className="w-4 h-4" /> <span className="hidden md:inline">Hapus</span>
                          </button>
                          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                            <button className="w-7 h-7 flex items-center justify-center text-gray-500 font-bold hover:bg-gray-100 rounded-lg">-</button>
                            <span className="text-sm font-semibold w-8 text-center">{item.qty} {item.unit}</span>
                            <button className="w-7 h-7 flex items-center justify-center text-taniga-emerald font-bold hover:bg-taniga-mint rounded-lg">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-gray-500 bg-white rounded-3xl border border-gray-100">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Keranjang belanja kosong.</p>
              </div>
            )}
          </div>

          {/* Right Column - Summary */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-1/3 lg:sticky lg:top-28 space-y-4">
              
              {/* Buyer Verification Form */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-taniga-emerald" />
                  <h3 className="font-bold text-gray-800">Alamat & Kontak Pengiriman</h3>
                </div>
                <div className="p-5 space-y-4">
                  {isLoadingAddress ? (
                    <div className="text-center py-4 text-xs text-gray-500">Memuat data alamat...</div>
                  ) : isAddressSaved ? (
                    <div className="bg-taniga-mint/30 p-4 rounded-xl border border-taniga-emerald/20 relative">
                      <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsAddressSaved(false)}>
                        <span className="text-xs font-bold text-taniga-emerald hover:text-taniga-pine">Ubah</span>
                      </div>
                      <h4 className="font-bold text-gray-800 text-sm">{addressData.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{addressData.phone}</p>
                      <p className="text-xs text-gray-500 mt-2">{addressData.address}</p>
                      <div className="mt-3 flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 w-max px-2 py-1 rounded-md">
                        <Navigation className="w-3 h-3" /> GPS Tersimpan: {addressData.lat.toFixed(4)}, {addressData.lng.toFixed(4)}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Nama Penerima</label>
                        <input 
                          type="text" 
                          value={addressData.name}
                          onChange={(e) => setAddressData({...addressData, name: e.target.value})}
                          className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-taniga-emerald"
                          placeholder="Misal: Budi / Resto Budi"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Nomor Handphone (Aktif)</label>
                        <input 
                          type="text" 
                          value={addressData.phone}
                          onChange={(e) => setAddressData({...addressData, phone: e.target.value})}
                          className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-taniga-emerald"
                          placeholder="081234567890"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Alamat Lengkap</label>
                        <textarea 
                          value={addressData.address}
                          onChange={(e) => setAddressData({...addressData, address: e.target.value})}
                          className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-taniga-emerald resize-none h-20"
                          placeholder="Nama Jalan, Gedung, RT/RW, Kota"
                        ></textarea>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Tandai Peta Pengiriman</label>
                        <LocationPickerMap 
                          initialLat={addressData.lat} 
                          initialLng={addressData.lng} 
                          onLocationSelect={(lat, lng) => setAddressData({ ...addressData, lat, lng })}
                        />
                      </div>
                      <button 
                        onClick={handleSaveAddress}
                        disabled={!addressData.name || !addressData.phone || !addressData.address}
                        className="w-full py-3 bg-gray-900 text-white text-xs font-bold rounded-lg disabled:opacity-50 hover:bg-black transition-colors"
                      >
                        Simpan Alamat ke Profil
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800">Ringkasan Belanja</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Harga (70 kg)</span>
                    <span className="font-medium">Rp 960.000</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Asuransi Kargo</span>
                    <span className="font-medium">Rp 15.000</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Biaya Escrow</span>
                    <span className="font-medium">Rp 5.000</span>
                  </div>
                  <div className="pt-4 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">Total Pembayaran</span>
                      <span className="text-xl font-bold font-poppins text-taniga-pine">Rp 980.000</span>
                    </div>
                    <div className="bg-blue-50 text-blue-700 text-[10px] px-3 py-2 rounded-lg flex items-start gap-2 mb-4">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <p>Dana Anda aman di <strong>Escrow Taniga</strong>. Dana baru diteruskan ke Suplier setelah IoT mengonfirmasi kedatangan barang.</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={isProcessing || !isAddressSaved}
                    className="w-full bg-taniga-emerald text-white py-3.5 rounded-xl font-bold hover:bg-taniga-pine active:scale-95 transition-all shadow-md shadow-taniga-emerald/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-taniga-emerald disabled:active:scale-100"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Memproses...
                      </>
                    ) : !isAddressSaved ? (
                      "Isi Alamat Dahulu"
                    ) : (
                      "Checkout Pembayaran"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </ResponsiveLayout>
  );
}
