import type { ChatMessage } from '@/types';
import { generateId } from '@/utils/random';

export const suggestedQuestions: string[] = [
  'Why did I lose?',
  'How do I improve my smash?',
  'Compare with last match.',
  'Explain today\'s mistakes.',
  'What should I practice?',
  'Show me examples.',
];

const responses: Record<string, Omit<ChatMessage, 'id' | 'role' | 'createdAt'>> = {
  'why did i lose?': {
    text: "You lost your last match 18-21, 21-19, 17-21 mainly due to a dip in recovery speed during the third game. Your unforced errors also spiked after the 15-minute mark, which usually signals fatigue.",
    chart: {
      label: 'Performance by game',
      values: [
        { name: 'Game 1', value: 62 },
        { name: 'Game 2', value: 74 },
        { name: 'Game 3', value: 48 },
      ],
    },
    matchRef: { matchId: 'match_1', opponentName: 'Sofia Ramirez', date: new Date().toISOString(), thumbnailUrl: 'https://picsum.photos/seed/match-1/400/240' },
    suggestedFollowUps: ['What should I practice?', 'Show me examples.'],
  },
  'how do i improve my smash?': {
    text: "Your smash accuracy is 71%, slightly below your season average. Focus on jump timing and wrist snap. I'd recommend the Jump Smash Power and Smash Angle Control drills this week.",
    chart: {
      label: 'Smash accuracy trend',
      values: [
        { name: 'W1', value: 64 },
        { name: 'W2', value: 68 },
        { name: 'W3', value: 71 },
        { name: 'W4', value: 71 },
      ],
    },
    suggestedFollowUps: ['Show me examples.', 'What should I practice?'],
  },
  'compare with last match.': {
    text: "Compared to your last match, your attack rating improved by 6 points but defence dropped by 9. Movement stayed roughly the same. Overall, a more aggressive but riskier performance.",
    chart: {
      label: 'This match vs last match',
      values: [
        { name: 'Attack', value: 82 },
        { name: 'Defence', value: 61 },
        { name: 'Movement', value: 74 },
        { name: 'Recovery', value: 58 },
      ],
    },
    suggestedFollowUps: ['Why did I lose?', 'What should I practice?'],
  },
  "explain today's mistakes.": {
    text: "Today's biggest mistake was over-committing on net shots, leading to 6 unforced errors. You also left the center court exposed twice after attacking shots, giving your opponent easy cross-court winners.",
    videoRef: { matchId: 'match_0', label: 'Net error at 12:34', timestampSeconds: 754, thumbnailUrl: 'https://picsum.photos/seed/match-0/400/240' },
    suggestedFollowUps: ['What should I practice?', 'Show me examples.'],
  },
  'what should i practice?': {
    text: "Based on your recent matches, I recommend focusing on: 1) Net Kill Reflex for sharper net play, 2) Base Position Reset for faster recovery, and 3) Backhand Clear Power to fix your weakest shot.",
    suggestedFollowUps: ['Show me examples.', 'Compare with last match.'],
  },
  'show me examples.': {
    text: "Here's a clip from your match against Kenji Watanabe where your recovery positioning was excellent — use this as your benchmark technique.",
    videoRef: { matchId: 'match_2', label: 'Great recovery example', timestampSeconds: 322, thumbnailUrl: 'https://picsum.photos/seed/match-2/400/240' },
    suggestedFollowUps: ['What should I practice?', 'Why did I lose?'],
  },
};

export function getCoachResponse(question: string): ChatMessage {
  const key = question.trim().toLowerCase();
  const match = responses[key] ?? {
    text: "I looked through your recent matches and training data — overall you're trending upward. Ask me about your smash, defence, or a specific match for a deeper breakdown.",
    suggestedFollowUps: suggestedQuestions.slice(0, 3),
  };
  return {
    id: generateId('msg'),
    role: 'assistant',
    createdAt: new Date().toISOString(),
    ...match,
  };
}

export const initialCoachMessage: ChatMessage = {
  id: generateId('msg'),
  role: 'assistant',
  text: "Hey Alex! I'm your AI coach. Ask me anything about your matches, technique, or training plan.",
  suggestedFollowUps: suggestedQuestions,
  createdAt: new Date().toISOString(),
};
