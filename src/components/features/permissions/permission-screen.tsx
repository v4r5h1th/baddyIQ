import { Button } from '@/components/ui/button';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PermissionScreenProps {
  step: number;
  total: number;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  onAllow: () => void;
  onSkip: () => void;
  isLoading?: boolean;
}

export function PermissionScreen({ step, total, icon, title, description, onAllow, onSkip, isLoading }: PermissionScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-bg px-6">
      <View className="flex-1 items-center justify-center gap-6">
        <View className="h-28 w-28 items-center justify-center rounded-full bg-primary-900">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-primary-500">
            <Feather name={icon} size={30} color="#fff" />
          </View>
        </View>
        <View className="items-center gap-2 px-4">
          <Text className="text-center text-2xl font-bold text-text">{title}</Text>
          <Text className="text-center text-base leading-6 text-text-secondary">{description}</Text>
        </View>
      </View>
      <View className="gap-3 pb-6">
        <View className="flex-row justify-center gap-2 pb-2">
          {Array.from({ length: total }).map((_, i) => (
            <View key={i} className={`h-2 rounded-full ${i === step ? 'w-6 bg-primary-500' : 'w-2 bg-border-light'}`} />
          ))}
        </View>
        <Button label="Allow Access" onPress={onAllow} isLoading={isLoading} fullWidth size="lg" />
        <Pressable onPress={onSkip} accessibilityRole="button" className="items-center py-2">
          <Text className="text-sm font-medium text-text-secondary">Not Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
