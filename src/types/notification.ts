export type NotificationType =
  | 'analysis-ready'
  | 'weekly-report'
  | 'friend-overtook'
  | 'challenge-invite'
  | 'mission-complete'
  | 'achievement-unlocked'
  | 'practice-reminder';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  actionRoute?: string;
}
