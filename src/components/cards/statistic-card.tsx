import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface StatisticCardProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  className?: string;
}

export function StatisticCard({ icon, label, value, trend, trendPositive = true }: StatisticCardProps) {
  return (
    <View
      style={{
        flex: 1,
        gap: 8,
        borderRadius: 20,
        backgroundColor: '#F9EDFD',
        padding: 16,
        borderWidth: 1,
        borderColor: '#EAD0F5',
        shadowColor: '#6E32CC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#F8E9FD',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name={icon} size={18} color="#6E32CC" />
      </View>
      <Text style={{ fontSize: 11, color: '#615092' }}>{label}</Text>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0A0841', letterSpacing: -0.5 }}>{value}</Text>
      {trend ? (
        <Text
          style={{
            fontSize: 10,
            fontWeight: '600',
            color: trendPositive ? '#6E32CC' : '#D46CC7',
          }}
        >
          {trend}
        </Text>
      ) : null}
    </View>
  );
}
