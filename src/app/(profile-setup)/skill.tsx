import { SetupScreen } from '@/components/features/profile-setup/setup-screen';
import { useUserStore } from '@/store/user.store';
import type { SkillLevel } from '@/types';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const options: { value: SkillLevel; label: string; description: string }[] = [
  { value: 'beginner', label: 'Beginner', description: 'New to badminton or playing casually' },
  { value: 'intermediate', label: 'Intermediate', description: 'Comfortable with rallies and basic tactics' },
  { value: 'advanced', label: 'Advanced', description: 'Competitive player with strong technique' },
  { value: 'pro', label: 'Pro', description: 'Tournament-level or professional player' },
];

export default function ProfileSkillScreen() {
  const { draft, setDraft } = useUserStore();

  return (
    <SetupScreen
      step={3}
      total={6}
      title="Your skill level?"
      subtitle="We'll calibrate your starting rating and drills."
      onNext={() => router.push('/(profile-setup)/photo')}
      nextDisabled={!draft.skillLevel}
    >
      <View className="gap-3">
        {options.map((opt) => {
          const selected = draft.skillLevel === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => setDraft({ skillLevel: opt.value })}
              className={cn('gap-1 rounded-2xl border p-4', selected ? 'border-primary-500 bg-primary-900/30' : 'border-border bg-bg-card')}
            >
              <View className="flex-row items-center justify-between">
                <Text className={cn('text-base font-semibold', selected ? 'text-text' : 'text-text-secondary')}>{opt.label}</Text>
                {selected ? <Feather name="check-circle" size={18} color="#5B8CFF" /> : null}
              </View>
              <Text className="text-xs text-text-secondary">{opt.description}</Text>
            </Pressable>
          );
        })}
      </View>
    </SetupScreen>
  );
}
