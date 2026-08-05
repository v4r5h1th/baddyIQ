export interface ChatChartData {
  label: string;
  values: { name: string; value: number }[];
}

export interface ChatMatchRef {
  matchId: string;
  opponentName: string;
  date: string;
  thumbnailUrl: string;
}

export interface ChatVideoRef {
  matchId: string;
  label: string;
  timestampSeconds: number;
  thumbnailUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  chart?: ChatChartData;
  matchRef?: ChatMatchRef;
  videoRef?: ChatVideoRef;
  suggestedFollowUps?: string[];
  createdAt: string;
}
