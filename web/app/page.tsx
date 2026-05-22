"use client";

import ResponsiveLayout from "@/components/ResponsiveLayout";
import { Search, Plus, MapPin, ChevronRight, Star, Bell, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sanityClient, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { DUMMY_PRODUCTS as products } from "@/lib/dummyData";

export default function Home() {
  const router = useRouter();
  const [heroData, setHeroData] = useState<any>(null);
  const [promoData, setPromoData] = useState<any[]>([]);
  const [displayProducts, setDisplayProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch Hero Banner
    sanityClient.fetch(`*[_type == "heroBanner"][0]`).then((data) => {
      if (data) setHeroData(data);
    }).catch(console.error);

    // Fetch Promos (Contoh jika ada CMS Sanity type promo, atau array kosong)
    sanityClient.fetch(`*[_type == "promoBanner"][0...3]`).then((data) => {
      if (data && data.length > 0) {
        setPromoData(data);
      } else {
        // Fallback Promo Dummy jika CMS belum siap
        setPromoData([
          { id: 1, title: "Diskon 50% Bawang Merah", image: "https://images.unsplash.com/photo-1559103524-814cb2091bf2?auto=format&fit=crop&w=400&q=80" },
          { id: 2, title: "Gratis Ongkir Pulau Jawa", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80" }
        ]);
      }
    }).catch(console.error);

    // Acak urutan produk saat komponen dimuat (refresh)
    setDisplayProducts([...products].sort(() => 0.5 - Math.random()));
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/categories?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const bannerImg = heroData?.image ? urlFor(heroData.image).url() : "https://images.unsplash.com/photo-1595858117765-5c1fa186064c?auto=format&fit=crop&w=1200&q=80";
  const badgeText = heroData?.badge || "Panen Raya 2026";
  const titleText = heroData?.title || "Pasokan Langsung dari <span class='text-taniga-mint'>Petani Lokal</span>";
  const subtitleText = heroData?.subtitle || "Dapatkan komoditas sayur dan buah organik segar dengan harga grosir terbaik. Terintegrasi dengan sistem IoT Taniga.";
  const buttonText = heroData?.buttonText || "Belanja Sekarang";

  return (
    <ResponsiveLayout>
      {/* Mobile Header & Search (Hidden on MD) */}
      <div className="md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 pt-4 pb-3 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium uppercase tracking-wider">
              Kirim ke <MapPin className="w-3 h-3 text-taniga-emerald" />
            </div>
            <div className="font-bold font-poppins text-sm text-gray-800 flex items-center gap-1">
              Gudang Koperasi Maju... <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/messages" className="relative w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-taniga-danger rounded-full border-2 border-white"></span>
            </Link>
            <button className="relative w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-taniga-danger rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Cari komoditas (tekan Enter)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-gray-100/80 text-sm py-2.5 pl-10 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-taniga-emerald/50 focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 group-focus-within:text-taniga-emerald" />
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-8">
        
        {/* Premium Hero Banner via Sanity CMS */}
        <div className="w-full h-48 md:h-72 rounded-3xl overflow-hidden relative group cursor-pointer shadow-lg shadow-taniga-emerald/10">
          <Image 
            src={bannerImg} 
            alt="Hero Banner" 
            fill
            priority
            className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 bg-taniga-emerald/80 backdrop-blur-md text-white text-[10px] md:text-xs font-bold rounded-full w-max mb-3 uppercase tracking-widest border border-white/20 shadow-sm">
              {badgeText}
            </span>
            <h2 
              className="text-2xl md:text-4xl font-bold font-poppins text-white leading-tight mb-2 max-w-sm md:max-w-xl"
              dangerouslySetInnerHTML={{ __html: titleText }}
            />
            <p className="text-gray-300 text-xs md:text-sm mb-4 max-w-xs md:max-w-md line-clamp-2 md:line-clamp-none">
              {subtitleText}
            </p>
            <button className="bg-white text-taniga-pine px-5 py-2.5 rounded-full text-xs md:text-sm font-bold w-max hover:bg-taniga-mint transition-colors flex items-center gap-2 shadow-lg shadow-white/10">
              {buttonText} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Promo Section */}
        {promoData.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold font-poppins text-gray-800">Promo Menarik</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {promoData.map((promo, i) => (
                <div key={i} className="snap-start min-w-[280px] md:min-w-[320px] h-32 md:h-40 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm">
                  <Image 
                    src={promo.image ? (promo.image.asset ? urlFor(promo.image).url() : promo.image) : ""} 
                    alt={promo.title || "Promo"} 
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 p-4 flex items-end">
                    <h4 className="text-white font-bold font-poppins text-sm md:text-base leading-snug">
                      {promo.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid Section */}
        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h3 className="text-lg md:text-xl font-bold font-poppins text-gray-800">
                Rekomendasi
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">Pilihan produk segar hari ini.</p>
            </div>
            <button className="text-sm text-taniga-emerald font-semibold hover:text-taniga-pine transition-colors flex items-center gap-1 hidden md:flex">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {displayProducts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-100 rounded-3xl p-3 md:p-4 shadow-sm hover:shadow-xl hover:shadow-taniga-emerald/5 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col h-full">
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm uppercase tracking-wide">
                    {product.discount}
                  </div>
                )}
                
                {/* Image Container with Aspect Ratio */}
                <div className="w-full aspect-square bg-gray-50 rounded-2xl mb-4 relative overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="absolute inset-0 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-1.5">
                      <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                      <span className="text-[10px] font-bold text-gray-700">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">| Terjual {product.sold}</span>
                    </div>
                    <h4 className="font-semibold text-sm md:text-base text-gray-800 leading-snug mb-1 line-clamp-2">{product.name}</h4>
                    <p className="text-[10px] md:text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Kab. Brebes
                    </p>
                  </div>
                  
                  <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="block font-bold font-poppins text-base md:text-lg text-taniga-pine">{product.price}</span>
                      <span className="block text-[10px] text-gray-400">{product.unit}</span>
                    </div>
                    <button className="w-9 h-9 md:w-10 md:h-10 bg-taniga-mint text-taniga-pine rounded-full flex items-center justify-center hover:bg-taniga-emerald hover:text-white transition-colors shadow-sm active:scale-95">
                      <Plus className="w-5 h-5 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {displayProducts.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-bold text-gray-800">Tidak Ada Produk</h4>
                <p className="text-sm text-gray-500 mt-1">Belum ada komoditas di kategori ini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
