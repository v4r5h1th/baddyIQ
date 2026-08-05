import type { Achievement } from '@/types';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

const iconMap: Record<string, keyof typeof Feather.glyphMap> = {
  trophy: 'award',
  flag: 'flag',
  flame: 'zap',
  'trending-up': 'trending-up',
  'refresh-ccw': 'refresh-ccw',
  dumbbell: 'activity',
  'calendar-check': 'calendar',
  medal: 'award',
  crown: 'star',
  users: 'users',
  swords: 'crosshair',
  video: 'video',
};

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const pct = Math.min(100, Math.round((achievement.progress / achievement.total) * 100));
  return (
    <View
      className={cn(
        'w-[31%] items-center gap-2 rounded-2xl border p-3',
        achievement.unlocked ? 'border-accent-dark/40 bg-accent-dark/10' : 'border-border bg-bg-card opacity-70',
      )}
    >
      <View
        className={cn(
          'h-12 w-12 items-center justify-center rounded-full',
          achievement.unlocked ? 'bg-accent-dark/20' : 'bg-bg-input',
        )}
      >
        <Feather name={iconMap[achievement.icon] ?? 'award'} size={20} color={achievement.unlocked ? '#20E3B2' : '#6B7385'} />
      </View>
      <Text numberOfLines={1} className="text-xs font-semibold text-text">{achievement.title}</Text>
      <Text className="text-center text-[10px] text-text-secondary" numberOfLines={2}>{achievement.description}</Text>
      {!achievement.unlocked ? (
        <View className="h-1.5 w-full overflow-hidden rounded-full bg-bg-input">
          <View style={{ width: `${pct}%` }} className="h-full rounded-full bg-primary-500" />
        </View>
      ) : null}
    </View>
  );
}
