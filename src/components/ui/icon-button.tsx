import { cn } from '@/utils/cn';
import { Pressable, type PressableProps } from 'react-native';

interface IconButtonProps extends PressableProps {
  children: React.ReactNode;
  size?: number;
  variant?: 'ghost' | 'filled';
  className?: string;
  accessibilityLabel: string;
}

export function IconButton({
  children,
  size = 40,
  variant = 'ghost',
  className,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={8}
      style={{ width: size, height: size }}
      className={cn(
        'items-center justify-center rounded-full',
        variant === 'filled' ? 'bg-bg-card border border-border' : 'active:bg-bg-card/60',
        className,
      )}
      {...props}
    >
      {children}
    </Pressable>
  );
}
