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
  const { signup, skipToApp, isLoading } = useAuthStore();

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
    router.replace('/(tabs)');
  }

  function handleSkip() {
    skipToApp();
    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5DDFD' }}>
      <TopNav
        title="Create Account"
        rightSlot={
          <Pressable onPress={handleSkip} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#F8E9FD' }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#6E32CC' }}>Skip</Text>
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ gap: 16, paddingHorizontal: 24, paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        <View style={{ gap: 14 }}>
          <Input label="Full Name" value={name} onChangeText={setName} leftIcon="user" placeholder="Alex Carter" />
          <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" leftIcon="mail" placeholder="you@example.com" />
          <PasswordInput label="Password" value={password} onChangeText={setPassword} placeholder="At least 8 characters" />
          <PasswordInput label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Re-enter password" />
          {error ? <Text style={{ fontSize: 13, color: '#EF5350' }}>{error}</Text> : null}
          <Button label="Create Account" onPress={handleSignup} isLoading={isLoading} fullWidth size="lg" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }}>
          <View style={{ height: 1, flex: 1, backgroundColor: '#EAD0F5' }} />
          <Text style={{ fontSize: 12, color: '#8F7FB8' }}>or sign up with</Text>
          <View style={{ height: 1, flex: 1, backgroundColor: '#EAD0F5' }} />
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button
            label="Google"
            variant="secondary"
            className="flex-1"
            leftIcon={<Feather name="chrome" size={16} color="#0A0841" />}
            onPress={() => {
              skipToApp();
              router.replace('/(tabs)');
            }}
          />
          <Button
            label="Apple"
            variant="secondary"
            className="flex-1"
            leftIcon={<Feather name="smartphone" size={16} color="#0A0841" />}
            onPress={() => {
              skipToApp();
              router.replace('/(tabs)');
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, paddingTop: 8 }}>
          <Text style={{ fontSize: 14, color: '#615092' }}>Already have an account?</Text>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#6E32CC' }}>Log In</Text>
            </Pressable>
          </Link>
        </View>

        <Pressable
          onPress={handleSkip}
          style={{
            alignSelf: 'center',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 20,
            backgroundColor: '#F9EDFD',
            marginTop: 8,
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
