import { Badge } from '@/components/ui/badge';
import type { Drill } from '@/types';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

const difficultyTone: Record<Drill['difficulty'], 'accent' | 'warn' | 'danger'> = {
  beginner: 'accent',
  intermediate: 'warn',
  advanced: 'danger',
};

export function DrillCard({ drill, onToggleFavourite }: { drill: Drill; onToggleFavourite?: () => void }) {
  return (
    <Pressable
      onPress={() => router.push(`/training/${drill.id}`)}
      className="gap-3 overflow-hidden rounded-3xl border border-border bg-bg-card active:opacity-80"
    >
      <Image source={{ uri: drill.illustration }} className="h-32 w-full" accessibilityLabel={drill.title} />
      <View className="gap-2 px-4 pb-4">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 pr-2 font-semibold text-text">{drill.title}</Text>
          <Pressable accessibilityLabel="Toggle favourite drill" onPress={onToggleFavourite} hitSlop={8}>
            <Feather name="heart" size={18} color={drill.isFavourite ? '#FF5C6C' : '#6B7385'} />
          </Pressable>
        </View>
        <View className="flex-row items-center gap-2">
          <Badge label={drill.difficulty} tone={difficultyTone[drill.difficulty]} />
          <Badge label={`${drill.durationMinutes} min`} tone="neutral" />
          {drill.isCompleted ? <Badge label="Completed" tone="accent" /> : null}
        </View>
        <Text className="text-xs text-text-secondary">Expected: {drill.expectedImprovement}</Text>
        <View className="h-1.5 overflow-hidden rounded-full bg-bg-input">
          <View style={{ width: `${drill.progress}%` }} className="h-full rounded-full bg-primary-500" />
        </View>
      </View>
    </Pressable>
  );
}
