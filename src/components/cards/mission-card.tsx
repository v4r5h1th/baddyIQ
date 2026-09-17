import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function MissionCard({ title, progress, reward }: { title: string; progress: number; reward?: string }) {
  return (
    <View
      style={{
        gap: 12,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        padding: 18,
        shadowColor: '#7B4FD4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: '#7B4FD4',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name="target" size={16} color="#fff" />
        </View>
        <Text style={{ fontSize: 11, fontWeight: '700', color: '#7B4FD4', letterSpacing: 0.8 }}>
          CURRENT MISSION
        </Text>
      </View>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E1448', lineHeight: 20 }}>{title}</Text>
      <View
        style={{
          height: 6,
          overflow: 'hidden',
          borderRadius: 6,
          backgroundColor: '#EDE8FF',
        }}
      >
        <View
          style={{ width: `${progress}%`, height: '100%', borderRadius: 6, backgroundColor: '#7B4FD4' }}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 11, color: '#9087B8' }}>{progress}% complete</Text>
        {reward ? (
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#F06292' }}>{reward}</Text>
        ) : null}
      </View>
    </View>
  );
}
