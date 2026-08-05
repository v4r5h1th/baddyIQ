import { generateId } from '@/utils/random';
import { create } from 'zustand';

export type ToastVariant = 'default' | 'success' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastState {
  toast: ToastItem | null;
  show: (message: string, variant?: ToastVariant, actionLabel?: string, onAction?: () => void) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  show: (message, variant = 'default', actionLabel, onAction) =>
    set({ toast: { id: generateId('toast'), message, variant, actionLabel, onAction } }),
  hide: () => set({ toast: null }),
}));
