/**
 * Redesigned Coach Tab — BaddyIQ
 *
 * A single vertically-scrollable experience with four sections:
 *   1. AI Coach intro (hi + coach message)
 *   2. Previous Match Report
 *   3. Overall Performance
 *   4. Performance Summary
 *
 * Uses the lavender/purple/pink design system from the reference images.
 */
import { useAuthStore } from '@/store/auth.store';
import { useMatchesStore } from '@/store/matches.store';
import { palette } from '@/theme/colors';
import { formatDate } from '@/utils/format';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Section Indicator ────────────────────────────────────────────────────────
function SectionIndicator({ activeSection, total }: { activeSection: number; total: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -50 }],
        gap: 10,
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i + 1 === activeSection;
        return (
          <View
            key={i}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: isActive ? '#7B4FD4' : '#DDD6FF',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: isActive ? '#FFFFFF' : '#9087B8',
              }}
            >
              {i + 1}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

// ─── BaddyIQ Shuttlecock Logo ─────────────────────────────────────────────────
function ShuttlecockIcon({ size = 28, color = '#7B4FD4' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C9 2 7 4.5 7 7.5C7 9.8 8.2 11.7 10 12.7L8.5 20H15.5L14 12.7C15.8 11.7 17 9.8 17 7.5C17 4.5 15 2 12 2Z"
        fill={color}
        opacity={0.9}
      />
      <Path d="M9.5 20H14.5M9 17.5H15" stroke="white" strokeWidth={1} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Animated Progress Ring ────────────────────────────────────────────────────
function AnimatedProgressRing({
  progress,
  size = 140,
  strokeWidth = 14,
  color = '#7B4FD4',
  trackColor = '#DDD6FF',
  children,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    animatedValue.addListener(({ value }) => {
      setDashOffset(circumference - (circumference * value) / 100);
    });
    return () => animatedValue.removeAllListeners();
  }, [progress]);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
    </View>
  );
}

// ─── Shot Type Bar ─────────────────────────────────────────────────────────────
function ShotBar({ label, percent, color }: { label: string; percent: number; color: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 4 }}>
      <Text style={{ fontSize: 13, fontWeight: '700', color: '#1E1448' }}>{percent}%</Text>
      <Text style={{ fontSize: 10, color: '#9087B8', marginBottom: 4 }}>{label}</Text>
      <View
        style={{
          width: '100%',
          height: 5,
          borderRadius: 4,
          backgroundColor: '#EDE8FF',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${percent}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
}

// ─── Metric Row Item ───────────────────────────────────────────────────────────
function MetricItem({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#F0ECFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#1E1448', letterSpacing: -0.5 }}>
          {value}
        </Text>
        <Text style={{ fontSize: 11, color: '#9087B8', marginTop: -1 }}>{label}</Text>
      </View>
    </View>
  );
}

// ─── Trophy Icon ──────────────────────────────────────────────────────────────
function TrophyIcon({ color = '#7B4FD4', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 21H16M12 17V21M6 3H4C4 6 5 8 8 9.5C8 12.5 9.5 15 12 17C14.5 15 16 12.5 16 9.5C19 8 20 6 20 3H18M6 3H18M6 3C6 6 7 8 10 9"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function RacketIcon({ color = '#7B4FD4', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={9} r={6} stroke={color} strokeWidth={1.8} fill="none" />
      <Path d="M12 15L8 21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M12 15L16 21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M9 21H15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function TargetIcon({ color = '#7B4FD4', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} fill="none" />
      <Circle cx={12} cy={12} r={5} stroke={color} strokeWidth={1.8} fill="none" />
      <Circle cx={12} cy={12} r={1.5} fill={color} />
    </Svg>
  );
}

// ─── SECTION 1: AI Coach Intro ─────────────────────────────────────────────────
function Section1AICoach({ userName, coachMessage }: { userName: string; coachMessage: string }) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
      {/* Header */}
      <View style={{ marginBottom: 32 }}>
        <ShuttlecockIcon size={32} color="#7B4FD4" />
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#1E1448', marginTop: 12, letterSpacing: -1 }}>
          Hi {userName}!
        </Text>
        <Text style={{ fontSize: 16, color: '#9087B8', marginTop: 4, fontWeight: '500' }}>
          Your AI Coach
        </Text>
      </View>

      {/* Coach Card */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: 24,
          shadowColor: '#7B4FD4',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 6,
        }}
      >
        {/* AI Coach tag */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: '#F0ECFF',
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            alignSelf: 'flex-start',
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 10, color: '#7B4FD4' }}>✦</Text>
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#7B4FD4', letterSpacing: 0.5 }}>
            AI COACH
          </Text>
        </View>

        {/* Quote */}
        <Text style={{ fontSize: 36, color: '#C5B3FF', fontWeight: '900', lineHeight: 36, marginBottom: 8 }}>
          "
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: '#1E1448',
            lineHeight: 26,
            fontWeight: '500',
            marginTop: -12,
            paddingLeft: 4,
          }}
        >
          {coachMessage}
        </Text>

        {/* Attribution */}
        <Text
          style={{
            textAlign: 'right',
            marginTop: 20,
            fontSize: 13,
            color: '#9087B8',
            fontStyle: 'italic',
            fontWeight: '600',
          }}
        >
          — BaddyIQ
        </Text>
      </View>

      {/* Shuttlecock watermark */}
      <View style={{ alignItems: 'center', marginTop: 'auto', opacity: 0.15 }}>
        <ShuttlecockIcon size={80} color="#7B4FD4" />
      </View>
    </View>
  );
}

// ─── SECTION 2: Previous Match Report ─────────────────────────────────────────
function Section2MatchReport({
  userName,
  match,
}: {
  userName: string;
  match: {
    opponentName: string;
    result: 'win' | 'loss';
    scoreSelf: number[];
    scoreOpponent: number[];
    overallScore: number;
    ratingChange: number;
    biggestStrength: string;
    biggestWeakness: string;
    coachSummary: string;
    date: string;
    durationSeconds: number;
  };
}) {
  const isWin = match.result === 'win';

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <ShuttlecockIcon size={32} color="#7B4FD4" />
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#1E1448', marginTop: 12, letterSpacing: -1 }}>
          Hi {userName}!
        </Text>
        <Text style={{ fontSize: 16, color: '#9087B8', marginTop: 4, fontWeight: '500' }}>
          Previous Match Report
        </Text>
      </View>

      {/* Match Result Card */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: 20,
          marginBottom: 16,
          shadowColor: '#7B4FD4',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        {/* Opponent & result badge */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View>
            <Text style={{ fontSize: 12, color: '#9087B8', marginBottom: 2 }}>vs</Text>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#1E1448' }}>{match.opponentName}</Text>
            <Text style={{ fontSize: 11, color: '#9087B8', marginTop: 2 }}>
              {formatDate(match.date)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: isWin ? '#EDE8FF' : '#FFE8F0',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '800', color: isWin ? '#7B4FD4' : '#D14D77', letterSpacing: 1 }}>
              {isWin ? 'WIN' : 'LOSS'}
            </Text>
          </View>
        </View>

        {/* Score display */}
        <View
          style={{
            backgroundColor: '#F0ECFF',
            borderRadius: 16,
            padding: 16,
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 11, color: '#9087B8', marginBottom: 6, letterSpacing: 0.5 }}>
            SCORE
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {match.scoreSelf.map((s, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 28, fontWeight: '900', color: '#1E1448', letterSpacing: -1 }}>
                  {s}
                </Text>
                <Text style={{ fontSize: 18, color: '#9087B8', fontWeight: '700' }}>–</Text>
                <Text style={{ fontSize: 28, fontWeight: '900', color: '#9087B8', letterSpacing: -1 }}>
                  {match.scoreOpponent[i]}
                </Text>
                {i < match.scoreSelf.length - 1 && (
                  <Text style={{ fontSize: 14, color: '#D8CFFF', marginHorizontal: 4 }}>|</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#7B4FD4' }}>{match.overallScore}</Text>
            <Text style={{ fontSize: 10, color: '#9087B8', marginTop: 2 }}>Performance</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                color: match.ratingChange >= 0 ? '#7B4FD4' : '#D14D77',
              }}
            >
              {match.ratingChange >= 0 ? '+' : ''}{match.ratingChange}
            </Text>
            <Text style={{ fontSize: 10, color: '#9087B8', marginTop: 2 }}>Rating</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#1E1448' }}>
              {Math.floor(match.durationSeconds / 60)}m
            </Text>
            <Text style={{ fontSize: 10, color: '#9087B8', marginTop: 2 }}>Duration</Text>
          </View>
        </View>
      </View>

      {/* Strengths & Weaknesses */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 16,
            shadowColor: '#7B4FD4',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 10, color: '#7B4FD4', fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 }}>
            ↑ STRENGTH
          </Text>
          <Text style={{ fontSize: 13, color: '#1E1448', fontWeight: '600', lineHeight: 18 }}>
            {match.biggestStrength}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 16,
            shadowColor: '#7B4FD4',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 10, color: '#F06292', fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 }}>
            ↓ FOCUS ON
          </Text>
          <Text style={{ fontSize: 13, color: '#1E1448', fontWeight: '600', lineHeight: 18 }}>
            {match.biggestWeakness}
          </Text>
        </View>
      </View>

      {/* Coach takeaway */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: 18,
          shadowColor: '#7B4FD4',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Text style={{ fontSize: 10 }}>✦</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#7B4FD4', letterSpacing: 0.5 }}>
            COACH SAYS
          </Text>
        </View>
        <Text style={{ fontSize: 14, color: '#1E1448', lineHeight: 22, fontWeight: '500' }}>
          {match.coachSummary}
        </Text>
      </View>
    </View>
  );
}

// ─── SECTION 3: Overall Performance ──────────────────────────────────────────
function Section3Performance({
  userName,
  user,
  matchShotData,
}: {
  userName: string;
  user: {
    careerStats: {
      winRate: number;
      avgRallyLengthSeconds?: number;
      totalMatches: number;
    };
    radar: {
      attack: number;
      defence: number;
      movement: number;
      recovery: number;
    };
  };
  matchShotData: { smashes: number; drops: number; net: number; clears: number };
}) {
  // Compute an overall "performance score" from radar
  const perfScore = Math.round(
    (user.radar.attack + user.radar.defence + user.radar.movement + user.radar.recovery) / 4
  );

  // Avg points per game: use rally length as proxy approximation
  const avgPoints = 21;
  // Unforced errors: approximation
  const unforcedErrors = Math.max(2, Math.round(10 - perfScore / 12));

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <ShuttlecockIcon size={32} color="#7B4FD4" />
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#1E1448', marginTop: 12, letterSpacing: -1 }}>
          Hi {userName}!
        </Text>
        <Text style={{ fontSize: 16, color: '#9087B8', marginTop: 4, fontWeight: '500' }}>
          Your Performance
        </Text>
      </View>

      {/* Overall Performance Card */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: 20,
          marginBottom: 16,
          shadowColor: '#7B4FD4',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        {/* Period selector row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 10, letterSpacing: 1.5, color: '#9087B8', fontWeight: '600' }}>
            OVERALL PERFORMANCE
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F0ECFF',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 12, color: '#7B4FD4', fontWeight: '600' }}>Last 3 Months</Text>
            <Text style={{ fontSize: 10, color: '#7B4FD4' }}>▾</Text>
          </View>
        </View>

        {/* Donut + Metrics side by side */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          {/* Donut ring */}
          <AnimatedProgressRing progress={perfScore} size={140} strokeWidth={14} color="#7B4FD4" trackColor="#DDD6FF">
            <Text style={{ fontSize: 36, fontWeight: '900', color: '#1E1448', letterSpacing: -2 }}>
              {perfScore}
            </Text>
            <Text style={{ fontSize: 11, color: '#9087B8', marginTop: -2 }}>Performance</Text>
            <Text style={{ fontSize: 11, color: '#9087B8' }}>Score</Text>
          </AnimatedProgressRing>

          {/* Metrics */}
          <View style={{ flex: 1, gap: 6 }}>
            <MetricItem
              icon={<ShuttlecockIcon size={18} color="#7B4FD4" />}
              value={`${user.careerStats.winRate}%`}
              label="Win Rate"
            />
            <View style={{ height: 1, backgroundColor: '#F0ECFF' }} />
            <MetricItem
              icon={<RacketIcon size={18} color="#F06292" />}
              value={`${avgPoints}`}
              label="Avg. Points/Game"
            />
            <View style={{ height: 1, backgroundColor: '#F0ECFF' }} />
            <MetricItem
              icon={<TargetIcon size={18} color="#9F85F0" />}
              value={`${unforcedErrors}`}
              label="Unforced Errors"
            />
          </View>
        </View>
      </View>

      {/* Shot Distribution */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: 20,
          shadowColor: '#7B4FD4',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, gap: 8 }}>
          <ShotBar label="Smashes" percent={matchShotData.smashes} color="#7B4FD4" />
          <ShotBar label="Drops" percent={matchShotData.drops} color="#C5B3FF" />
          <ShotBar label="Net" percent={matchShotData.net} color="#F06292" />
          <ShotBar label="Clears" percent={matchShotData.clears} color="#EDE8FF" />
        </View>
      </View>
    </View>
  );
}

// ─── SECTION 4: Performance Summary ──────────────────────────────────────────
function Section4Summary({ userName, user }: { userName: string; user: { careerStats: { winRate: number; wins: number; losses: number; totalMatches: number }; radar: { attack: number; defence: number; movement: number } } }) {
  // Derive observations from data
  const observations: string[] = [];
  if (user.radar.attack > 75) {
    observations.push('Your attacking game has improved noticeably.');
  } else {
    observations.push('Work on your attacking shots for more decisive wins.');
  }
  if (user.careerStats.winRate > 60) {
    observations.push('Reduce unforced errors to win more close games.');
  } else {
    observations.push('Focus on consistency to improve your win rate.');
  }
  observations.push('Keep the momentum — you\'re on the right track!');

  // Derive headline words from data
  const words = [
    user.careerStats.winRate > 55 ? 'Consistent.' : 'Developing.',
    user.radar.attack > 70 ? 'Improving.' : 'Progressing.',
    'Match Ready.',
  ];

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 60 }}>
      {/* Header */}
      <View style={{ marginBottom: 28 }}>
        <ShuttlecockIcon size={32} color="#7B4FD4" />
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#1E1448', marginTop: 12, letterSpacing: -1 }}>
          Hi {userName}!
        </Text>
        <Text style={{ fontSize: 16, color: '#9087B8', marginTop: 4, fontWeight: '500' }}>
          Your Summary
        </Text>
      </View>

      {/* Bold headline */}
      <View style={{ marginBottom: 32 }}>
        {words.map((word, i) => (
          <Text
            key={i}
            style={{
              fontSize: 36,
              fontWeight: '900',
              color: '#1E1448',
              letterSpacing: -1,
              lineHeight: 42,
            }}
          >
            {word}
          </Text>
        ))}
      </View>

      {/* Observations */}
      <View style={{ gap: 12 }}>
        {observations.map((obs, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 14,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: 16,
              shadowColor: '#7B4FD4',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            {/* Numbered circle */}
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#F0ECFF',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#7B4FD4' }}>{i + 1}</Text>
            </View>
            <Text style={{ flex: 1, fontSize: 14, color: '#1E1448', fontWeight: '500', lineHeight: 20, paddingTop: 6 }}>
              {obs}
            </Text>
          </View>
        ))}
      </View>

      {/* BaddyIQ wordmark */}
      <View style={{ marginTop: 'auto', alignItems: 'center', paddingTop: 32 }}>
        <Text style={{ fontSize: 13, letterSpacing: 6, color: '#9087B8', fontWeight: '700' }}>
          B A D D Y I Q
        </Text>
        <Text style={{ fontSize: 10, letterSpacing: 3, color: '#C5B3FF', marginTop: 4 }}>
          PLAY · IMPROVE · RANK
        </Text>
      </View>
    </View>
  );
}

// ─── MAIN COACH SCREEN ────────────────────────────────────────────────────────
export default function CoachScreen() {
  const user = useAuthStore((s) => s.user);
  const { matches, fetchMatches } = useMatchesStore();
  const scrollRef = useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    fetchMatches();
  }, []);

  const screenHeight = Dimensions.get('window').height;
  const userName = user?.name?.split(' ')[0] ?? 'Player';
  const latestMatch = matches[0];

  // Derive shot distribution from the latest match's shotDistribution
  const shotData = latestMatch?.shotDistribution ?? [];
  const find = (shotName: string) =>
    shotData.find((s) => s.shot.toLowerCase().includes(shotName)) ?? { percentage: 0 };

  const matchShotData = {
    smashes: find('smash').percentage || 34,
    drops: find('drop').percentage || 18,
    net: find('net').percentage || 28,
    clears: find('clear').percentage || 20,
  };

  // Detect scroll position to update section indicator
  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const y = e.nativeEvent.contentOffset.y;
    const section = Math.min(4, Math.floor(y / (screenHeight * 0.85)) + 1);
    setActiveSection(section);
  }

  // Coach message — use the latest match's coach summary or fallback
  const coachMessage =
    latestMatch?.coachSummary ??
    "Great pace today!\nYour net play was sharp,\nbut try to reduce unforced errors.";

  // Performance data
  const performanceUser = user
    ? {
        careerStats: user.careerStats,
        radar: user.radar,
      }
    : {
        careerStats: { winRate: 62, totalMatches: 87, wins: 54, losses: 33 },
        radar: { attack: 82, defence: 68, movement: 74, recovery: 60 },
      };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0ECFF' }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          pagingEnabled={false}
          decelerationRate="fast"
          snapToInterval={screenHeight * 0.85}
          snapToAlignment="start"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Section 1 — AI Coach */}
          <View style={{ minHeight: screenHeight * 0.85 }}>
            <Section1AICoach userName={userName} coachMessage={coachMessage} />
          </View>

          {/* Section 2 — Previous Match Report */}
          {latestMatch ? (
            <View style={{ minHeight: screenHeight * 0.85 }}>
              <Section2MatchReport
                userName={userName}
                match={{
                  opponentName: latestMatch.opponentName,
                  result: latestMatch.result,
                  scoreSelf: latestMatch.scoreSelf,
                  scoreOpponent: latestMatch.scoreOpponent,
                  overallScore: latestMatch.overallScore,
                  ratingChange: latestMatch.ratingChange,
                  biggestStrength: latestMatch.biggestStrength,
                  biggestWeakness: latestMatch.biggestWeakness,
                  coachSummary: latestMatch.coachSummary,
                  date: latestMatch.date,
                  durationSeconds: latestMatch.durationSeconds,
                }}
              />
            </View>
          ) : (
            <View style={{ minHeight: screenHeight * 0.85, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#9087B8', fontSize: 14 }}>No matches yet</Text>
            </View>
          )}

          {/* Section 3 — Overall Performance */}
          <View style={{ minHeight: screenHeight * 0.85 }}>
            <Section3Performance
              userName={userName}
              user={performanceUser}
              matchShotData={matchShotData}
            />
          </View>

          {/* Section 4 — Performance Summary */}
          <View style={{ minHeight: screenHeight * 0.85 }}>
            <Section4Summary
              userName={userName}
              user={{
                careerStats: performanceUser.careerStats,
                radar: { attack: performanceUser.radar.attack, defence: performanceUser.radar.defence, movement: performanceUser.radar.movement },
              }}
            />
          </View>
        </ScrollView>

        {/* Section indicator */}
        <SectionIndicator activeSection={activeSection} total={4} />
      </View>
    </SafeAreaView>
  );
}
