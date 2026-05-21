import BottomNav from "./BottomNav";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-taniga-bg md:bg-gray-50">
      {/* Container utama dengan padding bottom agar tidak tertutup nav bar */}
      <main className="flex-1 pb-20 w-full max-w-md mx-auto bg-white min-h-screen shadow-sm md:border-x md:border-gray-100">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
