"use client";

import { useState } from "react";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { user } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const saveUserToFirestore = async (uid: string, email: string | null, name: string | null) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    
    // Jika belum ada di Firestore, buat profil baru (default role: buyer)
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        role: "buyer",
        email: email,
        name: name || "Pengguna Taniga",
        authProvider: "mixed"
      });
    }
  };

  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user.uid, result.user.email, result.user.displayName);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(result.user.uid, result.user.email, null);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="p-4 bg-taniga-mint text-taniga-pine rounded-xl shadow-sm border border-taniga-emerald/20 text-center">
        <p className="font-poppins font-semibold">Anda telah masuk</p>
        <p className="text-sm">{user.email}</p>
        <button 
          onClick={() => auth.signOut()}
          className="mt-3 px-4 py-2 bg-taniga-danger text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
        >
          Keluar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-poppins font-bold text-taniga-pine">
          {isLogin ? "Masuk ke Taniga" : "Daftar Akun Baru"}
        </h2>
        <p className="text-sm text-taniga-body mt-1">Platform B2B Smart Supply Chain</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-taniga-danger/10 text-taniga-danger rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-taniga-emerald text-sm" 
            placeholder="nama@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Kata Sandi</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:border-taniga-emerald text-sm" 
            placeholder="••••••••"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-taniga-emerald text-white rounded-xl font-bold hover:bg-taniga-pine transition-all disabled:opacity-50"
        >
          {loading ? "Memproses..." : isLogin ? "Masuk ke Akun" : "Daftar Sekarang"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between">
        <span className="border-b border-gray-200 w-full"></span>
        <span className="text-xs text-gray-400 px-4 uppercase">Atau</span>
        <span className="border-b border-gray-200 w-full"></span>
      </div>

      <button 
        onClick={handleGoogleLogin}
        disabled={loading}
        className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg font-medium text-taniga-body hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Lanjutkan dengan Google
      </button>

      <p className="mt-6 text-center text-sm text-taniga-body">
        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-taniga-emerald font-semibold hover:underline"
        >
          {isLogin ? "Daftar sekarang" : "Masuk di sini"}
        </button>
      </p>
    </div>
  );
}
