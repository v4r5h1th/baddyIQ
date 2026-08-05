import { cn } from '@/utils/cn';
import { Pressable, Text, View } from 'react-native';

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({ options, value, onChange, className }: SegmentedControlProps<T>) {
  return (
    <View className={cn('flex-row rounded-2xl bg-bg-input p-1', className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            className={cn('flex-1 items-center justify-center rounded-xl py-2.5', active && 'bg-primary-500')}
          >
            <Text className={cn('text-sm font-semibold', active ? 'text-white' : 'text-text-secondary')}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
