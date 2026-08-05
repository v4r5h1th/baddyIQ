import { currentUser } from '@/data/mock/current-user';
import { simulate, simulateWithFailureChance } from '@/services/api/mock-client';
import type { User } from '@/types';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login(email: string, _password: string): Promise<AuthResponse> {
    return simulateWithFailureChance(
      { user: { ...currentUser, email }, token: 'mock-token-abc123' },
      0,
      900,
    );
  },
  signup(name: string, email: string, _password: string): Promise<AuthResponse> {
    return simulate({ user: { ...currentUser, name, email }, token: 'mock-token-abc123' }, 1000);
  },
  continueWithGoogle(): Promise<AuthResponse> {
    return simulate({ user: currentUser, token: 'mock-token-google' }, 800);
  },
  continueWithApple(): Promise<AuthResponse> {
    return simulate({ user: currentUser, token: 'mock-token-apple' }, 800);
  },
  forgotPassword(_email: string): Promise<{ success: true }> {
    return simulate({ success: true }, 800);
  },
  verifyEmail(_code: string): Promise<{ success: true }> {
    return simulate({ success: true }, 700);
  },
};
