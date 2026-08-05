import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { Pressable, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  className?: string;
  rightSlot?: React.ReactNode;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search', onSubmit, className, rightSlot }: SearchBarProps) {
  return (
    <View className={cn('flex-row items-center rounded-2xl border border-border bg-bg-input px-4 py-3', className)}>
      <Feather name="search" size={18} color="#9AA3B8" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7385"
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        className="ml-2 flex-1 text-base text-text"
        accessibilityLabel={placeholder}
      />
      {value.length > 0 ? (
        <Pressable onPress={() => onChangeText('')} accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={8}>
          <Feather name="x-circle" size={18} color="#6B7385" />
        </Pressable>
      ) : null}
      {rightSlot}
    </View>
  );
}
