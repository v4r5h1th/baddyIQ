import { cn } from '@/utils/cn';
import { Text, View } from 'react-native';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  legend?: React.ReactNode;
}

export function ChartCard({ title, subtitle, children, className, legend }: ChartCardProps) {
  return (
    <View className={cn('gap-3 rounded-3xl border border-border bg-bg-card p-4', className)}>
      <View>
        <Text className="font-semibold text-text">{title}</Text>
        {subtitle ? <Text className="text-xs text-text-secondary">{subtitle}</Text> : null}
      </View>
      <View className="items-center">{children}</View>
      {legend}
    </View>
  );
}
