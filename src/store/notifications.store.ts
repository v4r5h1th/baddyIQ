import { notificationsService } from '@/services/api';
import type { NotificationItem } from '@/types';
import { create } from 'zustand';

interface NotificationsState {
  items: NotificationItem[];
  isLoading: boolean;
  unreadCount: () => number;
  fetch: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  remove: (id: string) => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  items: [],
  isLoading: false,
  unreadCount: () => get().items.filter((n) => !n.read).length,
  fetch: async () => {
    set({ isLoading: true });
    const items = await notificationsService.list();
    set({ items, isLoading: false });
  },
  markAsRead: (id) =>
    set((state) => ({ items: state.items.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
  markAllAsRead: () => set((state) => ({ items: state.items.map((n) => ({ ...n, read: true })) })),
  remove: (id) => set((state) => ({ items: state.items.filter((n) => n.id !== id) })),
}));
