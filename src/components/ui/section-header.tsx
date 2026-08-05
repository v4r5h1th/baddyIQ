import { cn } from '@/utils/cn';
import { Pressable, Text, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, actionLabel, onActionPress, subtitle, className }: SectionHeaderProps) {
  return (
    <View className={cn('flex-row items-end justify-between', className)}>
      <View>
        <Text className="text-lg font-bold text-text">{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-sm text-text-secondary">{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onActionPress} accessibilityRole="button" hitSlop={8}>
          <Text className="text-sm font-semibold text-primary-400">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
