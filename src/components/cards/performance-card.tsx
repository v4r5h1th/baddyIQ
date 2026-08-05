import { performanceColors } from '@/theme/colors';
import type { PerformanceMetrics } from '@/types';
import { cn } from '@/utils/cn';
import { Text, View } from 'react-native';

const labels: Record<keyof PerformanceMetrics, string> = {
  attack: 'Attack',
  defence: 'Defence',
  movement: 'Movement',
  recovery: 'Recovery',
};

export function PerformanceCard({ performance, className }: { performance: PerformanceMetrics; className?: string }) {
  return (
    <View className={cn('gap-4 rounded-3xl border border-border bg-bg-card p-4', className)}>
      {(Object.keys(labels) as (keyof PerformanceMetrics)[]).map((key) => (
        <View key={key} className="gap-1.5">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium text-text-secondary">{labels[key]}</Text>
            <Text className="text-sm font-bold text-text">{performance[key]}</Text>
          </View>
          <View className="h-2 overflow-hidden rounded-full bg-bg-input">
            <View
              style={{ width: `${performance[key]}%`, backgroundColor: performanceColors[key] }}
              className="h-full rounded-full"
            />
          </View>
        </View>
      ))}
    </View>
  );
}
