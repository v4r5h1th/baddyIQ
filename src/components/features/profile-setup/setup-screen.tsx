import { Button } from '@/components/ui/button';
import { TopNav } from '@/components/ui/top-nav';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SetupScreenProps {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  nextLabel?: string;
  onNext: () => void;
  nextDisabled?: boolean;
  isLoading?: boolean;
}

export function SetupScreen({
  step,
  total,
  title,
  subtitle,
  children,
  nextLabel = 'Continue',
  onNext,
  nextDisabled,
  isLoading,
}: SetupScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TopNav showBack={step > 0} title={`Step ${step + 1} of ${total}`} />
      <View className="mx-6 h-1 overflow-hidden rounded-full bg-bg-input">
        <View style={{ width: `${((step + 1) / total) * 100}%` }} className="h-full rounded-full bg-primary-500" />
      </View>
      <View className="flex-1 gap-6 px-6 pt-8">
        <View className="gap-1.5">
          <Text className="text-2xl font-bold text-text">{title}</Text>
          {subtitle ? <Text className="text-sm text-text-secondary">{subtitle}</Text> : null}
        </View>
        <View className="flex-1">{children}</View>
        <Button label={nextLabel} onPress={onNext} disabled={nextDisabled} isLoading={isLoading} fullWidth size="lg" className="mb-6" />
      </View>
    </SafeAreaView>
  );
}
