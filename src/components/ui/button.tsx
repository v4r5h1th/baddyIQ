import { cn } from '@/utils/cn';
import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const containerVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-bg-card border border-border-light active:bg-bg-input',
  outlined: 'bg-transparent border border-primary-500 active:bg-primary-900/30',
  text: 'bg-transparent',
  danger: 'bg-danger active:opacity-90',
};

const textVariants: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-text',
  outlined: 'text-primary-400',
  text: 'text-primary-400',
  danger: 'text-white',
};

const sizeVariants: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-xl gap-1',
  md: 'px-5 py-3.5 rounded-2xl gap-2',
  lg: 'px-6 py-4 rounded-2xl gap-2',
};

const textSizeVariants: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  isLoading,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled || isLoading}
      onPressIn={() => {
        scale.value = withTiming(0.96, { duration: 100 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 120 });
      }}
      style={animatedStyle}
      className={cn(
        'flex-row items-center justify-center',
        containerVariants[variant],
        sizeVariants[size],
        fullWidth && 'w-full',
        (disabled || isLoading) && 'opacity-50',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : '#5B8CFF'} />
      ) : (
        <>
          {leftIcon}
          <Text className={cn('font-semibold', textVariants[variant], textSizeVariants[size])}>
            {label}
          </Text>
          {rightIcon}
        </>
      )}
    </AnimatedPressable>
  );
}
