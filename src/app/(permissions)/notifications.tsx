import { PermissionScreen } from '@/components/features/permissions/permission-screen';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';

export default function NotificationsPermissionScreen() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleAllow() {
    setIsLoading(true);
    await Notifications.requestPermissionsAsync();
    setIsLoading(false);
    router.push('/(permissions)/storage');
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
