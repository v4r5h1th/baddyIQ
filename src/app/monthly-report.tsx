import { ChartCard, Heatmap, LineChart } from '@/components/charts';
import { TopNav } from '@/components/ui/top-nav';
import { mockMonthlyReport } from '@/data/mock/reports';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MonthlyReportScreen() {
  const report = mockMonthlyReport;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Monthly Report" />
      <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-2">
        <Text className="text-sm text-text-secondary">{report.monthLabel}</Text>

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
            <Text className="text-xl font-bold text-primary-400">+{report.improvementPercent}%</Text>
            <Text className="text-xs text-text-secondary">Improvement</Text>
          </View>
        </View>

        <ChartCard title="Performance Trend">
          <LineChart data={report.performanceTrend} />
        </ChartCard>

        <ChartCard title="Court Coverage Heatmap">
          <Heatmap points={report.heatmap} />
        </ChartCard>

        <View className="gap-2">
          <Text className="text-sm font-semibold text-text">Personal Records</Text>
          {report.personalRecords.map((r) => (
            <View key={r.label} className="flex-row items-center justify-between rounded-2xl border border-border bg-bg-card p-3">
              <Text className="text-sm text-text-secondary">{r.label}</Text>
              <Text className="text-sm font-bold text-text">{r.value}</Text>
            </View>
          ))}
        </View>

        <View className="gap-2 rounded-3xl border border-accent-dark/40 bg-accent-dark/10 p-4">
          <Text className="text-xs font-semibold uppercase text-accent">Coach Summary</Text>
          <Text className="text-sm text-text">{report.coachSummary}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
