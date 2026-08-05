import { Avatar } from '@/components/ui/avatar';
import type { LeaderboardEntry } from '@/types';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

const trendIcon: Record<LeaderboardEntry['trend'], keyof typeof Feather.glyphMap> = {
  up: 'arrow-up',
  down: 'arrow-down',
  same: 'minus',
};

const trendColor: Record<LeaderboardEntry['trend'], string> = {
  up: '#20E3B2',
  down: '#FF5C6C',
  same: '#6B7385',
};

export function LeaderboardCard({ entry, onPress, highlight }: { entry: LeaderboardEntry; onPress?: () => void; highlight?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-row items-center gap-3 rounded-2xl border p-3',
        highlight ? 'border-primary-500 bg-primary-900/30' : 'border-border bg-bg-card',
      )}
    >
      <Text className="w-7 text-center text-sm font-bold text-text-secondary">{entry.rank}</Text>
      <Avatar uri={entry.avatarUrl} name={entry.name} size={44} />
      <View className="flex-1">
        <Text className="font-semibold text-text">{entry.name}</Text>
        <Text className="text-xs text-text-secondary">
          {entry.countryFlag} {entry.country} • {entry.winRate}% WR
        </Text>
      </View>
      <View className="items-end gap-1">
        <Text className="font-bold text-text">{entry.rating}</Text>
        <View className="flex-row items-center gap-1">
          <Feather name={trendIcon[entry.trend]} size={12} color={trendColor[entry.trend]} />
          <Text style={{ color: trendColor[entry.trend] }} className="text-xs font-medium">
            {entry.trendDelta || '—'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
