import { PermissionScreen } from '@/components/features/permissions/permission-screen';
import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';

export default function CameraPermissionScreen() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleAllow() {
    setIsLoading(true);
    try {
      if (Camera && typeof Camera.requestCameraPermissionsAsync === 'function') {
        await Camera.requestCameraPermissionsAsync();
      }
    } catch (e) {
      console.warn('Camera permission request error:', e);
    } finally {
      setIsLoading(false);
      router.push('/(permissions)/notifications');
    }
  }

  return (
    <PermissionScreen
      step={0}
      total={3}
      icon="camera"
      title="Enable Camera Access"
      description="RallyIQ needs your camera to record matches and analyze your gameplay with AI."
      onAllow={handleAllow}
      onSkip={() => router.push('/(permissions)/notifications')}
      isLoading={isLoading}
    />
  );
}
