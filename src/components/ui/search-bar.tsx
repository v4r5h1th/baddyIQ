import { Feather } from '@expo/vector-icons';
import { Pressable, TextInput, View } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  className?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search...', onSubmit }: SearchBarProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 18,
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
        paddingHorizontal: 14,
        height: 48,
      }}
    >
      <Feather name="search" size={18} color={theme.primary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        style={{ flex: 1, fontSize: 14, color: theme.text }}
        accessibilityLabel={placeholder}
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={8} accessibilityLabel="Clear search">
          <Feather name="x" size={16} color={theme.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}
