"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, FileText, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const menus = [
    { label: "Beranda", icon: Home, href: "/" },
    { label: "Eksplor", icon: Search, href: "/categories" },
    { label: "Keranjang", icon: ShoppingCart, href: "/cart" },
    { label: "Pesanan", icon: FileText, href: "/orders" },
    { label: "Akun", icon: User, href: "/account" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-header border-t border-gray-200/50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {menus.map((menu, index) => {
          const isActive = pathname === menu.href || pathname.startsWith(`${menu.href}/`);
          return (
            <Link
              key={index}
              href={menu.href}
              className="flex flex-col items-center justify-center w-full h-full relative group"
            >
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-taniga-emerald rounded-b-full"></div>
              )}
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-taniga-mint/50 scale-110' : 'group-hover:bg-gray-100 group-active:scale-95'}`}>
                <menu.icon
                  className={`w-5 h-5 ${isActive ? "text-taniga-emerald" : "text-gray-400"}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={`text-[9px] mt-0.5 font-medium ${
                  isActive ? "text-taniga-pine font-bold" : "text-gray-500"
                }`}
              >
                {menu.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
