import { useAuthStore } from '@/store/auth.store';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

export default function SplashScreenRoute() {
  const { isAuthenticated, hasSeenOnboarding } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      // By default or when authenticated, go directly to (tabs)
      if (isAuthenticated) {
        return router.replace('/(tabs)');
      }
      if (!hasSeenOnboarding) {
        return router.replace('/(onboarding)/welcome');
      }
      return router.replace('/(auth)/login');
    }, 800);
    return () => clearTimeout(timer);
  }, [isAuthenticated, hasSeenOnboarding]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5DDFD' }}>
      <Animated.View
        entering={ZoomIn.duration(500)}
        style={{
          width: 80,
          height: 80,
          borderRadius: 28,
          backgroundColor: '#6E32CC',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <Feather name="crosshair" size={40} color="#FFFFFF" />
      </Animated.View>
      <Animated.View entering={FadeIn.delay(200).duration(500)} style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '800', color: '#0A0841', letterSpacing: -0.5 }}>BaddyIQ</Text>
        <Text style={{ marginTop: 4, fontSize: 14, color: '#615092', fontWeight: '500' }}>AI-powered badminton coaching</Text>
      </Animated.View>
    </View>
  );
}
