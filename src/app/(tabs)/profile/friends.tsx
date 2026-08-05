import { Avatar } from '@/components/ui/avatar';
import { TopNav } from '@/components/ui/top-nav';
import { friendsService } from '@/services/api';
import type { Friend } from '@/types';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FriendsScreen() {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    friendsService.list().then(setFriends);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Friends" />
      <FlatList
        data={friends}
        keyExtractor={(f) => f.id}
        contentContainerClassName="gap-2 px-5 pb-10"
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-3 rounded-2xl border border-border bg-bg-card p-3">
            <Avatar uri={item.avatarUrl} name={item.name} size={44} online={item.isOnline} />
            <View className="flex-1">
              <Text className="font-semibold text-text">{item.name}</Text>
              <Text className="text-xs text-text-secondary">{item.mutualFriends} mutual friends</Text>
            </View>
            <Text className="text-sm font-bold text-text">{item.rating}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
