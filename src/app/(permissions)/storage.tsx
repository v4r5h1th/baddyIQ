import { PermissionScreen } from '@/components/features/permissions/permission-screen';
import { useAuthStore } from '@/store/auth.store';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';

export default function StoragePermissionScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const completePermissions = useAuthStore((s) => s.completePermissions);

  async function finish() {
    completePermissions();
    router.replace('/(tabs)');
  }

  async function handleAllow() {
    setIsLoading(true);
    try {
      if (ImagePicker && typeof ImagePicker.requestMediaLibraryPermissionsAsync === 'function') {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
    } catch (e) {
      console.warn('Media library permission error:', e);
    } finally {
      setIsLoading(false);
      finish();
    }
  }

  return (
    <PermissionScreen
      step={2}
      total={3}
      icon="hard-drive"
      title="Storage Access"
      description="Allow storage access so RallyIQ can save match videos and downloaded reports on your device."
      onAllow={handleAllow}
      onSkip={finish}
      isLoading={isLoading}
    />
  );
}
