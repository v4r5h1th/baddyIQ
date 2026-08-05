import { authService } from '@/services/api';
import type { User } from '@/types';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  hasCompletedProfileSetup: boolean;
  hasGrantedPermissions: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  continueWithGoogle: () => Promise<void>;
  continueWithApple: () => Promise<void>;
  completeOnboarding: () => void;
  completeProfileSetup: (patch: Partial<User>) => void;
  completePermissions: () => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  hasSeenOnboarding: false,
  hasCompletedProfileSetup: false,
  hasGrantedPermissions: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.login(email, password);
      set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Invalid email or password. Please try again.' });
    }
  },
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    const res = await authService.signup(name, email, password);
    set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
  },
  continueWithGoogle: async () => {
    set({ isLoading: true, error: null });
    const res = await authService.continueWithGoogle();
    set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
  },
  continueWithApple: async () => {
    set({ isLoading: true, error: null });
    const res = await authService.continueWithApple();
    set({ user: res.user, token: res.token, isAuthenticated: true, isLoading: false });
  },
  completeOnboarding: () => set({ hasSeenOnboarding: true }),
  completeProfileSetup: (patch) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...patch } : state.user,
      hasCompletedProfileSetup: true,
    })),
  completePermissions: () => set({ hasGrantedPermissions: true }),
  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      hasCompletedProfileSetup: false,
      hasGrantedPermissions: false,
    }),
  clearError: () => set({ error: null }),
}));
