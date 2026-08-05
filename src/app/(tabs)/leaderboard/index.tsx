import { LeaderboardCard } from '@/components/cards';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { useAuthStore } from '@/store/auth.store';
import { useLeaderboardStore } from '@/store/leaderboard.store';
import type { LeaderboardPeriod, LeaderboardScope } from '@/types';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const scopes: { value: LeaderboardScope; label: string }[] = [
  { value: 'friends', label: 'Friends' },
  { value: 'regional', label: 'Regional' },
  { value: 'global', label: 'Global' },
];

const periods: { value: LeaderboardPeriod; label: string }[] = [
  { value: 'weekly', label: 'Week' },
  { value: 'monthly', label: 'Month' },
  { value: 'season', label: 'Season' },
  { value: 'all-time', label: 'All-Time' },
];

export default function LeaderboardScreen() {
  const { scope, setScope, period, setPeriod, entries, fetch: fetchEntries } = useLeaderboardStore();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <View className="gap-4 px-5 pt-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-text">Leaderboard</Text>
          <Pressable onPress={() => router.push('/(tabs)/leaderboard/compare')} className="flex-row items-center gap-1 rounded-full bg-bg-card px-3 py-2">
            <Feather name="users" size={14} color="#8FADFF" />
            <Text className="text-xs font-semibold text-primary-300">Compare</Text>
          </Pressable>
        </View>
        <SegmentedControl options={scopes} value={scope} onChange={setScope} />
        <SegmentedControl options={periods} value={period} onChange={setPeriod} />
      </View>
      <FlatList
        data={entries}
        keyExtractor={(e) => e.userId}
        contentContainerClassName="gap-2 px-5 pb-10 pt-4"
        renderItem={({ item }) => (
          <LeaderboardCard
            entry={item}
            highlight={item.userId === user?.id}
            onPress={() => router.push(`/(tabs)/leaderboard/player/${item.userId}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
