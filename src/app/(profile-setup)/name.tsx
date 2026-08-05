import { SetupScreen } from '@/components/features/profile-setup/setup-screen';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/store/user.store';
import { router } from 'expo-router';

export default function ProfileNameScreen() {
  const { draft, setDraft } = useUserStore();

  return (
    <SetupScreen
      step={0}
      total={6}
      title="What's your name?"
      subtitle="This is how you'll appear to opponents and friends."
      onNext={() => router.push('/(profile-setup)/age')}
      nextDisabled={draft.name.trim().length < 2}
    >
      <Input
        label="Player Name"
        value={draft.name}
        onChangeText={(name) => setDraft({ name })}
        placeholder="Alex Carter"
        autoFocus
        leftIcon="user"
      />
    </SetupScreen>
  );
}
