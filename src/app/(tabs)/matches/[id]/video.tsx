import { VideoPlayer } from '@/components/video';
import { getMatchById } from '@/data/mock/matches';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function MatchVideoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = getMatchById(id);
  if (!match) return null;

  return (
    <ScrollView contentContainerClassName="gap-4 px-5 pb-10 pt-2">
      <View className="overflow-hidden rounded-3xl">
        <VideoPlayer source={match.videoUrl} bookmarks={match.bookmarks} height={240} />
      </View>
    </ScrollView>
  );
}
