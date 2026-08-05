import { ProgressRing } from '@/components/ui/progress-ring';
import { createNewMatch } from '@/data/mock/matches';
import { useMatchesStore } from '@/store/matches.store';
import { processingStages, useRecordStore } from '@/store/record.store';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProcessingScreen() {
  const { matchId } = useLocalSearchParams<{ matchId: string }>();
  const { processingStageIndex, setProcessingStageIndex, reset } = useRecordStore();
  const addMatch = useMatchesStore((s) => s.addMatch);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingStageIndex((i) => {
        const next = i + 1;
        if (next >= processingStages.length) {
          clearInterval(interval);
          const match = createNewMatch(matchId ?? 'match_new');
          addMatch(match);
          reset();
          setTimeout(() => router.replace(`/matches/${match.id}/summary`), 500);
          return i;
        }
        return next;
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const progress = ((processingStageIndex + 1) / processingStages.length) * 100;
  const currentStage = processingStages[Math.min(processingStageIndex, processingStages.length - 1)];

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-8 bg-bg px-8">
      <ProgressRing progress={progress} size={140} strokeWidth={10} color="#5B8CFF">
        <Feather name="cpu" size={36} color="#5B8CFF" />
      </ProgressRing>
      <View className="items-center gap-2">
        <Text className="text-xl font-bold text-text">Analyzing Your Match</Text>
        <Text className="text-center text-sm text-text-secondary">{currentStage.label}…</Text>
      </View>
      <View className="w-full gap-2">
        {processingStages.map((stage, i) => (
          <Animated.View key={stage.key} entering={FadeIn} className="flex-row items-center gap-3">
            <Feather
              name={i < processingStageIndex ? 'check-circle' : i === processingStageIndex ? 'loader' : 'circle'}
              size={16}
              color={i <= processingStageIndex ? '#20E3B2' : '#333C54'}
            />
            <Text className={cn('text-xs', i <= processingStageIndex ? 'text-text' : 'text-text-muted')}>{stage.label}</Text>
          </Animated.View>
        ))}
      </View>
    </SafeAreaView>
  );
}
