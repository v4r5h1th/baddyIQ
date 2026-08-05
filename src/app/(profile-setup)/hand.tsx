import { SetupScreen } from '@/components/features/profile-setup/setup-screen';
import { useUserStore } from '@/store/user.store';
import type { DominantHand } from '@/types';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const options: { value: DominantHand; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { value: 'right', label: 'Right-Handed', icon: 'chevrons-right' },
  { value: 'left', label: 'Left-Handed', icon: 'chevrons-left' },
];

export default function ProfileHandScreen() {
  const { draft, setDraft } = useUserStore();

  return (
    <SetupScreen
      step={2}
      total={6}
      title="Dominant hand?"
      subtitle="This helps us tailor technique feedback."
      onNext={() => router.push('/(profile-setup)/skill')}
      nextDisabled={!draft.dominantHand}
    >
      <View className="gap-3">
        {options.map((opt) => {
          const selected = draft.dominantHand === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => setDraft({ dominantHand: opt.value })}
              className={cn(
                'flex-row items-center gap-3 rounded-2xl border p-4',
                selected ? 'border-primary-500 bg-primary-900/30' : 'border-border bg-bg-card',
              )}
            >
              <Feather name={opt.icon} size={20} color={selected ? '#5B8CFF' : '#9AA3B8'} />
              <Text className={cn('flex-1 text-base font-medium', selected ? 'text-text' : 'text-text-secondary')}>{opt.label}</Text>
              {selected ? <Feather name="check-circle" size={18} color="#5B8CFF" /> : null}
            </Pressable>
          );
        })}
      </View>
    </SetupScreen>
  );
}
