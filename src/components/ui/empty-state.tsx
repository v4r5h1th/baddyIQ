import { Button } from '@/components/ui/button';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  icon?: keyof typeof Feather.glyphMap;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = 'inbox', title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="items-center gap-3 rounded-3xl border border-dashed border-border px-6 py-12">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-bg-card">
        <Feather name={icon} size={28} color="#6B7385" />
      </View>
      <Text className="text-center text-base font-semibold text-text">{title}</Text>
      {description ? <Text className="text-center text-sm text-text-secondary">{description}</Text> : null}
      {actionLabel ? <Button label={actionLabel} variant="secondary" size="sm" onPress={onAction} className="mt-2" /> : null}
    </View>
  );
}
