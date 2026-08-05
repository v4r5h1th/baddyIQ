import { MatchCard } from '@/components/cards';
import { TopNav } from '@/components/ui/top-nav';
import { useMatchesStore } from '@/store/matches.store';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SeasonHistoryScreen() {
  const { matches, fetchMatches } = useMatchesStore();

  useEffect(() => {
    fetchMatches();
  }, []);

  const wins = matches.filter((m) => m.result === 'win').length;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Season History" />
      <View className="flex-row justify-around px-5 pb-3">
        <View className="items-center">
          <Text className="text-xl font-bold text-text">{matches.length}</Text>
          <Text className="text-xs text-text-secondary">Matches</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-accent">{wins}</Text>
          <Text className="text-xs text-text-secondary">Wins</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-danger">{matches.length - wins}</Text>
          <Text className="text-xs text-text-secondary">Losses</Text>
        </View>
      </View>
      <FlatList
        data={matches}
        keyExtractor={(m) => m.id}
        contentContainerClassName="gap-3 px-5 pb-10"
        renderItem={({ item }) => <MatchCard match={item} />}
      />
    </SafeAreaView>
  );
}
