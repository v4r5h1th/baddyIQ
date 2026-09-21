import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '@/context/theme-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  subtitle?: string;
  className?: string;
  /** Adds a pulsing shimmer effect for important/hero section headers */
  prominent?: boolean;
}

export function SectionHeader({
  title,
  actionLabel,
  onActionPress,
  subtitle,
  prominent = false,
}: SectionHeaderProps) {
  const theme = useAppTheme();

  const shimmer = useSharedValue(0);

  useEffect(() => {
    if (prominent) {
      shimmer.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [prominent]);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: prominent ? 0.55 + shimmer.value * 0.45 : 1,
  }));

  return (
    <View style={{ gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: prominent ? 10 : 8 }}>
          {/* Gradient accent bar — animated pulse when prominent */}
          <Animated.View style={shimmerStyle}>
            <LinearGradient
              colors={[theme.primary, (theme as any).accentDark ?? theme.primary] as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                width: prominent ? 4 : 3,
                height: prominent ? 22 : 18,
                borderRadius: 3,
                opacity: prominent ? 1 : 0.6,
              }}
            />
          </Animated.View>
          <Text
            style={{
              fontSize: prominent ? 18 : 17,
              fontWeight: '800',
              color: theme.text,
              letterSpacing: -0.4,
            }}
          >
            {title}
          </Text>
        </View>
        {actionLabel && onActionPress ? (
          <Pressable onPress={onActionPress} hitSlop={8}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: theme.primary }}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {subtitle ? (
        <Text style={{ fontSize: 12, color: theme.textSecondary, marginLeft: prominent ? 14 : 11 }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
