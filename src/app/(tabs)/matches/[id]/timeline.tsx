import { getMatchById } from '@/data/mock/matches';
import { formatClock } from '@/utils/format';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

const bookmarkIcon: Record<string, keyof typeof Feather.glyphMap> = {
  'key-rally': 'star',
  'turning-point': 'trending-up',
  'biggest-mistake': 'alert-triangle',
  'best-rally': 'award',
};

const bookmarkColor: Record<string, string> = {
  'key-rally': '#5B8CFF',
  'turning-point': '#FFB020',
  'biggest-mistake': '#FF5C6C',
  'best-rally': '#20E3B2',
};

export default function MatchTimelineScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = getMatchById(id);
  if (!match) return null;

  return (
    <ScrollView contentContainerClassName="gap-4 px-5 pb-10 pt-2">
      <Text className="text-sm text-text-secondary">Key moments detected by AI throughout the match.</Text>
      {match.bookmarks.map((bm) => (
        <View key={bm.id} className="flex-row items-center gap-3 rounded-2xl border border-border bg-bg-card p-4">
          <View className="h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${bookmarkColor[bm.type]}22` }}>
            <Feather name={bookmarkIcon[bm.type]} size={18} color={bookmarkColor[bm.type]} />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-text">{bm.label}</Text>
            <Text className="text-xs text-text-secondary">{formatClock(bm.timestampSeconds)}</Text>
          </View>
        </View>
      ))}

      <View className="gap-2 pt-2">
        <Text className="text-sm font-semibold text-text">Rally Lengths</Text>
        <View className="flex-row flex-wrap gap-2">
          {match.rallyLengths.map((len, i) => (
            <View key={i} className="rounded-full bg-bg-input px-3 py-1.5">
              <Text className="text-xs text-text-secondary">#{i + 1} · {len}s</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
