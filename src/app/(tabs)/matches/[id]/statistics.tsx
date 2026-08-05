import { BarChart, ChartCard, CourtPath, Heatmap, RadarChart } from '@/components/charts';
import { getMatchById } from '@/data/mock/matches';
import { formatDuration } from '@/utils/format';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function MatchStatisticsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = getMatchById(id);
  if (!match) return null;

  const radarData = [
    { label: 'Attack', value: match.performance.attack },
    { label: 'Defence', value: match.performance.defence },
    { label: 'Movement', value: match.performance.movement },
    { label: 'Recovery', value: match.performance.recovery },
  ];

  return (
    <ScrollView contentContainerClassName="gap-6 px-5 pb-10 pt-2">
      <ChartCard title="Performance Radar">
        <View className="items-center">
          <RadarChart data={radarData} />
        </View>
      </ChartCard>

      <ChartCard title="Shot Distribution">
        <BarChart data={match.shotDistribution.map((s) => ({ label: s.shot, value: s.percentage }))} />
      </ChartCard>

      <ChartCard title="Court Heatmap">
        <Heatmap points={match.heatmap} />
      </ChartCard>

      <ChartCard title="Movement Path" subtitle="Ideal (dashed) vs Actual (solid)">
        <CourtPath idealPath={match.idealPath} actualPath={match.actualPath} />
      </ChartCard>

      <View className="flex-row flex-wrap gap-3">
        <View className="flex-1 min-w-[45%] gap-1 rounded-2xl border border-border bg-bg-card p-4">
          <Text className="text-xs text-text-secondary">Longest Rally</Text>
          <Text className="text-lg font-bold text-text">{formatDuration(match.longestRallySeconds)}</Text>
        </View>
        <View className="flex-1 min-w-[45%] gap-1 rounded-2xl border border-border bg-bg-card p-4">
          <Text className="text-xs text-text-secondary">Avg Rally Length</Text>
          <Text className="text-lg font-bold text-text">{match.avgRallyLengthSeconds}s</Text>
        </View>
        <View className="flex-1 min-w-[45%] gap-1 rounded-2xl border border-border bg-bg-card p-4">
          <Text className="text-xs text-text-secondary">Distance Covered</Text>
          <Text className="text-lg font-bold text-text">{match.distanceCoveredKm} km</Text>
        </View>
      </View>
    </ScrollView>
  );
}
