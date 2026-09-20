import { Avatar } from '@/components/ui/avatar';
import type { LeaderboardEntry } from '@/types';
import { useAppTheme } from '@/context/theme-context';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  highlight?: boolean;
  onPress?: () => void;
}

export function LeaderboardCard({ entry, highlight = false, onPress }: LeaderboardCardProps) {
  const theme = useAppTheme();

  const trendColor =
    entry.trend === 'up'
      ? theme.primary
      : entry.trend === 'down'
      ? theme.accentDark
      : theme.textMuted;

  const trendIconName: 'arrow-up' | 'arrow-down' | 'minus' =
    entry.trend === 'up' ? 'arrow-up' : entry.trend === 'down' ? 'arrow-down' : 'minus';

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 20,
        backgroundColor: highlight ? theme.surfaceSecondary : theme.card,
        borderWidth: highlight ? 2 : 1,
        borderColor: highlight ? theme.primary : theme.border,
        padding: 14,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: highlight ? 0.12 : 0.04,
        shadowRadius: 8,
        elevation: highlight ? 3 : 1,
      }}
    >
      {/* Rank */}
      <View style={{ width: 28, alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '800',
            color: entry.rank <= 3 ? theme.primary : theme.textSecondary,
          }}
        >
          {entry.rank}
        </Text>
      </View>

      {/* Avatar & Player Info */}
      <Avatar uri={entry.avatarUrl} name={entry.name} size={40} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '700', color: theme.text }}>
            {entry.name}
          </Text>
          <Text style={{ fontSize: 12 }}>{entry.countryFlag}</Text>
        </View>
        <Text style={{ fontSize: 11, color: theme.textSecondary, marginTop: 1 }}>
          {entry.winRate}% win rate · {entry.currentStreak} streak
        </Text>
      </View>

      {/* Rating & Trend */}
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ fontSize: 16, fontWeight: '800', color: theme.text }}>{entry.rating}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Feather name={trendIconName} size={12} color={trendColor} />
          <Text style={{ fontSize: 10, fontWeight: '600', color: trendColor }}>
            {entry.trendDelta > 0 ? `+${entry.trendDelta}` : `${entry.trendDelta}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
