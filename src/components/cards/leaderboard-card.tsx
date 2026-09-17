import { Avatar } from '@/components/ui/avatar';
import type { LeaderboardEntry } from '@/types';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

const trendIcon: Record<LeaderboardEntry['trend'], { name: 'arrow-up' | 'arrow-down' | 'minus'; color: string }> = {
  up: { name: 'arrow-up', color: '#6E32CC' },
  down: { name: 'arrow-down', color: '#D46CC7' },
  same: { name: 'minus', color: '#8F7FB8' },
};

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  highlight?: boolean;
  onPress?: () => void;
}

export function LeaderboardCard({ entry, highlight = false, onPress }: LeaderboardCardProps) {
  const trend = trendIcon[entry.trend];

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 20,
        backgroundColor: highlight ? '#F8E9FD' : '#F9EDFD',
        borderWidth: highlight ? 2 : 1,
        borderColor: highlight ? '#6E32CC' : '#EAD0F5',
        padding: 14,
        shadowColor: '#6E32CC',
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
            color: entry.rank <= 3 ? '#6E32CC' : '#615092',
          }}
        >
          {entry.rank}
        </Text>
      </View>

      {/* Avatar & Player Info */}
      <Avatar uri={entry.avatarUrl} name={entry.name} size={40} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '700', color: '#0A0841' }}>
            {entry.name}
          </Text>
          <Text style={{ fontSize: 12 }}>{entry.countryFlag}</Text>
        </View>
        <Text style={{ fontSize: 11, color: '#615092', marginTop: 1 }}>
          {entry.winRate}% win rate · {entry.currentStreak} streak
        </Text>
      </View>

      {/* Rating & Trend */}
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ fontSize: 16, fontWeight: '800', color: '#0A0841' }}>{entry.rating}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Feather name={trend.name} size={12} color={trend.color} />
          <Text style={{ fontSize: 10, fontWeight: '600', color: trend.color }}>
            {entry.trendDelta > 0 ? `+${entry.trendDelta}` : `${entry.trendDelta}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
