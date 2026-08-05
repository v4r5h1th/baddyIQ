import type { NotificationItem } from '@/types';

export const mockNotifications: NotificationItem[] = [
  { id: 'n1', type: 'analysis-ready', title: 'Match Analysis Ready', body: 'Your analysis for the match vs Sofia Ramirez is ready to view.', createdAt: new Date(Date.now() - 20 * 60000).toISOString(), read: false, actionRoute: '/matches/match_0/summary' },
  { id: 'n2', type: 'achievement-unlocked', title: 'Achievement Unlocked', body: 'You unlocked "Win Streak" for winning 5 matches in a row.', createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), read: false, actionRoute: '/profile/achievements' },
  { id: 'n3', type: 'friend-overtook', title: 'Friend Overtook You', body: 'Kenji Watanabe just passed you on the friends leaderboard.', createdAt: new Date(Date.now() - 5 * 3600000).toISOString(), read: false, actionRoute: '/(tabs)/leaderboard' },
  { id: 'n4', type: 'mission-complete', title: 'Mission Complete', body: "You completed this week's mission: Win 3 matches.", createdAt: new Date(Date.now() - 26 * 3600000).toISOString(), read: true },
  { id: 'n5', type: 'weekly-report', title: 'Weekly Report Ready', body: 'Your performance summary for last week is ready.', createdAt: new Date(Date.now() - 30 * 3600000).toISOString(), read: true, actionRoute: '/weekly-report' },
  { id: 'n6', type: 'challenge-invite', title: 'Challenge Invite', body: 'Ava Thompson challenged you to a match this weekend.', createdAt: new Date(Date.now() - 48 * 3600000).toISOString(), read: true },
  { id: 'n7', type: 'practice-reminder', title: 'Practice Reminder', body: "Don't forget today's drill: Net Kill Reflex.", createdAt: new Date(Date.now() - 50 * 3600000).toISOString(), read: true, actionRoute: '/training' },
];
