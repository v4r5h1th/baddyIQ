import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

interface TopNavProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightSlot?: React.ReactNode;
  className?: string;
}

export function TopNav({ title, onBack, showBack = true, rightSlot, className }: TopNavProps) {
  return (
    <View className={cn('flex-row items-center justify-between px-4 py-3', className)}>
      <View className="w-10">
        {showBack ? (
          <IconButton
            accessibilityLabel="Go back"
            variant="filled"
            onPress={onBack ?? (() => router.back())}
          >
            <Feather name="chevron-left" size={20} color="#F4F6FB" />
          </IconButton>
        ) : null}
      </View>
      {title ? <Text className="flex-1 text-center text-base font-semibold text-text">{title}</Text> : <View className="flex-1" />}
      <View className="w-10 items-end">{rightSlot}</View>
    </View>
  );
}
