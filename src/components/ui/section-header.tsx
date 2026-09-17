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
    <View style={{ gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#0A0841', letterSpacing: -0.3 }}>{title}</Text>
        {actionLabel && onActionPress ? (
          <Pressable onPress={onActionPress} hitSlop={8}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#6E32CC' }}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {subtitle ? <Text style={{ fontSize: 12, color: '#615092' }}>{subtitle}</Text> : null}
    </View>
  );
}
