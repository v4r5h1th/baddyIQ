import { Button } from '@/components/ui/button';
import { Input, PasswordInput } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth.store';
import { useToastStore } from '@/store/toast.store';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('alex.carter@rallyiq.app');
  const [password, setPassword] = useState('••••••••');
  const { login, continueWithGoogle, continueWithApple, isLoading, error, clearError } = useAuthStore();
  const showToast = useToastStore((s) => s.show);

  async function handleLogin() {
    clearError();
    await login(email, password);
    if (!useAuthStore.getState().error) {
      router.replace('/(profile-setup)/name');
    }
  }

  async function handleSocial(provider: 'google' | 'apple') {
    if (provider === 'google') await continueWithGoogle();
    else await continueWithApple();
    showToast(`Signed in with ${provider === 'google' ? 'Google' : 'Apple'}`, 'success');
    router.replace('/(profile-setup)/name');
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="gap-6 px-6 py-8" keyboardShouldPersistTaps="handled">
        <View className="items-center gap-2">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-primary-500">
            <Feather name="crosshair" size={30} color="#fff" />
          </View>
          <Text className="mt-2 text-2xl font-bold text-text">Welcome back</Text>
          <Text className="text-sm text-text-secondary">Log in to continue your training</Text>
        </View>

        <View className="gap-4">
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" leftIcon="mail" />
          <PasswordInput label="Password" value={password} onChangeText={setPassword} />
          {error ? <Text className="text-sm text-danger">{error}</Text> : null}
          <Link href="/(auth)/forgot-password" asChild>
            <Pressable className="self-end">
              <Text className="text-sm font-medium text-primary-400">Forgot password?</Text>
            </Pressable>
          </Link>
          <Button label="Log In" onPress={handleLogin} isLoading={isLoading} fullWidth size="lg" />
        </View>

        <View className="flex-row items-center gap-3">
          <View className="h-px flex-1 bg-border" />
          <Text className="text-xs text-text-muted">or continue with</Text>
          <View className="h-px flex-1 bg-border" />
        </View>

        <View className="flex-row gap-3">
          <Button
            label="Google"
            variant="secondary"
            className="flex-1"
            leftIcon={<Feather name="chrome" size={16} color="#F4F6FB" />}
            onPress={() => handleSocial('google')}
          />
          <Button
            label="Apple"
            variant="secondary"
            className="flex-1"
            leftIcon={<Feather name="smartphone" size={16} color="#F4F6FB" />}
            onPress={() => handleSocial('apple')}
          />
        </View>

        <View className="flex-row justify-center gap-1">
          <Text className="text-sm text-text-secondary">Don&apos;t have an account?</Text>
          <Link href="/(auth)/signup" asChild>
            <Pressable>
              <Text className="text-sm font-semibold text-primary-400">Sign Up</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
