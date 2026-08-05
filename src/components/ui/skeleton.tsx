import { cn } from '@/utils/cn';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface SkeletonProps {
  className?: string;
  width?: number | `${number}%`;
  height?: number;
  rounded?: string;
}

export function Skeleton({ className, width, height = 16, rounded = 'rounded-xl' }: SkeletonProps) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.9, { duration: 700 }), -1, true);
  }, [opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[style, { width, height }]}
      className={cn('bg-bg-card', rounded, className)}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <View className={cn('gap-3 rounded-3xl border border-border bg-bg-card p-4', className)}>
      <View className="flex-row items-center gap-3">
        <Skeleton width={48} height={48} rounded="rounded-full" />
        <View className="flex-1 gap-2">
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
      <Skeleton width="100%" height={80} rounded="rounded-2xl" />
    </View>
  );
}
