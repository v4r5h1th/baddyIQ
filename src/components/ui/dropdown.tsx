import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';

interface DropdownProps<T extends string> {
  label?: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
}

export function Dropdown<T extends string>({ label, value, options, onChange, className }: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View className={cn('gap-1.5', className)}>
      {label ? <Text className="text-sm font-medium text-text-secondary">{label}</Text> : null}
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        className="flex-row items-center justify-between rounded-2xl border border-border bg-bg-input px-4 py-3.5"
      >
        <Text className="text-base text-text">{selected?.label ?? 'Select'}</Text>
        <Feather name="chevron-down" size={18} color="#9AA3B8" />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 justify-end bg-black/60" onPress={() => setOpen(false)}>
          <Pressable className="max-h-[70%] rounded-t-3xl bg-bg-elevated p-4" onPress={(e) => e.stopPropagation()}>
            <View className="mb-3 h-1 w-10 self-center rounded-full bg-border-light" />
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className="flex-row items-center justify-between rounded-xl px-3 py-3.5 active:bg-bg-card"
                >
                  <Text className="text-base text-text">{item.label}</Text>
                  {item.value === value ? <Feather name="check" size={18} color="#5B8CFF" /> : null}
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
