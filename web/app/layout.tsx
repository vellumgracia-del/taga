import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Taniga - Platform B2B Agri-Tech",
  description: "Marketplace Komoditas Pertanian dengan IoT Tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-50 text-gray-900 min-h-full flex flex-col`}>
        <SplashScreen />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
