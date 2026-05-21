import { create } from "zustand";
import { User } from "firebase/auth";

export type Role = "buyer" | "supplier" | "admin" | "dev" | null;

interface AuthState {
  user: User | null;
  role: Role;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: Role) => void;
  setLoading: (status: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  setLoading: (status) => set({ isLoading: status }),
  logout: () => set({ user: null, role: null, isLoading: false }),
}));
