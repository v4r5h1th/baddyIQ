import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export function CoachCard({ summary, onPress }: { summary: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="gap-3 rounded-3xl border border-border bg-bg-card p-4 active:opacity-80"
    >
      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-accent-dark/20">
          <Feather name="message-circle" size={16} color="#20E3B2" />
        </View>
        <Text className="text-xs font-semibold uppercase tracking-wide text-accent">Coach Summary</Text>
      </View>
      <Text numberOfLines={4} className="text-sm leading-5 text-text-secondary">
        {summary}
      </Text>
      {onPress ? (
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-semibold text-primary-400">Ask Coach</Text>
          <Feather name="arrow-right" size={14} color="#5B8CFF" />
        </View>
      ) : null}
    </Pressable>
  );
}
