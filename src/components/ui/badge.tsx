import { cn } from '@/utils/cn';
import { Pressable, Text, View } from 'react-native';

export type BadgeTone = 'primary' | 'accent' | 'warn' | 'danger' | 'neutral';

const tones: Record<BadgeTone, string> = {
  primary: 'bg-primary-900 text-primary-300',
  accent: 'bg-accent-dark/20 text-accent',
  warn: 'bg-warn/20 text-warn',
  danger: 'bg-danger/20 text-danger',
  neutral: 'bg-bg-card text-text-secondary',
};

export function Badge({ label, tone = 'neutral', className }: { label: string; tone?: BadgeTone; className?: string }) {
  const [bg, text] = tones[tone].split(' ');
  return (
    <View className={cn('self-start rounded-full px-2.5 py-1', bg, className)}>
      <Text className={cn('text-xs font-semibold', text)}>{label}</Text>
    </View>
  );
}

export function Chip({
  label,
  selected,
  onPress,
  icon,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      className={cn(
        'flex-row items-center gap-1.5 rounded-full border px-3.5 py-2',
        selected ? 'border-primary-500 bg-primary-900' : 'border-border bg-bg-card',
      )}
    >
      {icon}
      <Text className={cn('text-sm font-medium', selected ? 'text-primary-300' : 'text-text-secondary')}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Pill({ label, tone = 'neutral' }: { label: string; tone?: BadgeTone }) {
  const [bg, text] = tones[tone].split(' ');
  return (
    <View className={cn('self-start rounded-full border border-border px-3 py-1', bg)}>
      <Text className={cn('text-xs font-semibold', text)}>{label}</Text>
    </View>
  );
}
