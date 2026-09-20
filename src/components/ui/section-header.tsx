import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '@/context/theme-context';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, actionLabel, onActionPress, subtitle }: SectionHeaderProps) {
  const theme = useAppTheme();

  return (
    <View style={{ gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: theme.text, letterSpacing: -0.3 }}>{title}</Text>
        {actionLabel && onActionPress ? (
          <Pressable onPress={onActionPress} hitSlop={8}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: theme.primary }}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {subtitle ? <Text style={{ fontSize: 12, color: theme.textSecondary }}>{subtitle}</Text> : null}
    </View>
  );
}
