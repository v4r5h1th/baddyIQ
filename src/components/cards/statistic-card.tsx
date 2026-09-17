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

export function StatisticCard({ icon, label, value, trend, trendPositive }: StatisticCardProps) {
  return (
    <View
      style={{
        flex: 1,
        gap: 8,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        padding: 14,
        shadowColor: '#7B4FD4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#F0ECFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name={icon} size={16} color="#7B4FD4" />
      </View>
      <Text style={{ fontSize: 20, fontWeight: '800', color: '#1E1448', letterSpacing: -0.5 }}>{value}</Text>
      <Text style={{ fontSize: 11, color: '#9087B8' }}>{label}</Text>
      {trend ? (
        <Text style={{ fontSize: 11, fontWeight: '600', color: trendPositive ? '#7B4FD4' : '#F06292' }}>
          {trend}
        </Text>
      ) : null}
    </View>
  );
}
