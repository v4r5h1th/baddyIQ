import { currentUser } from '@/data/mock/current-user';
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
  skipToApp: () => void;
  completeOnboarding: () => void;
  completeProfileSetup: (patch: Partial<User>) => void;
  completePermissions: () => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser,
  token: 'mock-token-abc123',
  isAuthenticated: true,
  hasSeenOnboarding: true,
  hasCompletedProfileSetup: true,
  hasGrantedPermissions: true,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.login(email, password);
      set({
        user: res.user,
        token: res.token,
        isAuthenticated: true,
        hasSeenOnboarding: true,
        hasCompletedProfileSetup: true,
        hasGrantedPermissions: true,
        isLoading: false,
      });
    } catch {
      // Fallback to currentUser on mock error to prevent blocking
      set({
        user: { ...currentUser, email },
        token: 'mock-token-abc123',
        isAuthenticated: true,
        hasSeenOnboarding: true,
        hasCompletedProfileSetup: true,
        hasGrantedPermissions: true,
        isLoading: false,
      });
    }
  },
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await authService.signup(name, email, password);
      set({
        user: res.user,
        token: res.token,
        isAuthenticated: true,
        hasSeenOnboarding: true,
        hasCompletedProfileSetup: true,
        hasGrantedPermissions: true,
        isLoading: false,
      });
    } catch {
      set({
        user: { ...currentUser, name, email },
        token: 'mock-token-abc123',
        isAuthenticated: true,
        hasSeenOnboarding: true,
        hasCompletedProfileSetup: true,
        hasGrantedPermissions: true,
        isLoading: false,
      });
    }
  },
  continueWithGoogle: async () => {
    set({ isLoading: true, error: null });
    const res = await authService.continueWithGoogle();
    set({
      user: res.user,
      token: res.token,
      isAuthenticated: true,
      hasSeenOnboarding: true,
      hasCompletedProfileSetup: true,
      hasGrantedPermissions: true,
      isLoading: false,
    });
  },
  continueWithApple: async () => {
    set({ isLoading: true, error: null });
    const res = await authService.continueWithApple();
    set({
      user: res.user,
      token: res.token,
      isAuthenticated: true,
      hasSeenOnboarding: true,
      hasCompletedProfileSetup: true,
      hasGrantedPermissions: true,
      isLoading: false,
    });
  },
  skipToApp: () => {
    set({
      user: currentUser,
      token: 'mock-token-guest',
      isAuthenticated: true,
      hasSeenOnboarding: true,
      hasCompletedProfileSetup: true,
      hasGrantedPermissions: true,
      isLoading: false,
      error: null,
    });
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
