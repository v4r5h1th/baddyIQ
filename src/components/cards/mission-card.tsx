import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

export function MissionCard({ title, progress, reward }: { title: string; progress: number; reward?: string }) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        gap: 12,
        borderRadius: 24,
        backgroundColor: theme.card,
        padding: 18,
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: theme.primary,
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
            backgroundColor: theme.surfaceSecondary,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Feather name="zap" size={12} color={theme.primary} />
          <Text style={{ fontSize: 11, fontWeight: '700', color: theme.primary, letterSpacing: 0.5 }}>WEEKLY MISSION</Text>
        </View>
        {reward ? (
          <View style={{ backgroundColor: theme.accent, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: theme.primary }}>{reward}</Text>
          </View>
        ) : null}
      </View>
      <Text style={{ fontSize: 14, fontWeight: '600', color: theme.text, lineHeight: 20 }}>{title}</Text>
      <View style={{ gap: 6 }}>
        <View style={{ height: 7, borderRadius: 4, backgroundColor: theme.surfaceSecondary, overflow: 'hidden' }}>
          <View style={{ width: `${progress}%`, height: '100%', borderRadius: 4, backgroundColor: theme.primary }} />
        </View>
        <Text style={{ fontSize: 11, color: theme.textSecondary, textAlign: 'right' }}>{progress}% completed</Text>
      </View>
    </View>
  );
}
