import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 16,
        backgroundColor: theme.surfaceSecondary,
        borderWidth: 1,
        borderColor: theme.border,
        padding: 4,
        gap: 4,
      }}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 12,
              paddingVertical: 8,
              backgroundColor: selected ? theme.primary : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: selected ? '#FFFFFF' : theme.textSecondary,
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
