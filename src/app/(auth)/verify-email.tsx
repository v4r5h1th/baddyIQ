import { Button } from '@/components/ui/button';
import { TopNav } from '@/components/ui/top-nav';
import { authService } from '@/services/api';
import { useToastStore } from '@/store/toast.store';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmailScreen() {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);
  const showToast = useToastStore((s) => s.show);

  function handleChange(text: string, index: number) {
    const next = [...digits];
    next[index] = text.slice(-1);
    setDigits(next);
    if (text && index < 5) inputs.current[index + 1]?.focus();
  }

  async function handleVerify() {
    setIsLoading(true);
    await authService.verifyEmail(digits.join(''));
    setIsLoading(false);
    showToast('Email verified successfully', 'success');
    router.replace('/(profile-setup)/name');
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TopNav title="Verify Email" />
      <View className="flex-1 gap-8 px-6 pt-6">
        <View className="items-center gap-3">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-primary-900">
            <Feather name="mail" size={28} color="#5B8CFF" />
          </View>
          <Text className="text-center text-base text-text-secondary">
            Enter the 6-digit code we sent to your email address to verify your account.
          </Text>
        </View>
        <View className="flex-row justify-center gap-2">
          {digits.map((digit, i) => (
            <TextInput
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={digit}
              onChangeText={(t) => handleChange(t, i)}
              keyboardType="number-pad"
              maxLength={1}
              className="h-14 w-12 rounded-2xl border border-border bg-bg-input text-center text-xl font-bold text-text"
              accessibilityLabel={`Digit ${i + 1}`}
            />
          ))}
        </View>
        <Button label="Verify" onPress={handleVerify} isLoading={isLoading} fullWidth size="lg" disabled={digits.some((d) => !d)} />
        <Text className="text-center text-sm text-text-secondary">
          Didn&apos;t get a code? <Text className="font-semibold text-primary-400">Resend</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
