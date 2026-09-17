import { Pressable, Text, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, actionLabel, onActionPress, subtitle }: SectionHeaderProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <View>
        <Text style={{ fontSize: 17, fontWeight: '800', color: '#1E1448', letterSpacing: -0.3 }}>{title}</Text>
        {subtitle ? (
          <Text style={{ marginTop: 2, fontSize: 12, color: '#9087B8' }}>{subtitle}</Text>
        ) : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onActionPress} accessibilityRole="button" hitSlop={8}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#7B4FD4' }}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
