import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function MissionCard({ title, progress, reward }: { title: string; progress: number; reward?: string }) {
  return (
    <View
      style={{
        gap: 12,
        borderRadius: 24,
        backgroundColor: '#F9EDFD',
        padding: 18,
        borderWidth: 1,
        borderColor: '#EAD0F5',
        shadowColor: '#6E32CC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: '#F8E9FD',
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Feather name="zap" size={12} color="#6E32CC" />
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#6E32CC', letterSpacing: 0.5 }}>WEEKLY MISSION</Text>
        </View>
        {reward ? (
          <View style={{ backgroundColor: '#FAC0F6', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#6E32CC' }}>{reward}</Text>
          </View>
        ) : null}
      </View>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#0A0841', lineHeight: 20 }}>{title}</Text>
      <View style={{ gap: 6 }}>
        <View style={{ height: 7, borderRadius: 4, backgroundColor: '#F8E9FD', overflow: 'hidden' }}>
          <View style={{ width: `${progress}%`, height: '100%', borderRadius: 4, backgroundColor: '#6E32CC' }} />
        </View>
        <Text style={{ fontSize: 11, color: '#615092', textAlign: 'right' }}>{progress}% completed</Text>
      </View>
    </View>
  );
}
