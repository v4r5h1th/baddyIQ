import { ChartCard, Heatmap, LineChart } from '@/components/charts';
import { TopNav } from '@/components/ui/top-nav';
import { mockWeeklyReport } from '@/data/mock/reports';
import { formatSigned } from '@/utils/format';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeeklyReportScreen() {
  const report = mockWeeklyReport;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Weekly Report" />
      <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-2">
        <Text className="text-sm text-text-secondary">{report.weekLabel}</Text>

        <View className="flex-row justify-around rounded-3xl border border-border bg-bg-card p-4">
          <View className="items-center">
            <Text className="text-xl font-bold text-text">{report.matchesPlayed}</Text>
            <Text className="text-xs text-text-secondary">Matches</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-accent">{report.wins}</Text>
            <Text className="text-xs text-text-secondary">Wins</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-danger">{report.losses}</Text>
            <Text className="text-xs text-text-secondary">Losses</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-primary-400">{formatSigned(report.leaderboardChange)}</Text>
            <Text className="text-xs text-text-secondary">Rank Change</Text>
          </View>
        </View>

        <ChartCard title="Rating History">
          <LineChart data={report.ratingHistory} />
        </ChartCard>

        <ChartCard title="Court Coverage Heatmap">
          <Heatmap points={report.heatmap} />
        </ChartCard>

        <View className="gap-2 rounded-3xl border border-border bg-bg-card p-4">
          <Text className="text-sm font-semibold text-text">Most Improved Area</Text>
          <Text className="text-sm text-text-secondary">{report.mostImprovedArea}</Text>
        </View>

        <View className="gap-2 rounded-3xl border border-accent-dark/40 bg-accent-dark/10 p-4">
          <Text className="text-xs font-semibold uppercase text-accent">Coach Advice</Text>
          <Text className="text-sm text-text">{report.coachAdvice}</Text>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 gap-1 rounded-2xl border border-border bg-bg-card p-4">
            <Text className="text-xs text-text-secondary">Best Match</Text>
            <Text className="text-sm font-semibold text-primary-400" onPress={() => router.push(`/matches/${report.bestMatchId}/summary`)}>
              View Match
            </Text>
          </View>
          <View className="flex-1 gap-1 rounded-2xl border border-border bg-bg-card p-4">
            <Text className="text-xs text-text-secondary">Toughest Match</Text>
            <Text className="text-sm font-semibold text-primary-400" onPress={() => router.push(`/matches/${report.worstMatchId}/summary`)}>
              View Match
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
