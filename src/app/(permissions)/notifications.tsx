import { PermissionScreen } from '@/components/features/permissions/permission-screen';
import { router } from 'expo-router';
import { useState } from 'react';

export default function NotificationsPermissionScreen() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleAllow() {
    setIsLoading(true);
    // Expo Go SDK 53+ does not support native remote push notifications directly in Expo Go
    // Mock successful permission grant for Expo Go compatibility
    setTimeout(() => {
      setIsLoading(false);
      router.push('/(permissions)/storage');
    }, 200);
  }

  return (
    <PermissionScreen
      step={1}
      total={3}
      icon="bell"
      title="Stay in the Loop"
      description="Get notified when your match analysis is ready, when friends challenge you, or when you unlock achievements."
      onAllow={handleAllow}
      onSkip={() => router.push('/(permissions)/storage')}
      isLoading={isLoading}
    />
  );
}
