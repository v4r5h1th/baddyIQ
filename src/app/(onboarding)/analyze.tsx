import { OnboardingScreen } from '@/components/features/onboarding/onboarding-screen';
import { useAuthStore } from '@/store/auth.store';
import { router } from 'expo-router';

export default function AnalyzeScreen() {
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  return (
    <OnboardingScreen
      step={2}
      total={5}
      icon="cpu"
      title="AI-Powered Analysis"
      description="Our AI tracks the court, shuttle and your movement to break down every rally."
      onNext={() => router.push('/(onboarding)/improve')}
      onSkip={() => {
        completeOnboarding();
        router.replace('/(auth)/login');
      }}
    />
  );
}
