import { PerformanceCard } from '@/components/cards';
import { Badge } from '@/components/ui/badge';
import { getMatchById } from '@/data/mock/matches';
import { formatDate, formatDuration, formatSigned } from '@/utils/format';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function MatchSummaryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = getMatchById(id);
  if (!match) return null;

  return (
    <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-2">
      <View className="items-center gap-2">
        <Badge label={match.result === 'win' ? 'VICTORY' : 'DEFEAT'} tone={match.result === 'win' ? 'accent' : 'danger'} />
        <Text className="text-4xl font-extrabold text-text">{match.overallScore}</Text>
        <Text className="text-sm text-text-secondary">Overall Performance Score</Text>
      </View>

      <View className="flex-row items-center justify-around rounded-3xl border border-border bg-bg-card p-4">
        <View className="items-center">
          <Text className="text-xs text-text-secondary">You</Text>
          <Text className="text-xl font-bold text-text">{match.scoreSelf.join(' - ')}</Text>
        </View>
        <Text className="text-text-muted">vs</Text>
        <View className="items-center">
          <Text className="text-xs text-text-secondary">{match.opponentName}</Text>
          <Text className="text-xl font-bold text-text">{match.scoreOpponent.join(' - ')}</Text>
        </View>
      </View>

      <View className="flex-row justify-between rounded-3xl border border-border bg-bg-card p-4">
        <View>
          <Text className="text-xs text-text-secondary">Date</Text>
          <Text className="text-sm font-semibold text-text">{formatDate(match.date)}</Text>
        </View>
        <View>
          <Text className="text-xs text-text-secondary">Duration</Text>
          <Text className="text-sm font-semibold text-text">{formatDuration(match.durationSeconds)}</Text>
        </View>
        <View>
          <Text className="text-xs text-text-secondary">Rating</Text>
          <Text className={`text-sm font-semibold ${match.ratingChange > 0 ? 'text-accent' : 'text-danger'}`}>
            {formatSigned(match.ratingChange)}
          </Text>
        </View>
      </View>

      <PerformanceCard performance={match.performance} />

      <View className="gap-3">
        <Text className="text-lg font-bold text-text">Today's Focus</Text>
        <Text className="text-sm text-text-secondary">{match.todaysFocus}</Text>
      </View>
      <View className="gap-2 rounded-3xl border border-accent-dark/40 bg-accent-dark/10 p-4">
        <Text className="text-xs font-semibold uppercase text-accent">Biggest Strength</Text>
        <Text className="text-sm text-text">{match.biggestStrength}</Text>
      </View>
      <View className="gap-2 rounded-3xl border border-danger/30 bg-danger/10 p-4">
        <Text className="text-xs font-semibold uppercase text-danger">Biggest Weakness</Text>
        <Text className="text-sm text-text">{match.biggestWeakness}</Text>
      </View>
    </ScrollView>
  );
}
