import { Avatar } from '@/components/ui/avatar';
import type { LeaderboardEntry } from '@/types';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

const trendIcon: Record<LeaderboardEntry['trend'], keyof typeof Feather.glyphMap> = {
  up: 'arrow-up',
  down: 'arrow-down',
  same: 'minus',
};

const trendColor: Record<LeaderboardEntry['trend'], string> = {
  up: '#7B4FD4',
  down: '#F06292',
  same: '#9087B8',
};

export function LeaderboardCard({ entry, onPress, highlight }: { entry: LeaderboardEntry; onPress?: () => void; highlight?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: 20,
        backgroundColor: highlight ? '#EDE8FF' : '#FFFFFF',
        padding: 14,
        borderWidth: highlight ? 1.5 : 0,
        borderColor: highlight ? '#7B4FD4' : 'transparent',
        shadowColor: '#7B4FD4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: highlight ? 0.15 : 0.06,
        shadowRadius: 8,
        elevation: highlight ? 4 : 2,
      }}
    >
      <Text style={{ width: 28, textAlign: 'center', fontSize: 13, fontWeight: '800', color: '#9087B8' }}>
        {entry.rank}
      </Text>
      <Avatar uri={entry.avatarUrl} name={entry.name} size={44} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', color: '#1E1448', fontSize: 14 }}>{entry.name}</Text>
        <Text style={{ fontSize: 11, color: '#9087B8', marginTop: 2 }}>
          {entry.countryFlag} {entry.country} · {entry.winRate}% WR
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 4 }}>
        <Text style={{ fontWeight: '800', color: '#1E1448', fontSize: 15 }}>{entry.rating}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <Feather name={trendIcon[entry.trend]} size={11} color={trendColor[entry.trend]} />
          <Text style={{ color: trendColor[entry.trend], fontSize: 11, fontWeight: '600' }}>
            {entry.trendDelta || '—'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
