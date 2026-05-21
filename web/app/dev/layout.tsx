"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Map, Settings } from "lucide-react";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menus = [
    { label: "Dashboard", href: "/dev", icon: LayoutDashboard },
    { label: "Verifikasi KYC", href: "/dev/kyc", icon: Users },
    { label: "Armada IoT", href: "/dev/fleet", icon: Map },
    { label: "Sistem", href: "/dev/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Admin Desktop */}
      <aside className="w-64 bg-taniga-pine text-white flex flex-col shadow-xl hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold font-poppins text-taniga-emerald">Taniga <span className="text-white text-sm font-normal">/dev</span></h1>
          <p className="text-xs text-gray-300 mt-1">Superadmin Control Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menus.map((menu) => (
            <Link 
              key={menu.href} 
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === menu.href ? 'bg-taniga-emerald text-white' : 'text-gray-300 hover:bg-white/10'}`}
            >
              <menu.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{menu.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-taniga-emerald flex items-center justify-center font-bold">A</div>
            <div className="text-sm">
              <p className="font-bold">System Admin</p>
              <p className="text-xs text-gray-300">admin@taniga.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white p-4 shadow-sm flex items-center justify-between md:hidden z-10">
          <h1 className="text-lg font-bold font-poppins text-taniga-pine">Taniga /dev</h1>
          <button className="p-2 bg-gray-100 rounded-lg"><LayoutDashboard className="w-5 h-5" /></button>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
