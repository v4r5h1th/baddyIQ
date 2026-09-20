import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

export function CoachCard({ summary, onPress }: { summary: string; onPress?: () => void }) {
  const theme = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        gap: 12,
        borderRadius: 24,
        backgroundColor: theme.card,
        padding: 20,
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: theme.surfaceSecondary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="zap" size={16} color={theme.primary} />
          </View>
          <Text style={{ fontSize: 13, fontWeight: '700', color: theme.primary, letterSpacing: 0.5 }}>
            AI COACH INSIGHT
          </Text>
        </View>
        <Feather name="arrow-right" size={18} color={theme.primary} />
      </View>
      <Text style={{ fontSize: 14, color: theme.text, lineHeight: 22, fontWeight: '500' }}>
        {summary}
      </Text>
    </Pressable>
  );
}
