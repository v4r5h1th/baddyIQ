import { mockNotifications } from '@/data/mock/notifications';
import { simulate } from '@/services/api/mock-client';
import type { NotificationItem } from '@/types';

export const notificationsService = {
  list(): Promise<NotificationItem[]> {
    return simulate(mockNotifications, 400);
  },
};
