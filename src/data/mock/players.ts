export interface MockPlayer {
  id: string;
  name: string;
  avatarUrl: string;
  country: string;
  countryFlag: string;
  rating: number;
  winRate: number;
  streak: number;
  mission: string;
}

const names = [
  'Liam Chen', 'Sofia Ramirez', 'Kenji Watanabe', 'Ava Thompson', 'Rahul Mehta',
  'Ines Dubois', 'Marcus Lee', 'Nadia Popescu', 'Oliver Smith', 'Priya Nair',
  'Erik Johansson', 'Grace Kim', 'Diego Alvarez', 'Hana Suzuki', 'Leo Fischer',
  'Maya Patel', 'Noah Wilson', 'Zara Ahmed', 'Lucas Silva', 'Emma Novak',
];

const flags = ['🇺🇸', '🇪🇸', '🇯🇵', '🇬🇧', '🇮🇳', '🇫🇷', '🇨🇳', '🇷🇴', '🇦🇺', '🇧🇷', '🇸🇪', '🇰🇷', '🇦🇷', '🇩🇪', '🇨🇦'];
const countries = ['USA', 'Spain', 'Japan', 'UK', 'India', 'France', 'China', 'Romania', 'Australia', 'Brazil', 'Sweden', 'S. Korea', 'Argentina', 'Germany', 'Canada'];

const missions = [
  'Win 3 matches this week', 'Improve smash accuracy', 'Play 5 doubles matches',
  'Beat your rating record', 'Complete 10 drills', 'Maintain a 5-match streak',
];

export const mockPlayers: MockPlayer[] = names.map((name, i) => ({
  id: `player_${i + 1}`,
  name,
  avatarUrl: `https://i.pravatar.cc/150?img=${i + 5}`,
  country: countries[i % countries.length],
  countryFlag: flags[i % flags.length],
  rating: 1200 + Math.round(Math.sin(i * 1.7) * 300 + i * 18),
  winRate: 40 + ((i * 7) % 45),
  streak: (i * 3) % 9,
  mission: missions[i % missions.length],
}));

export function getPlayerById(id: string): MockPlayer {
  return mockPlayers.find((p) => p.id === id) ?? mockPlayers[0];
}
