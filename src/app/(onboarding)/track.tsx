import { OnboardingScreen } from '@/components/features/onboarding/onboarding-screen';
import { useAuthStore } from '@/store/auth.store';
import { router } from 'expo-router';

export default function TrackScreen() {
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  return (
    <OnboardingScreen
      step={1}
      total={5}
      icon="video"
      title="Record Every Match"
      description="Capture your games with your phone camera — no special equipment needed."
      onNext={() => router.push('/(onboarding)/analyze')}
      onSkip={() => {
        completeOnboarding();
        router.replace('/(auth)/login');
      }}
    />
  );
}
