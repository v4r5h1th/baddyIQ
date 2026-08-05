import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function MissionCard({ title, progress, reward }: { title: string; progress: number; reward?: string }) {
  return (
    <View className="gap-3 rounded-3xl border border-primary-800 bg-primary-900/40 p-4">
      <View className="flex-row items-center gap-2">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-500">
          <Feather name="target" size={16} color="#fff" />
        </View>
        <Text className="text-xs font-semibold uppercase tracking-wide text-primary-300">Current Mission</Text>
      </View>
      <Text className="text-base font-semibold text-text">{title}</Text>
      <View className="h-2 overflow-hidden rounded-full bg-bg-input">
        <View style={{ width: `${progress}%` }} className="h-full rounded-full bg-primary-500" />
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-text-secondary">{progress}% complete</Text>
        {reward ? <Text className="text-xs font-medium text-accent">{reward}</Text> : null}
      </View>
    </View>
  );
}
