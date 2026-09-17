import { Feather } from '@expo/vector-icons';
import { Pressable, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  className?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search...', onSubmit }: SearchBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 18,
        backgroundColor: '#F9EDFD',
        borderWidth: 1,
        borderColor: '#EAD0F5',
        paddingHorizontal: 14,
        height: 48,
      }}
    >
      <Feather name="search" size={18} color="#6E32CC" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8F7FB8"
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        style={{ flex: 1, fontSize: 14, color: '#0A0841' }}
        accessibilityLabel={placeholder}
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={8} accessibilityLabel="Clear search">
          <Feather name="x" size={16} color="#8F7FB8" />
        </Pressable>
      ) : null}
    </View>
  );
}
