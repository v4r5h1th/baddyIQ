import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TopNav } from '@/components/ui/top-nav';
import { authService } from '@/services/api';
import { useToastStore } from '@/store/toast.store';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToastStore((s) => s.show);

  async function handleSend() {
    if (!email) return;
    setIsLoading(true);
    await authService.forgotPassword(email);
    setIsLoading(false);
    setSent(true);
    showToast('Reset link sent to your email', 'success');
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TopNav title="Forgot Password" />
      <View className="flex-1 gap-6 px-6 pt-6">
        <View className="items-center gap-3">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-primary-900">
            <Feather name={sent ? 'check-circle' : 'key'} size={28} color="#5B8CFF" />
          </View>
          <Text className="text-center text-base text-text-secondary">
            {sent
              ? `We've sent a password reset link to ${email}. Check your inbox.`
              : "Enter the email associated with your account and we'll send a link to reset your password."}
          </Text>
        </View>
        {!sent ? (
          <View className="gap-4">
            <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" leftIcon="mail" />
            <Button label="Send Reset Link" onPress={handleSend} isLoading={isLoading} fullWidth size="lg" />
          </View>
        ) : (
          <Button label="Back to Login" onPress={() => router.replace('/(auth)/login')} fullWidth size="lg" />
        )}
      </View>
    </SafeAreaView>
  );
}
