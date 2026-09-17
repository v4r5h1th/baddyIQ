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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0ECFF' }} edges={['top']}>
      <View style={{ gap: 12, paddingHorizontal: 20, paddingTop: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 26, fontWeight: '800', color: '#1E1448', letterSpacing: -0.5 }}>Leaderboard</Text>
          <Pressable
            onPress={() => router.push('/(tabs)/leaderboard/compare')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 8, shadowColor: '#7B4FD4', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 }}
          >
            <Feather name="users" size={14} color="#7B4FD4" />
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#7B4FD4' }}>Compare</Text>
          </Pressable>
        </View>
        <SegmentedControl options={scopes} value={scope} onChange={setScope} />
        <SegmentedControl options={periods} value={period} onChange={setPeriod} />
      </View>
      <FlatList
        data={entries}
        keyExtractor={(e) => e.userId}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 20, paddingBottom: 40, paddingTop: 16 }}
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
