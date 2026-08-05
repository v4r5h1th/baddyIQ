import { getMatchById } from '@/data/mock/matches';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Share as RNShare, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const options = [
  { key: 'link', label: 'Copy Link', icon: 'link' as const },
  { key: 'message', label: 'Share via Message', icon: 'message-square' as const },
  { key: 'social', label: 'Share to Social Media', icon: 'share-2' as const },
];

export default function ShareModal() {
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const match = matchId ? getMatchById(matchId) : undefined;

  async function handleShare() {
    await RNShare.share({
      message: match ? `Check out my match vs ${match.opponentName} on RallyIQ! Score: ${match.overallScore}` : 'Check out RallyIQ!',
    });
    router.back();
  }

  return (
    <SafeAreaView className="flex-1 justify-end bg-black/40">
      <View className="gap-4 rounded-t-3xl bg-bg p-6">
        <View className="self-center h-1.5 w-12 rounded-full bg-border-light" />
        <Text className="text-lg font-bold text-text">Share Match</Text>
        {options.map((opt) => (
          <Pressable key={opt.key} onPress={handleShare} className="flex-row items-center gap-3 rounded-2xl border border-border bg-bg-card p-4">
            <Feather name={opt.icon} size={18} color="#8FADFF" />
            <Text className="text-sm font-medium text-text">{opt.label}</Text>
          </Pressable>
        ))}
        <Pressable onPress={() => router.back()} className="items-center py-2">
          <Text className="text-sm font-medium text-text-secondary">Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
