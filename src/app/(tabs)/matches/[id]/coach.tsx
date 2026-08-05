import { Button } from '@/components/ui/button';
import { getMatchById } from '@/data/mock/matches';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function MatchCoachScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = getMatchById(id);
  if (!match) return null;

  return (
    <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-2">
      <View className="gap-3 rounded-3xl border border-border bg-bg-card p-5">
        <Text className="text-base font-semibold text-text">AI Coach Report</Text>
        <Text className="text-sm leading-6 text-text-secondary">{match.coachSummary}</Text>
      </View>
      <View className="gap-2 rounded-3xl border border-accent-dark/40 bg-accent-dark/10 p-4">
        <Text className="text-xs font-semibold uppercase text-accent">Strength</Text>
        <Text className="text-sm text-text">{match.biggestStrength}</Text>
      </View>
      <View className="gap-2 rounded-3xl border border-danger/30 bg-danger/10 p-4">
        <Text className="text-xs font-semibold uppercase text-danger">Focus Area</Text>
        <Text className="text-sm text-text">{match.biggestWeakness}</Text>
      </View>
      <Button label="Chat with Coach About This Match" onPress={() => router.push('/(tabs)/coach')} fullWidth />
    </ScrollView>
  );
}
