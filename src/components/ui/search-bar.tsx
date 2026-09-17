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

export function SearchBar({ value, onChangeText, placeholder = 'Search', onSubmit, rightSlot }: SearchBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#7B4FD4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <Feather name="search" size={18} color="#C5B3FF" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C5B3FF"
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        style={{ marginLeft: 10, flex: 1, fontSize: 14, color: '#1E1448' }}
        accessibilityLabel={placeholder}
      />
      {value.length > 0 ? (
        <Pressable onPress={() => onChangeText('')} accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={8}>
          <Feather name="x-circle" size={18} color="#C5B3FF" />
        </Pressable>
      ) : null}
      {rightSlot}
    </View>
  );
}
