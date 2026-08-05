import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface StatisticCardProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  className?: string;
}

export function StatisticCard({ icon, label, value, trend, trendPositive, className }: StatisticCardProps) {
  return (
    <View className={cn('flex-1 gap-2 rounded-2xl border border-border bg-bg-card p-4', className)}>
      <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-900">
        <Feather name={icon} size={16} color="#8FADFF" />
      </View>
      <Text className="text-xl font-bold text-text">{value}</Text>
      <Text className="text-xs text-text-secondary">{label}</Text>
      {trend ? (
        <Text className={cn('text-xs font-semibold', trendPositive ? 'text-accent' : 'text-danger')}>{trend}</Text>
      ) : null}
    </View>
  );
}
