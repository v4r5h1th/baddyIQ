import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export function CoachCard({ summary, onPress }: { summary: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        gap: 12,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        padding: 18,
        shadowColor: '#7B4FD4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 14,
        elevation: 4,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: '#F0ECFF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 14 }}>✦</Text>
        </View>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#7B4FD4', letterSpacing: 0.8 }}>
          AI COACH SAYS
        </Text>
      </View>
      <Text numberOfLines={4} style={{ fontSize: 14, lineHeight: 22, color: '#5C4F8A', fontWeight: '500' }}>
        {summary}
      </Text>
      {onPress ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#7B4FD4' }}>Ask Coach</Text>
          <Feather name="arrow-right" size={14} color="#7B4FD4" />
        </View>
      ) : null}
    </Pressable>
  );
}
