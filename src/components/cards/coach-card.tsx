import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export function CoachCard({ summary, onPress }: { summary: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        gap: 12,
        borderRadius: 24,
        backgroundColor: '#F9EDFD',
        padding: 20,
        borderWidth: 1,
        borderColor: '#EAD0F5',
        shadowColor: '#6E32CC',
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
              backgroundColor: '#F8E9FD',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="zap" size={16} color="#6E32CC" />
          </View>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#6E32CC', letterSpacing: 0.5 }}>
            AI COACH INSIGHT
          </Text>
        </View>
        <Feather name="arrow-right" size={18} color="#6E32CC" />
      </View>
      <Text style={{ fontSize: 14, color: '#0A0841', lineHeight: 22, fontWeight: '500' }}>
        {summary}
      </Text>
    </Pressable>
  );
}
