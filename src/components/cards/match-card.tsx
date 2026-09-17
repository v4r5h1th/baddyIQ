import { Avatar } from '@/components/ui/avatar';
import type { Match } from '@/types';
import { formatDate, formatDuration, formatSigned } from '@/utils/format';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

interface MatchCardProps {
  match: Match;
  onToggleFavourite?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

export function MatchCard({ match, onToggleFavourite, onShare, onDelete }: MatchCardProps) {
  const isWin = match.result === 'win';

  return (
    <Pressable
      onPress={() => router.push(`/matches/${match.id}/summary`)}
      style={{
        gap: 12,
        borderRadius: 24,
        backgroundColor: '#F9EDFD',
        padding: 18,
        borderWidth: 1,
        borderColor: '#EAD0F5',
        shadowColor: '#6E32CC',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
      }}
    >
      {/* Top row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Avatar uri={match.opponentAvatar} name={match.opponentName} size={44} />
          <View>
            <Text style={{ fontWeight: '700', color: '#0A0841', fontSize: 15 }}>{match.opponentName}</Text>
            <Text style={{ fontSize: 11, color: '#615092', marginTop: 2 }}>
              {formatDate(match.date)} · {formatDuration(match.durationSeconds)}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: isWin ? '#F8E9FD' : '#FAC0F6',
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: isWin ? '#6E32CC' : '#D46CC7',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '800', color: isWin ? '#6E32CC' : '#D46CC7', letterSpacing: 0.8 }}>
            {isWin ? 'WIN' : 'LOSS'}
          </Text>
        </View>
      </View>

      {/* Stats row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8E9FD',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <View>
          <Text style={{ fontSize: 10, color: '#615092', marginBottom: 2 }}>Overall Score</Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#0A0841' }}>{match.overallScore}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 10, color: '#615092', marginBottom: 2 }}>Rating</Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: match.ratingChange >= 0 ? '#6E32CC' : '#D46CC7' }}>
            {formatSigned(match.ratingChange)}
          </Text>
        </View>
        <View style={{ maxWidth: '45%' }}>
          <Text style={{ fontSize: 10, color: '#615092', marginBottom: 2 }}>Today&apos;s Focus</Text>
          <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '600', color: '#0A0841' }}>
            {match.todaysFocus}
          </Text>
        </View>
      </View>

      {/* Action icons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 20, paddingTop: 2 }}>
        <Pressable accessibilityLabel="Favourite match" hitSlop={8} onPress={onToggleFavourite}>
          <Feather name="heart" size={18} color={match.isFavourite ? '#D46CC7' : '#8F7FB8'} />
        </Pressable>
        <Pressable accessibilityLabel="Share match report" hitSlop={8} onPress={onShare}>
          <Feather name="share-2" size={18} color="#8F7FB8" />
        </Pressable>
        <Pressable accessibilityLabel="Delete match" hitSlop={8} onPress={onDelete}>
          <Feather name="trash-2" size={18} color="#8F7FB8" />
        </Pressable>
      </View>
    </Pressable>
  );
}
