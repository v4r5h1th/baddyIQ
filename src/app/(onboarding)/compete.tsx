import { OnboardingScreen } from '@/components/features/onboarding/onboarding-screen';
import { useAuthStore } from '@/store/auth.store';
import { router } from 'expo-router';

export default function CompeteScreen() {
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  function finish() {
    completeOnboarding();
    router.replace('/(auth)/login');
  }

  return (
    <OnboardingScreen
      step={4}
      total={5}
      icon="award"
      title="Climb the Leaderboard"
      description="Compare your progress with friends and players around the world."
      nextLabel="Get Started"
      onNext={finish}
      onSkip={finish}
    />
  );
}
