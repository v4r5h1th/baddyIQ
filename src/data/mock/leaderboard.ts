import { currentUser } from '@/data/mock/current-user';
import { mockPlayers } from '@/data/mock/players';
import type { LeaderboardEntry, LeaderboardScope } from '@/types';

function toEntry(rank: number, p: (typeof mockPlayers)[number], isFriend: boolean): LeaderboardEntry {
  const trendRand = (rank * 31) % 3;
  return {
    rank,
    userId: p.id,
    name: p.name,
    avatarUrl: p.avatarUrl,
    country: p.country,
    countryFlag: p.countryFlag,
    rating: p.rating,
    trend: trendRand === 0 ? 'up' : trendRand === 1 ? 'down' : 'same',
    trendDelta: trendRand === 2 ? 0 : ((rank * 7) % 12) + 1,
    winRate: p.winRate,
    currentStreak: p.streak,
    currentMission: p.mission,
    isFriend,
  };
}

const meEntry: LeaderboardEntry = {
  rank: 0,
  userId: currentUser.id,
  name: currentUser.name,
  avatarUrl: currentUser.avatarUrl,
  country: currentUser.country,
  countryFlag: currentUser.countryFlag,
  rating: currentUser.rating,
  trend: 'up',
  trendDelta: 18,
  winRate: currentUser.careerStats.winRate,
  currentStreak: currentUser.careerStats.currentStreak,
  currentMission: 'Win 3 matches this week',
  isFriend: false,
};

function buildLeaderboard(scope: LeaderboardScope): LeaderboardEntry[] {
  const pool = scope === 'friends' ? mockPlayers.slice(0, 8) : mockPlayers;
  const sorted = [...pool].sort((a, b) => b.rating - a.rating);
  const withMe = [...sorted.map((p) => p), ].map((p, i) => toEntry(i + 1, p, scope === 'friends' || i < 6));

  const insertIndex = withMe.findIndex((e) => e.rating < meEntry.rating);
  const idx = insertIndex === -1 ? withMe.length : insertIndex;
  withMe.splice(idx, 0, { ...meEntry });
  return withMe.map((entry, i) => ({ ...entry, rank: i + 1 }));
}

export const mockLeaderboards: Record<LeaderboardScope, LeaderboardEntry[]> = {
  friends: buildLeaderboard('friends'),
  regional: buildLeaderboard('regional'),
  global: buildLeaderboard('global'),
};
