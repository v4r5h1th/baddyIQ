export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  isOnline: boolean;
  mutualFriends: number;
}

export interface FriendRequest {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  mutualFriends: number;
}
