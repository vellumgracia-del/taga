"use client";

import BottomNav from "./BottomNav";
import TopNavbar from "./TopNavbar";

export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-taniga-bg">
      {/* Top Navbar khusus Desktop (MD ke atas) */}
      <TopNavbar />

      {/* Kontainer Utama */}
      <main className="flex-1 w-full max-w-7xl mx-auto md:px-6 pb-20 md:pb-12 md:py-8">
        <div className="bg-white md:rounded-3xl md:shadow-sm md:border md:border-gray-100 min-h-[calc(100vh-6rem)] overflow-hidden">
          {children}
        </div>
      </main>
      
      {/* Bottom Nav khusus Mobile (di bawah MD) */}
      <BottomNav />
    </div>
  );
}
