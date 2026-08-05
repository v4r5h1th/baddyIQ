import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TopNav } from '@/components/ui/top-nav';
import { friendsService } from '@/services/api';
import type { FriendRequest } from '@/types';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FriendRequestsScreen() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    friendsService.requests().then(setRequests);
  }, []);

  function respond(id: string) {
    setRequests((r) => r.filter((req) => req.id !== id));
  }

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Friend Requests" />
      <FlatList
        data={requests}
        keyExtractor={(f) => f.id}
        contentContainerClassName="gap-2 px-5 pb-10"
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-3 rounded-2xl border border-border bg-bg-card p-3">
            <Avatar uri={item.avatarUrl} name={item.name} size={44} />
            <View className="flex-1">
              <Text className="font-semibold text-text">{item.name}</Text>
              <Text className="text-xs text-text-secondary">{item.mutualFriends} mutual friends</Text>
            </View>
            <View className="flex-row gap-2">
              <Button label="Accept" size="sm" onPress={() => respond(item.id)} />
              <Button label="Decline" size="sm" variant="secondary" onPress={() => respond(item.id)} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
