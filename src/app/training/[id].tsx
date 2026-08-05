import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TopNav } from '@/components/ui/top-nav';
import { VideoPlayer } from '@/components/video';
import { useTrainingStore } from '@/store/training.store';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const difficultyTone = { beginner: 'accent', intermediate: 'warn', advanced: 'danger' } as const;

export default function DrillDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { drills, completeDrill } = useTrainingStore();
  const drill = drills.find((d) => d.id === id);
  if (!drill) return null;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title={drill.title} />
      <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-2">
        <View className="overflow-hidden rounded-3xl">
          <VideoPlayer source={drill.videoUrl} height={200} />
        </View>
        <View className="flex-row items-center gap-2">
          <Badge label={drill.difficulty} tone={difficultyTone[drill.difficulty]} />
          <Badge label={`${drill.durationMinutes} min`} tone="neutral" />
          {drill.isCompleted ? <Badge label="Completed" tone="accent" /> : null}
        </View>
        <View className="gap-2">
          <Text className="text-sm font-semibold text-text">Expected Improvement</Text>
          <Text className="text-sm text-text-secondary">{drill.expectedImprovement}</Text>
        </View>
        <View className="gap-2">
          <Text className="text-sm font-semibold text-text">Instructions</Text>
          {drill.instructions.map((step, i) => (
            <View key={i} className="flex-row gap-2">
              <Text className="text-sm font-bold text-primary-400">{i + 1}.</Text>
              <Text className="flex-1 text-sm text-text-secondary">{step}</Text>
            </View>
          ))}
        </View>
        <Button
          label={drill.isCompleted ? 'Completed' : 'Mark as Complete'}
          onPress={() => completeDrill(drill.id)}
          disabled={drill.isCompleted}
          fullWidth
          size="lg"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
