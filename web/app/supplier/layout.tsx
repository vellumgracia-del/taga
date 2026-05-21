"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FileText, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role !== "supplier" && role !== "dev") {
      router.replace("/account");
    }
  }, [role, isLoading, router]);

  if (isLoading || (role !== "supplier" && role !== "dev")) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Memuat Dasbor...</div>;
  }

  const menus = [
    { label: "Dasbor Utama", icon: LayoutDashboard, href: "/supplier" },
    { label: "Pesanan B2B", icon: FileText, href: "/supplier/orders" },
    { label: "Katalog Produk", icon: Package, href: "/supplier/products" },
    { label: "Pengaturan Toko", icon: Settings, href: "/supplier/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 relative">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-taniga-emerald text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <h1 className="text-xl font-bold font-poppins text-taniga-pine tracking-tight">Taniga</h1>
              <p className="text-[10px] font-semibold text-taniga-emerald uppercase tracking-widest">Supplier Hub</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menus.map((menu, i) => {
            const isActive = pathname === menu.href || (pathname.startsWith(menu.href) && menu.href !== "/supplier");
            return (
              <Link 
                key={i} 
                href={menu.href} 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium text-sm group ${isActive ? 'bg-taniga-mint text-taniga-pine font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-taniga-emerald'}`}
              >
                <menu.icon className={`w-5 h-5 transition-transform ${isActive ? 'text-taniga-emerald' : 'group-hover:scale-110'}`} />
                {menu.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={() => useAuthStore.getState().logout()} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors text-sm font-medium">
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-100 p-4 sticky top-0 z-40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-taniga-emerald text-white rounded-lg flex items-center justify-center font-bold">T</div>
            <h1 className="font-bold font-poppins text-taniga-pine">Supplier Hub</h1>
          </div>
          <Link href="/account" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto gap-2 p-4 bg-white border-b border-gray-100 hide-scrollbar">
           {menus.map((menu, i) => {
            const isActive = pathname === menu.href || (pathname.startsWith(menu.href) && menu.href !== "/supplier");
            return (
              <Link 
                key={i} 
                href={menu.href} 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-colors ${isActive ? 'bg-taniga-mint text-taniga-pine font-bold' : 'bg-gray-50 text-gray-600'}`}
              >
                <menu.icon className="w-3 h-3" /> {menu.label}
              </Link>
            );
          })}
        </div>

        {children}
      </main>
    </div>
  );
}
