import { SetupScreen } from '@/components/features/profile-setup/setup-screen';
import { useAuthStore } from '@/store/auth.store';
import { useUserStore } from '@/store/user.store';
import type { PrimaryGoal } from '@/types';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const options: { value: PrimaryGoal; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { value: 'improve-technique', label: 'Improve my technique', icon: 'target' },
  { value: 'compete', label: 'Compete and climb ranks', icon: 'award' },
  { value: 'lose-weight', label: 'Get fit and lose weight', icon: 'activity' },
  { value: 'have-fun', label: 'Have fun and stay active', icon: 'smile' },
  { value: 'become-pro', label: 'Become a professional', icon: 'star' },
];

export default function ProfileGoalScreen() {
  const { draft, setDraft, resetDraft } = useUserStore();
  const completeProfileSetup = useAuthStore((s) => s.completeProfileSetup);

  function finish() {
    completeProfileSetup({
      name: draft.name || undefined,
      age: draft.age ? parseInt(draft.age, 10) : undefined,
      dominantHand: draft.dominantHand ?? undefined,
      skillLevel: draft.skillLevel ?? undefined,
      avatarUrl: draft.avatarUrl ?? undefined,
      goal: draft.goal ?? undefined,
    });
    resetDraft();
    router.replace('/(permissions)/camera');
  }

  return (
    <SetupScreen
      step={5}
      total={6}
      title="What's your primary goal?"
      subtitle="We'll personalize your training plan around this."
      nextLabel="Finish Setup"
      onNext={finish}
      nextDisabled={!draft.goal}
    >
      <View className="gap-3">
        {options.map((opt) => {
          const selected = draft.goal === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => setDraft({ goal: opt.value })}
              className={cn(
                'flex-row items-center gap-3 rounded-2xl border p-4',
                selected ? 'border-primary-500 bg-primary-900/30' : 'border-border bg-bg-card',
              )}
            >
              <Feather name={opt.icon} size={18} color={selected ? '#5B8CFF' : '#9AA3B8'} />
              <Text className={cn('flex-1 text-sm font-medium', selected ? 'text-text' : 'text-text-secondary')}>{opt.label}</Text>
              {selected ? <Feather name="check-circle" size={18} color="#5B8CFF" /> : null}
            </Pressable>
          );
        })}
      </View>
    </SetupScreen>
  );
}
