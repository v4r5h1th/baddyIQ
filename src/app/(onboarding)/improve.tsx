import { OnboardingScreen } from '@/components/features/onboarding/onboarding-screen';
import { useAuthStore } from '@/store/auth.store';
import { router } from 'expo-router';

export default function ImproveScreen() {
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  return (
    <OnboardingScreen
      step={3}
      total={5}
      icon="trending-up"
      title="Personalized Training"
      description="Get custom drills targeting your exact weaknesses so you improve faster."
      onNext={() => router.push('/(onboarding)/compete')}
      onSkip={() => {
        completeOnboarding();
        router.replace('/(auth)/login');
      }}
    />
  );
}
