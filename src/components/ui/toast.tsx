import { useToastStore } from '@/store/toast.store';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ToastHost() {
  const { toast, hide } = useToastStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(hide, 3200);
    return () => clearTimeout(timer);
  }, [toast, hide]);

  if (!toast) return null;

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={{ bottom: insets.bottom + 76 }}
      className="absolute left-4 right-4 z-50"
    >
      <View
        className={cn(
          'flex-row items-center justify-between rounded-2xl border px-4 py-3.5 shadow-lg',
          toast.variant === 'success' && 'border-accent-dark bg-bg-elevated',
          toast.variant === 'error' && 'border-danger bg-bg-elevated',
          toast.variant === 'default' && 'border-border bg-bg-elevated',
        )}
      >
        <Text className="flex-1 pr-3 text-sm text-text">{toast.message}</Text>
        {toast.actionLabel ? (
          <Pressable
            onPress={() => {
              toast.onAction?.();
              hide();
            }}
          >
            <Text className="text-sm font-semibold text-primary-400">{toast.actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}
