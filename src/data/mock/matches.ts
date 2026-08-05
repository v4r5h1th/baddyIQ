import { mockPlayers } from '@/data/mock/players';
import type { Bookmark, HeatmapPoint, Match, ShotDistributionItem } from '@/types';
import { pick, randomInt, seededRandom } from '@/utils/random';

const focuses = [
  'Improve net play consistency',
  'Work on backhand clears',
  'Reduce unforced errors on drops',
  'Faster recovery to base position',
  'Sharper smash angles',
  'Better court coverage on defence',
];

const strengths = [
  'Explosive smash power', 'Excellent net control', 'Strong court coverage',
  'Consistent service accuracy', 'Great deceptive drop shots', 'Fast reaction on defence',
];

const weaknesses = [
  'Slow recovery after smashes', 'Inconsistent backhand clears', 'Over-committing on net shots',
  'Footwork lag on wide returns', 'Predictable serve placement', 'Fatigue in the third game',
];

const summaries = [
  "You dominated the front court today, but your recovery speed dipped in the final game. Focus on resetting to base after every attacking shot.",
  "Solid defensive rallies kept you in the match, though your smash conversion rate was below average. A few technique drills should sharpen that up.",
  "Great improvement in movement efficiency compared to your last five matches. Keep building on your net game — it's becoming a real weapon.",
  "Your consistency carried this match. Now let's work on adding more variation to keep opponents guessing.",
];

function buildBookmarks(rand: () => number, durationSeconds: number): Bookmark[] {
  const types: Bookmark['type'][] = ['key-rally', 'turning-point', 'biggest-mistake', 'best-rally'];
  return types.map((type, i) => ({
    id: `bm_${i}`,
    type,
    label:
      type === 'key-rally' ? 'Key Rally — 24 shot exchange'
      : type === 'turning-point' ? 'Turning Point — momentum shift'
      : type === 'biggest-mistake' ? 'Biggest Mistake — net error'
      : 'Best Rally — winning smash',
    timestampSeconds: Math.floor((durationSeconds / 5) * (i + 1) + randomInt(-20, 20, rand)),
  }));
}

function buildHeatmap(rand: () => number): HeatmapPoint[] {
  return Array.from({ length: 40 }, () => ({
    x: rand(),
    y: rand(),
    intensity: 0.2 + rand() * 0.8,
  }));
}

function buildPath(rand: () => number): { x: number; y: number }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    x: 0.1 + (i / 12) * 0.8 + (rand() - 0.5) * 0.1,
    y: 0.15 + rand() * 0.7,
  }));
}

function buildShotDistribution(rand: () => number): ShotDistributionItem[] {
  const shots = ['Smash', 'Clear', 'Drop', 'Net Shot', 'Drive', 'Lift'];
  const raw = shots.map((shot) => ({ shot, count: randomInt(8, 60, rand) }));
  const total = raw.reduce((sum, s) => sum + s.count, 0);
  return raw.map((s) => ({ ...s, percentage: Math.round((s.count / total) * 100) }));
}

function buildMatch(index: number): Match {
  const rand = seededRandom(index * 977 + 13);
  const opponent = pick(mockPlayers, rand);
  const result: Match['result'] = rand() > 0.42 ? 'win' : 'loss';
  const daysAgo = index * 2 + randomInt(0, 2, rand);
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString();
  const durationSeconds = randomInt(1500, 3600, rand);
  const overallScore = randomInt(58, 96, rand);
  const scoreSelf = [randomInt(15, 21, rand), randomInt(10, 21, rand)];
  const scoreOpponent = [randomInt(10, 21, rand), randomInt(10, 21, rand)];

  return {
    id: `match_${index}`,
    opponentName: opponent.name,
    opponentAvatar: opponent.avatarUrl,
    format: rand() > 0.7 ? 'doubles' : 'singles',
    date,
    durationSeconds,
    result,
    scoreSelf,
    scoreOpponent,
    overallScore,
    ratingChange: result === 'win' ? randomInt(6, 28, rand) : -randomInt(4, 22, rand),
    performance: {
      attack: randomInt(45, 95, rand),
      defence: randomInt(45, 95, rand),
      movement: randomInt(45, 95, rand),
      recovery: randomInt(40, 90, rand),
    },
    todaysFocus: pick(focuses, rand),
    biggestStrength: pick(strengths, rand),
    biggestWeakness: pick(weaknesses, rand),
    coachSummary: pick(summaries, rand),
    isFavourite: rand() > 0.8,
    isShared: rand() > 0.85,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: `https://picsum.photos/seed/match-${index}/400/240`,
    bookmarks: buildBookmarks(rand, durationSeconds),
    shotDistribution: buildShotDistribution(rand),
    heatmap: buildHeatmap(rand),
    idealPath: buildPath(rand),
    actualPath: buildPath(rand),
    longestRallySeconds: randomInt(20, 75, rand),
    avgRallyLengthSeconds: randomInt(6, 18, rand),
    distanceCoveredKm: Math.round((1 + rand() * 3) * 10) / 10,
    rallyLengths: Array.from({ length: 12 }, () => randomInt(2, 30, rand)),
  };
}

export const mockMatches: Match[] = Array.from({ length: 14 }, (_, i) => buildMatch(i));

export function createNewMatch(id: string): Match {
  const match = buildMatch(mockMatches.length + randomInt(0, 1000, Math.random));
  return { ...match, id, date: new Date().toISOString(), isFavourite: false, isShared: false };
}

export function getMatchById(id: string): Match | undefined {
  return mockMatches.find((m) => m.id === id);
}
