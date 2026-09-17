import { Button } from '@/components/ui/button';
import { Input, PasswordInput } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth.store';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('alex.carter@rallyiq.app');
  const [password, setPassword] = useState('••••••••');
  const { login, skipToApp, isLoading, error, clearError } = useAuthStore();

  async function handleLogin() {
    clearError();
    await login(email, password);
    router.replace('/(tabs)');
  }

  function handleSkip() {
    skipToApp();
    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5DDFD' }}>
      <ScrollView contentContainerStyle={{ gap: 24, paddingHorizontal: 24, paddingVertical: 32 }} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 24,
              backgroundColor: '#6E32CC',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#6E32CC',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Feather name="crosshair" size={30} color="#FFFFFF" />
          </View>
          <Text style={{ fontSize: 26, fontWeight: '800', color: '#0A0841', marginTop: 8 }}>Welcome back</Text>
          <Text style={{ fontSize: 14, color: '#615092' }}>Log in to continue your training</Text>
        </View>

        <View style={{ gap: 16 }}>
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" leftIcon="mail" />
          <PasswordInput label="Password" value={password} onChangeText={setPassword} />
          {error ? <Text style={{ fontSize: 13, color: '#EF5350' }}>{error}</Text> : null}
          <Link href="/(auth)/forgot-password" asChild>
            <Pressable style={{ alignSelf: 'flex-end' }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#6E32CC' }}>Forgot password?</Text>
            </Pressable>
          </Link>
          <Button label="Log In" onPress={handleLogin} isLoading={isLoading} fullWidth size="lg" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ height: 1, flex: 1, backgroundColor: '#EAD0F5' }} />
          <Text style={{ fontSize: 12, color: '#8F7FB8' }}>or continue with</Text>
          <View style={{ height: 1, flex: 1, backgroundColor: '#EAD0F5' }} />
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button
            label="Google"
            variant="secondary"
            className="flex-1"
            leftIcon={<Feather name="chrome" size={16} color="#0A0841" />}
            onPress={handleSkip}
          />
          <Button
            label="Apple"
            variant="secondary"
            className="flex-1"
            leftIcon={<Feather name="smartphone" size={16} color="#0A0841" />}
            onPress={handleSkip}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
          <Text style={{ fontSize: 14, color: '#615092' }}>Don&apos;t have an account?</Text>
          <Link href="/(auth)/signup" asChild>
            <Pressable>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#6E32CC' }}>Sign Up</Text>
            </Pressable>
          </Link>
        </View>

        <Pressable
          onPress={handleSkip}
          style={{
            alignSelf: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            backgroundColor: '#F9EDFD',
            marginTop: 4,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#6E32CC' }}>
            Explore App as Guest →
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
