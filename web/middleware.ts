import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware ini akan mencegat request ke rute /dev dan /supplier
export function middleware(request: NextRequest) {
  // Dalam aplikasi produksi dengan Firebase, kita perlu menggunakan Firebase Admin SDK 
  // dan memverifikasi token session (cookie) karena onAuthStateChanged berjalan di client-side.
  
  // Simulasi Pengecekan Keamanan (Mock)
  // Anda harus mengatur cookie 'session' saat pengguna login.
  const session = request.cookies.get('session')?.value;
  const isDevRoute = request.nextUrl.pathname.startsWith('/dev');
  
  if (isDevRoute) {
    // Jika belum ada implementasi session riil, kita biarkan lewat untuk keperluan demonstrasi
    // Namun dalam produksi, buka komentar di bawah ini:
    
    /*
    if (!session || session !== 'valid-dev-token') {
      return NextResponse.redirect(new URL('/account', request.url));
    }
    */
  }

  return NextResponse.next();
}

// Konfigurasi path mana saja yang dicegat oleh Middleware ini
export const config = {
  matcher: ['/dev/:path*'],
};
