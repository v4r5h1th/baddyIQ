import { Button } from '@/components/ui/button';
import { Input, PasswordInput } from '@/components/ui/input';
import { TopNav } from '@/components/ui/top-nav';
import { useAuthStore } from '@/store/auth.store';
import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuthStore();

  async function handleSignup() {
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    await signup(name, email, password);
    router.push('/(auth)/verify-email');
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TopNav title="Create Account" />
      <ScrollView contentContainerClassName="gap-4 px-6 pb-8" keyboardShouldPersistTaps="handled">
        <View className="gap-4">
          <Input label="Full Name" value={name} onChangeText={setName} leftIcon="user" placeholder="Alex Carter" />
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" leftIcon="mail" placeholder="you@example.com" />
          <PasswordInput label="Password" value={password} onChangeText={setPassword} placeholder="At least 8 characters" />
          <PasswordInput label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Re-enter password" />
          {error ? <Text className="text-sm text-danger">{error}</Text> : null}
          <Button label="Create Account" onPress={handleSignup} isLoading={isLoading} fullWidth size="lg" />
        </View>

        <View className="flex-row items-center gap-3 py-2">
          <View className="h-px flex-1 bg-border" />
          <Text className="text-xs text-text-muted">or sign up with</Text>
          <View className="h-px flex-1 bg-border" />
        </View>

        <View className="flex-row gap-3">
          <Button label="Google" variant="secondary" className="flex-1" leftIcon={<Feather name="chrome" size={16} color="#F4F6FB" />} />
          <Button label="Apple" variant="secondary" className="flex-1" leftIcon={<Feather name="smartphone" size={16} color="#F4F6FB" />} />
        </View>

        <View className="flex-row justify-center gap-1 pt-2">
          <Text className="text-sm text-text-secondary">Already have an account?</Text>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text className="text-sm font-semibold text-primary-400">Log In</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
