import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  return (
    <Pressable
      onPress={() => router.push(`/matches/${match.id}/summary`)}
      className="gap-3 rounded-3xl border border-border bg-bg-card p-4 active:opacity-80"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Avatar uri={match.opponentAvatar} name={match.opponentName} size={44} />
          <View>
            <Text className="font-semibold text-text">{match.opponentName}</Text>
            <Text className="text-xs text-text-secondary">
              {formatDate(match.date)} • {formatDuration(match.durationSeconds)}
            </Text>
          </View>
        </View>
        <Badge label={match.result === 'win' ? 'WIN' : 'LOSS'} tone={match.result === 'win' ? 'accent' : 'danger'} />
      </View>

      <View className="flex-row items-center justify-between rounded-2xl bg-bg-input px-4 py-3">
        <View>
          <Text className="text-xs text-text-secondary">Overall Score</Text>
          <Text className="text-lg font-bold text-text">{match.overallScore}</Text>
        </View>
        <View>
          <Text className="text-xs text-text-secondary">Rating</Text>
          <Text className={`text-lg font-bold ${match.ratingChange >= 0 ? 'text-accent' : 'text-danger'}`}>
            {formatSigned(match.ratingChange)}
          </Text>
        </View>
        <View className="max-w-[45%]">
          <Text className="text-xs text-text-secondary">Today&apos;s Focus</Text>
          <Text numberOfLines={1} className="text-sm font-medium text-text">
            {match.todaysFocus}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-end gap-5 pt-1">
        <Pressable accessibilityLabel="Favourite match" hitSlop={8} onPress={onToggleFavourite}>
          <Feather name="heart" size={18} color={match.isFavourite ? '#FF5C6C' : '#6B7385'} />
        </Pressable>
        <Pressable accessibilityLabel="Share match report" hitSlop={8} onPress={onShare}>
          <Feather name="share-2" size={18} color="#6B7385" />
        </Pressable>
        <Pressable accessibilityLabel="Delete match" hitSlop={8} onPress={onDelete}>
          <Feather name="trash-2" size={18} color="#6B7385" />
        </Pressable>
      </View>
    </Pressable>
  );
}
