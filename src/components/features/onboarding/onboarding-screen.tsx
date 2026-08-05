import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingScreenProps {
  step: number;
  total: number;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  onNext: () => void;
  onSkip: () => void;
  nextLabel?: string;
}

export function OnboardingScreen({ step, total, icon, title, description, onNext, onSkip, nextLabel = 'Next' }: OnboardingScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-bg px-6">
      <View className="flex-row justify-end pt-2">
        {step < total - 1 ? (
          <Pressable onPress={onSkip} accessibilityRole="button">
            <Text className="text-sm font-medium text-text-secondary">Skip</Text>
          </Pressable>
        ) : (
          <View className="h-5" />
        )}
      </View>

      <View className="flex-1 items-center justify-center gap-6">
        <Animated.View
          entering={ZoomInIcon()}
          className="h-32 w-32 items-center justify-center rounded-full bg-primary-900"
        >
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary-500">
            <Feather name={icon} size={36} color="#fff" />
          </View>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(150)} className="items-center gap-3 px-4">
          <Text className="text-center text-2xl font-bold text-text">{title}</Text>
          <Text className="text-center text-base leading-6 text-text-secondary">{description}</Text>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(100)} className="gap-6 pb-6">
        <View className="flex-row justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <View key={i} className={cn('h-2 rounded-full', i === step ? 'w-6 bg-primary-500' : 'w-2 bg-border-light')} />
          ))}
        </View>
        <Button label={nextLabel} onPress={onNext} fullWidth size="lg" />
      </Animated.View>
    </SafeAreaView>
  );
}

function ZoomInIcon() {
  return FadeInUp.springify().damping(14);
}
