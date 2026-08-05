import type { Achievement } from '@/types';

export const mockAchievements: Achievement[] = [
  { id: 'ach_1', title: 'First Victory', description: 'Win your first match', category: 'playing', icon: 'trophy', unlocked: true, unlockedAt: '2025-02-01T00:00:00.000Z', progress: 1, total: 1 },
  { id: 'ach_2', title: 'Century Club', description: 'Play 100 matches', category: 'playing', icon: 'flag', unlocked: false, progress: 87, total: 100 },
  { id: 'ach_3', title: 'Win Streak', description: 'Win 5 matches in a row', category: 'playing', icon: 'flame', unlocked: true, unlockedAt: '2025-05-11T00:00:00.000Z', progress: 5, total: 5 },
  { id: 'ach_4', title: 'Rising Star', description: 'Increase your rating by 200 points', category: 'improvement', icon: 'trending-up', unlocked: true, unlockedAt: '2025-06-20T00:00:00.000Z', progress: 200, total: 200 },
  { id: 'ach_5', title: 'Comeback Kid', description: 'Win a match after losing the first game', category: 'improvement', icon: 'refresh-ccw', unlocked: false, progress: 2, total: 5 },
  { id: 'ach_6', title: 'Drill Sergeant', description: 'Complete 25 training drills', category: 'training', icon: 'dumbbell', unlocked: false, progress: 18, total: 25 },
  { id: 'ach_7', title: 'Perfect Week', description: 'Complete every drill in your weekly plan', category: 'training', icon: 'calendar-check', unlocked: true, unlockedAt: '2025-07-02T00:00:00.000Z', progress: 6, total: 6 },
  { id: 'ach_8', title: 'Top 100', description: 'Reach top 100 in global leaderboard', category: 'leaderboards', icon: 'medal', unlocked: false, progress: 1284, total: 100 },
  { id: 'ach_9', title: 'Regional Champion', description: 'Reach #1 in your region', category: 'leaderboards', icon: 'crown', unlocked: false, progress: 63, total: 1 },
  { id: 'ach_10', title: 'Social Butterfly', description: 'Add 10 friends', category: 'social', icon: 'users', unlocked: true, unlockedAt: '2025-03-15T00:00:00.000Z', progress: 10, total: 10 },
  { id: 'ach_11', title: 'Challenger', description: 'Challenge 5 friends to a match', category: 'social', icon: 'swords', unlocked: false, progress: 2, total: 5 },
  { id: 'ach_12', title: 'Analyst', description: 'Watch 20 match replays', category: 'training', icon: 'video', unlocked: false, progress: 12, total: 20 },
];
