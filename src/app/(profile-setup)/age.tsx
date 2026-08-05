import { SetupScreen } from '@/components/features/profile-setup/setup-screen';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/store/user.store';
import { router } from 'expo-router';

export default function ProfileAgeScreen() {
  const { draft, setDraft } = useUserStore();
  const ageNum = parseInt(draft.age, 10);

  return (
    <SetupScreen
      step={1}
      total={6}
      title="How old are you?"
      subtitle="We use this to compare you with similar age groups."
      onNext={() => router.push('/(profile-setup)/hand')}
      nextDisabled={!draft.age || Number.isNaN(ageNum) || ageNum < 8 || ageNum > 90}
    >
      <Input
        label="Age"
        value={draft.age}
        onChangeText={(age) => setDraft({ age: age.replace(/[^0-9]/g, '') })}
        placeholder="24"
        keyboardType="number-pad"
        leftIcon="calendar"
        autoFocus
      />
    </SetupScreen>
  );
}
