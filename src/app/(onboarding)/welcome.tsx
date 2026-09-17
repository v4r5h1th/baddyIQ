import { OnboardingScreen } from '@/components/features/onboarding/onboarding-screen';
import { useAuthStore } from '@/store/auth.store';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  const { completeOnboarding, skipToApp } = useAuthStore();
  return (
    <OnboardingScreen
      step={0}
      total={5}
      icon="zap"
      title="Welcome to RallyIQ"
      description="Your personal AI badminton coach. Turn every match into actionable insight."
      onNext={() => router.push('/(onboarding)/track')}
      onSkip={() => {
        completeOnboarding();
        skipToApp();
        router.replace('/(tabs)');
      }}
    />
  );
}
