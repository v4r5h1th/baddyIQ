import { cn } from '@/utils/cn';
import { Pressable, type PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface FabProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FloatingActionButton({ children, className, ...props }: FabProps) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPressIn={() => {
        scale.value = withTiming(0.92, { duration: 100 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 120 });
      }}
      style={style}
      className={cn(
        'h-16 w-16 items-center justify-center rounded-full bg-primary-500 shadow-lg shadow-primary-900',
        className,
      )}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
