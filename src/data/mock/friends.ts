import { mockPlayers } from '@/data/mock/players';
import type { Friend, FriendRequest } from '@/types';

export const mockFriends: Friend[] = mockPlayers.slice(0, 8).map((p, i) => ({
  id: p.id,
  name: p.name,
  avatarUrl: p.avatarUrl,
  rating: p.rating,
  isOnline: i % 3 === 0,
  mutualFriends: (i * 2) % 6,
}));

export const mockFriendRequests: FriendRequest[] = mockPlayers.slice(8, 11).map((p, i) => ({
  id: p.id,
  name: p.name,
  avatarUrl: p.avatarUrl,
  rating: p.rating,
  mutualFriends: i + 1,
}));
