import { Pressable, Text, View } from 'react-native';

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 16,
        backgroundColor: '#F8E9FD',
        borderWidth: 1,
        borderColor: '#EAD0F5',
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
              backgroundColor: selected ? '#6E32CC' : 'transparent',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: selected ? '#FFFFFF' : '#615092',
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
