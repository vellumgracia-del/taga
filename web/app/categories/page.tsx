"use client";

import ResponsiveLayout from "@/components/ResponsiveLayout";
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS } from "@/lib/dummyData";
import { Search, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchCategory = activeCategory === "Semua" || product.category === activeCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <ResponsiveLayout>
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 pt-6 pb-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border-b border-gray-100">
        <h1 className="text-xl font-bold font-poppins text-gray-800 mb-4">Eksplor Komoditas</h1>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Cari sayuran, buah, beras..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100/80 text-sm py-3 pl-11 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-taniga-emerald/50 focus:bg-white transition-all border border-transparent focus:border-taniga-emerald/20"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3 group-focus-within:text-taniga-emerald transition-colors" />
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-6">
        <div>
          <h2 className="text-base font-bold font-poppins text-gray-800 mb-3">Kategori Pilihan</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {DUMMY_CATEGORIES.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category.name)}
                className={`flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] h-20 md:h-24 rounded-2xl border transition-all duration-300 shadow-sm ${
                  activeCategory === category.name 
                  ? "bg-taniga-emerald text-white border-taniga-emerald shadow-taniga-emerald/20 shadow-md transform -translate-y-1" 
                  : "bg-white text-gray-600 border-gray-100 hover:border-taniga-mint hover:bg-gray-50 hover:-translate-y-0.5"
                }`}
              >
                <span className="text-2xl md:text-3xl mb-1">{category.icon}</span>
                <span className={`text-[10px] md:text-xs font-semibold ${activeCategory === category.name ? "text-white" : "text-gray-700"}`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold font-poppins text-gray-800">
              {activeCategory === "Semua" ? "Semua Produk" : `Kategori: ${activeCategory}`}
            </h2>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{filteredProducts.length} hasil</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-xl hover:shadow-taniga-emerald/5 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col h-full">
                  {product.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm uppercase tracking-wide">
                      {product.discount}
                    </div>
                  )}
                  
                  <div className="w-full aspect-square bg-gray-50 rounded-2xl mb-3 relative overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="absolute inset-0 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                        <span className="text-[10px] font-bold text-gray-700">{product.rating}</span>
                        <span className="text-[10px] text-gray-400">| Terjual {product.sold}</span>
                      </div>
                      <h4 className="font-semibold text-xs md:text-sm text-gray-800 leading-snug mb-1 line-clamp-2">{product.name}</h4>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">{product.unit}</p>
                        <p className="font-bold font-poppins text-taniga-pine text-xs md:text-base">{product.price}</p>
                      </div>
                      <button className="w-8 h-8 bg-taniga-mint text-taniga-emerald rounded-full flex items-center justify-center hover:bg-taniga-emerald hover:text-white transition-colors transform active:scale-95 shadow-sm">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed mt-4">
              <span className="text-4xl mb-3">🔍</span>
              <h3 className="text-gray-800 font-bold text-sm mb-1">Produk Tidak Ditemukan</h3>
              <p className="text-xs text-gray-500">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}

export default function Categories() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Memuat halaman...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
