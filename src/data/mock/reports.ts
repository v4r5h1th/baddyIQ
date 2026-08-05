import type { MonthlyReport, WeeklyReport } from '@/types';

export const mockWeeklyReport: WeeklyReport = {
  id: 'wr_1',
  weekLabel: 'Jul 28 – Aug 3',
  matchesPlayed: 5,
  wins: 3,
  losses: 2,
  bestMatchId: 'match_0',
  worstMatchId: 'match_3',
  mostImprovedArea: 'Movement efficiency (+12%)',
  currentMission: 'Win 3 matches this week',
  leaderboardChange: 18,
  coachAdvice:
    'Your recovery speed has improved significantly this week. Keep drilling footwork ladders and focus next on backhand consistency during long rallies.',
  ratingHistory: [
    { label: 'Mon', value: 1798 },
    { label: 'Tue', value: 1805 },
    { label: 'Wed', value: 1792 },
    { label: 'Thu', value: 1821 },
    { label: 'Fri', value: 1834 },
    { label: 'Sat', value: 1842 },
    { label: 'Sun', value: 1842 },
  ],
  heatmap: Array.from({ length: 30 }, (_, i) => ({
    x: (i % 6) / 6,
    y: Math.floor(i / 6) / 5,
    intensity: 0.2 + ((i * 13) % 10) / 10,
  })),
};

export const mockMonthlyReport: MonthlyReport = {
  id: 'mr_1',
  monthLabel: 'July 2026',
  matchesPlayed: 19,
  wins: 12,
  losses: 7,
  improvementPercent: 9,
  longestRallySeconds: 74,
  favouriteShot: 'Smash',
  personalRecords: [
    { label: 'Longest Rally', value: '74s' },
    { label: 'Highest Match Score', value: '96' },
    { label: 'Best Win Streak', value: '5 wins' },
    { label: 'Fastest Smash Sequence', value: '3 in a rally' },
  ],
  coachSummary:
    'July was a breakthrough month — your rating climbed 96 points thanks to sharper attacking play and much better third-game stamina. Keep building on defensive positioning to close the gap with top-ranked players in your region.',
  performanceTrend: [
    { label: 'W1', value: 1746 },
    { label: 'W2', value: 1768 },
    { label: 'W3', value: 1790 },
    { label: 'W4', value: 1842 },
  ],
  heatmap: Array.from({ length: 30 }, (_, i) => ({
    x: (i % 6) / 6,
    y: Math.floor(i / 6) / 5,
    intensity: 0.15 + ((i * 17) % 10) / 10,
  })),
  matchIds: ['match_0', 'match_1', 'match_2', 'match_3', 'match_4'],
};
