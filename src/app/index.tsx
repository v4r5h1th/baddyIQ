import { useAuthStore } from '@/store/auth.store';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

export default function SplashScreenRoute() {
  const { hasSeenOnboarding, isAuthenticated, hasCompletedProfileSetup, hasGrantedPermissions } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenOnboarding) return router.replace('/(onboarding)/welcome');
      if (!isAuthenticated) return router.replace('/(auth)/login');
      if (!hasCompletedProfileSetup) return router.replace('/(profile-setup)/name');
      if (!hasGrantedPermissions) return router.replace('/(permissions)/camera');
      return router.replace('/(tabs)');
    }, 1400);
    return () => clearTimeout(timer);
  }, [hasSeenOnboarding, isAuthenticated, hasCompletedProfileSetup, hasGrantedPermissions]);

  return (
    <View className="flex-1 items-center justify-center bg-bg">
      <Animated.View entering={ZoomIn.duration(500)} className="h-20 w-20 items-center justify-center rounded-3xl bg-primary-500">
        <Feather name="crosshair" size={40} color="#fff" />
      </Animated.View>
      <Animated.View entering={FadeIn.delay(200).duration(500)} className="mt-5 items-center">
        <Text className="text-3xl font-bold text-text">RallyIQ</Text>
        <Text className="mt-1 text-sm text-text-secondary">AI-powered badminton coaching</Text>
      </Animated.View>
    </View>
  );
}
