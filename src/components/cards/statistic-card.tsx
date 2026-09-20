import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

interface StatisticCardProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  className?: string;
}

export function StatisticCard({ icon, label, value, trend, trendPositive = true }: StatisticCardProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        gap: 8,
        borderRadius: 20,
        backgroundColor: theme.card,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.border,
        shadowColor: theme.primary,
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
          backgroundColor: theme.surfaceSecondary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name={icon} size={18} color={theme.primary} />
      </View>
      <Text style={{ fontSize: 11, color: theme.textSecondary }}>{label}</Text>
      <Text style={{ fontSize: 22, fontWeight: '800', color: theme.text, letterSpacing: -0.5 }}>{value}</Text>
      {trend ? (
        <Text
          style={{
            fontSize: 10,
            fontWeight: '600',
            color: trendPositive ? theme.primary : theme.accentDark,
          }}
        >
          {trend}
        </Text>
      ) : null}
    </View>
  );
}
