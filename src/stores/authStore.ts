import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Role } from '../types/common.types';
import type { User } from '../features/auth/types/auth';

interface AuthState {
  user: User | null;
  role: Role | null;
  token: string | null;
  setSession: (user: User, role: Role, token: string) => void;
  clearSession: () => void;
}

const storageKey = 'tarento-auth-storage';
const authStorage = createJSONStorage(() => localStorage);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      token: null,
      setSession: (user, role, token) => set({ user, role, token }),
      clearSession: () => {
        set({ user: null, role: null, token: null });
        authStorage?.removeItem(storageKey);
      },
    }),
    {
      name: storageKey,
      storage: authStorage,
    }
  )
);