import { Avatar } from '@/components/ui/avatar';
import type { LeaderboardEntry } from '@/types';
import { useAppTheme } from '@/context/theme-context';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  withSpring,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface LeaderboardPodiumProps {
  entries: LeaderboardEntry[];
  onPress?: (userId: string) => void;
}

/** Confetti spark dot that floats up with randomised delay */
function Spark({ color, delay, x, size }: { color: string; delay: number; x: number; size: number }) {
  const y = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    y.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-32, { duration: 1600, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 0 }),
        ),
        -1,
        false,
      ),
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(1, { duration: 1000 }),
          withTiming(0, { duration: 300 }),
          withTiming(0, { duration: 0 }),
        ),
        -1,
        false,
      ),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { translateX: x }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          position: 'absolute',
          bottom: 0,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
      ]}
    />
  );
}

/** Pulsing glow ring around the avatar */
function GlowRing({ color, size }: { color: string; size: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.7);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.18, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 900 }),
        withTiming(0.7, { duration: 900 }),
      ),
      -1,
      false,
    );
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const ring = size + 10;
  return (
    <Animated.View
      style={[
        ringStyle,
        {
          position: 'absolute',
          width: ring,
          height: ring,
          borderRadius: ring / 2,
          borderWidth: 2.5,
          borderColor: color,
        },
      ]}
    />
  );
}

/** Bouncing crown for 1st place */
function BouncingCrown() {
  const y = useSharedValue(0);

  useEffect(() => {
    y.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 500, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 500, easing: Easing.in(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, []);

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }] }));

  return (
    <Animated.Text style={[style, { fontSize: 22, position: 'absolute', top: -28, alignSelf: 'center' }]}>
      👑
    </Animated.Text>
  );
}

interface PodiumCardProps {
  entry: LeaderboardEntry;
  rank: 1 | 2 | 3;
  delay: number;
  onPress?: () => void;
}

const RANK_CONFIG = {
  1: {
    avatarSize: 72,
    height: 130,
    glowColor: '#F5C842',
    badge: '#F5C842',
    badgeText: '#6E32CC',
    gradientColors: ['#FFF8DC', '#FFF3C4'] as [string, string],
    borderColor: '#F5C842',
    rankLabel: '1st',
  },
  2: {
    avatarSize: 58,
    height: 110,
    glowColor: '#9B5DE5',
    badge: '#9B5DE5',
    badgeText: '#FFFFFF',
    gradientColors: ['#F3EAFF', '#EAD6FF'] as [string, string],
    borderColor: '#9B5DE5',
    rankLabel: '2nd',
  },
  3: {
    avatarSize: 56,
    height: 105,
    glowColor: '#F2994A',
    badge: '#F2994A',
    badgeText: '#FFFFFF',
    gradientColors: ['#FFF0E6', '#FFE5CC'] as [string, string],
    borderColor: '#F2994A',
    rankLabel: '3rd',
  },
};

function PodiumCard({ entry, rank, delay, onPress }: PodiumCardProps) {
  const theme = useAppTheme();
  const cfg = RANK_CONFIG[rank];

  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 100 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const sparkColors = [theme.primary, cfg.glowColor, '#FAC0F6', '#8B52E3'];
  const sparks = sparkColors.map((c, i) => (
    <Spark
      key={i}
      color={c}
      delay={i * 350 + delay}
      x={(i - 1.5) * 10}
      size={rank === 1 ? 5 : 4}
    />
  ));

  const trendColor =
    entry.trend === 'up' ? '#22C55E' : entry.trend === 'down' ? '#EF4444' : theme.textMuted;
  const trendIcon: 'arrow-up' | 'arrow-down' | 'minus' =
    entry.trend === 'up' ? 'arrow-up' : entry.trend === 'down' ? 'arrow-down' : 'minus';

  return (
    <Pressable onPress={onPress} style={{ flex: 1, alignItems: 'center' }}>
      <Animated.View style={[cardStyle, { width: '100%', alignItems: 'center' }]}>
        {/* Avatar + glow ring + crown */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            height: cfg.avatarSize + 28,
          }}
        >
          {rank === 1 && <BouncingCrown />}
          {/* Glow ring */}
          <View style={{ alignItems: 'center', justifyContent: 'center', width: cfg.avatarSize, height: cfg.avatarSize }}>
            <GlowRing color={cfg.glowColor} size={cfg.avatarSize} />
            <View
              style={{
                width: cfg.avatarSize,
                height: cfg.avatarSize,
                borderRadius: cfg.avatarSize / 2,
                borderWidth: 2.5,
                borderColor: cfg.borderColor,
                overflow: 'hidden',
              }}
            >
              <Avatar uri={entry.avatarUrl} name={entry.name} size={cfg.avatarSize} />
            </View>
          </View>
          {/* Rank badge */}
          <View
            style={{
              position: 'absolute',
              bottom: -2,
              right: 0,
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: cfg.badge,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderColor: '#FFFFFF',
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '900', color: cfg.badgeText }}>{rank}</Text>
          </View>
          {/* Confetti sparks */}
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' }}>
            {sparks}
          </View>
        </View>

        {/* Card body */}
        <LinearGradient
          colors={cfg.gradientColors}
          style={{
            width: '100%',
            borderRadius: 18,
            borderWidth: 1.5,
            borderColor: cfg.borderColor + '60',
            padding: 10,
            alignItems: 'center',
            gap: 4,
            minHeight: cfg.height,
            justifyContent: 'center',
            shadowColor: cfg.glowColor,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
            elevation: rank === 1 ? 8 : 5,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: rank === 1 ? 13 : 12,
              fontWeight: '700',
              color: theme.text,
              textAlign: 'center',
            }}
          >
            {entry.name}
          </Text>
          {entry.countryFlag ? (
            <Text style={{ fontSize: 12 }}>{entry.countryFlag}</Text>
          ) : null}
          <Text
            style={{
              fontSize: rank === 1 ? 22 : 18,
              fontWeight: '900',
              color: theme.text,
              letterSpacing: -0.5,
            }}
          >
            {entry.rating}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Feather name={trendIcon} size={10} color={trendColor} />
            <Text style={{ fontSize: 10, fontWeight: '700', color: trendColor }}>
              {entry.trendDelta > 0 ? `+${entry.trendDelta}` : `${entry.trendDelta}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              marginTop: 2,
              borderTopWidth: 1,
              borderTopColor: cfg.borderColor + '40',
              paddingTop: 6,
              width: '100%',
              justifyContent: 'space-around',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, fontWeight: '800', color: theme.text }}>{entry.winRate}%</Text>
              <Text style={{ fontSize: 9, color: theme.textSecondary, fontWeight: '600' }}>Win Rate</Text>
            </View>
            <View style={{ width: 1, backgroundColor: cfg.borderColor + '40' }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, fontWeight: '800', color: theme.text }}>{entry.currentStreak}</Text>
              <Text style={{ fontSize: 9, color: theme.textSecondary, fontWeight: '600' }}>Streak</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export function LeaderboardPodium({ entries, onPress }: LeaderboardPodiumProps) {
  const top3 = entries.slice(0, 3);
  // Always display: [2nd, 1st, 3rd] layout like the screenshot
  const second = top3[1];
  const first = top3[0];
  const third = top3[2];

  if (!first) return null;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8, paddingTop: 16 }}>
      {second ? (
        <PodiumCard entry={second} rank={2} delay={150} onPress={() => onPress?.(second.userId)} />
      ) : (
        <View style={{ flex: 1 }} />
      )}
      <PodiumCard entry={first} rank={1} delay={0} onPress={() => onPress?.(first.userId)} />
      {third ? (
        <PodiumCard entry={third} rank={3} delay={300} onPress={() => onPress?.(third.userId)} />
      ) : (
        <View style={{ flex: 1 }} />
      )}
    </View>
  );
}
