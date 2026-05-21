"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuthStore, Role } from "@/store/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setRole, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setRole(data.role as Role);
          } else {
            setRole("buyer");
          }
        } catch (error) {
          console.error("Gagal mendapatkan role user:", error);
          setRole("buyer");
        }
      } else {
        setRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setRole, setLoading]);

  return <>{children}</>;
}
