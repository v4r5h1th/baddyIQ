import { mockFriendRequests, mockFriends } from '@/data/mock/friends';
import { simulate } from '@/services/api/mock-client';
import type { Friend, FriendRequest } from '@/types';

export const friendsService = {
  list(): Promise<Friend[]> {
    return simulate(mockFriends, 400);
  },
  requests(): Promise<FriendRequest[]> {
    return simulate(mockFriendRequests, 400);
  },
};
