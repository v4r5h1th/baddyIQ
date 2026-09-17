/**
 * Redesigned Coach Tab — BaddyIQ (Tab 1 / Default Landing)
 *
 * A single vertically-scrollable experience with four sections:
 *   1. AI Coach intro (hi + coach message)
 *   2. Previous Match Report
 *   3. Overall Performance
 *   4. Performance Summary
 *
 * Color palette:
 *   Background:        #F5DDFD
 *   Surface/Card:      #F9EDFD
 *   Secondary Surface: #F8E9FD
 *   Primary Purple:    #6E32CC
 *   Accent Pink:       #FAC0F6
 *   Primary Text:      #0A0841
 *   Secondary Text:    #615092
 */
import { useAuthStore } from '@/store/auth.store';
import { useMatchesStore } from '@/store/matches.store';
import { formatDate } from '@/utils/format';
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
import Svg, { Circle, Path, G } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Section Indicator ────────────────────────────────────────────────────────
function SectionIndicator({ activeSection, total }: { activeSection: number; total: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        right: 18,
        top: 140,
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
              backgroundColor: isActive ? '#6E32CC' : '#F8E9FD',
              borderWidth: isActive ? 0 : 1,
              borderColor: '#EAD0F5',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: isActive ? '#FFFFFF' : '#8F7FB8',
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
function ShuttlecockIcon({ size = 28, color = '#6E32CC' }: { size?: number; color?: string }) {
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

// ─── Animated Progress Ring (Android-safe SVG) ────────────────────────────────
function AnimatedProgressRing({
  progress,
  size = 140,
  strokeWidth = 14,
  color = '#6E32CC',
  trackColor = '#F8E9FD',
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

    const listener = animatedValue.addListener(({ value }) => {
      setDashOffset(circumference - (circumference * value) / 100);
    });
    return () => animatedValue.removeListener(listener);
  }, [progress, circumference]);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
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
            strokeDasharray={`${circumference}`}
            strokeDashoffset={dashOffset}
          />
        </G>
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
      <Text style={{ fontSize: 13, fontWeight: '700', color: '#0A0841' }}>{percent}%</Text>
      <Text style={{ fontSize: 10, color: '#615092', marginBottom: 4 }}>{label}</Text>
      <View
        style={{
          width: '100%',
          height: 6,
          borderRadius: 4,
          backgroundColor: '#F8E9FD',
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
          backgroundColor: '#F8E9FD',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#0A0841', letterSpacing: -0.5 }}>
          {value}
        </Text>
        <Text style={{ fontSize: 11, color: '#615092', marginTop: -1 }}>{label}</Text>
      </View>
    </View>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function RacketIcon({ color = '#6E32CC', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={9} r={6} stroke={color} strokeWidth={1.8} fill="none" />
      <Path d="M12 15L8 21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M12 15L16 21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M9 21H15" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function TargetIcon({ color = '#6E32CC', size = 18 }: { color?: string; size?: number }) {
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
        <ShuttlecockIcon size={32} color="#6E32CC" />
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#0A0841', marginTop: 12, letterSpacing: -1 }}>
          Hi {userName}!
        </Text>
        <Text style={{ fontSize: 16, color: '#615092', marginTop: 4, fontWeight: '500' }}>
          Your AI Coach
        </Text>
      </View>

      {/* Coach Card */}
      <View
        style={{
          backgroundColor: '#F9EDFD',
          borderRadius: 24,
          padding: 24,
          shadowColor: '#6E32CC',
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
            backgroundColor: '#F8E9FD',
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            alignSelf: 'flex-start',
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 10, color: '#6E32CC' }}>✦</Text>
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#6E32CC', letterSpacing: 0.5 }}>
            AI COACH
          </Text>
        </View>

        {/* Quote */}
        <Text style={{ fontSize: 36, color: '#D46CC7', fontWeight: '900', lineHeight: 36, marginBottom: 8 }}>
          "
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: '#0A0841',
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
            color: '#615092',
            fontStyle: 'italic',
            fontWeight: '600',
          }}
        >
          — BaddyIQ
        </Text>
      </View>

      {/* Shuttlecock watermark */}
      <View style={{ alignItems: 'center', marginTop: 'auto', opacity: 0.12 }}>
        <ShuttlecockIcon size={80} color="#6E32CC" />
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
        <ShuttlecockIcon size={32} color="#6E32CC" />
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#0A0841', marginTop: 12, letterSpacing: -1 }}>
          Hi {userName}!
        </Text>
        <Text style={{ fontSize: 16, color: '#615092', marginTop: 4, fontWeight: '500' }}>
          Previous Match Report
        </Text>
      </View>

      {/* Match Result Card */}
      <View
        style={{
          backgroundColor: '#F9EDFD',
          borderRadius: 24,
          padding: 20,
          marginBottom: 16,
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        {/* Opponent & result badge */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View>
            <Text style={{ fontSize: 12, color: '#615092', marginBottom: 2 }}>vs</Text>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#0A0841' }}>{match.opponentName}</Text>
            <Text style={{ fontSize: 11, color: '#615092', marginTop: 2 }}>
              {formatDate(match.date)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: isWin ? '#F8E9FD' : '#FAC0F6',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: isWin ? '#6E32CC' : '#D46CC7',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '800', color: isWin ? '#6E32CC' : '#D46CC7', letterSpacing: 1 }}>
              {isWin ? 'WIN' : 'LOSS'}
            </Text>
          </View>
        </View>

        {/* Score display */}
        <View
          style={{
            backgroundColor: '#F8E9FD',
            borderRadius: 16,
            padding: 16,
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 11, color: '#615092', marginBottom: 6, letterSpacing: 0.5 }}>
            SCORE
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {match.scoreSelf.map((s, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 28, fontWeight: '900', color: '#0A0841', letterSpacing: -1 }}>
                  {s}
                </Text>
                <Text style={{ fontSize: 18, color: '#615092', fontWeight: '700' }}>–</Text>
                <Text style={{ fontSize: 28, fontWeight: '900', color: '#615092', letterSpacing: -1 }}>
                  {match.scoreOpponent[i]}
                </Text>
                {i < match.scoreSelf.length - 1 && (
                  <Text style={{ fontSize: 14, color: '#EAD0F5', marginHorizontal: 4 }}>|</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#6E32CC' }}>{match.overallScore}</Text>
            <Text style={{ fontSize: 10, color: '#615092', marginTop: 2 }}>Performance</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                color: match.ratingChange >= 0 ? '#6E32CC' : '#D46CC7',
              }}
            >
              {match.ratingChange >= 0 ? '+' : ''}{match.ratingChange}
            </Text>
            <Text style={{ fontSize: 10, color: '#615092', marginTop: 2 }}>Rating</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#0A0841' }}>
              {Math.floor(match.durationSeconds / 60)}m
            </Text>
            <Text style={{ fontSize: 10, color: '#615092', marginTop: 2 }}>Duration</Text>
          </View>
        </View>
      </View>

      {/* Strengths & Weaknesses */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#F9EDFD',
            borderRadius: 20,
            padding: 16,
            shadowColor: '#6E32CC',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 10, color: '#6E32CC', fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 }}>
            ↑ STRENGTH
          </Text>
          <Text style={{ fontSize: 13, color: '#0A0841', fontWeight: '600', lineHeight: 18 }}>
            {match.biggestStrength}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#F9EDFD',
            borderRadius: 20,
            padding: 16,
            shadowColor: '#6E32CC',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 10, color: '#D46CC7', fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 }}>
            ↓ FOCUS ON
          </Text>
          <Text style={{ fontSize: 13, color: '#0A0841', fontWeight: '600', lineHeight: 18 }}>
            {match.biggestWeakness}
          </Text>
        </View>
      </View>

      {/* Coach takeaway */}
      <View
        style={{
          backgroundColor: '#F9EDFD',
          borderRadius: 20,
          padding: 18,
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <Text style={{ fontSize: 10, color: '#6E32CC' }}>✦</Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#6E32CC', letterSpacing: 0.5 }}>
            COACH SAYS
          </Text>
        </View>
        <Text style={{ fontSize: 14, color: '#0A0841', lineHeight: 22, fontWeight: '500' }}>
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
  const perfScore = Math.round(
    (user.radar.attack + user.radar.defence + user.radar.movement + user.radar.recovery) / 4
  );
  const avgPoints = 21;
  const unforcedErrors = Math.max(2, Math.round(10 - perfScore / 12));

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <ShuttlecockIcon size={32} color="#6E32CC" />
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#0A0841', marginTop: 12, letterSpacing: -1 }}>
          Hi {userName}!
        </Text>
        <Text style={{ fontSize: 16, color: '#615092', marginTop: 4, fontWeight: '500' }}>
          Your Performance
        </Text>
      </View>

      {/* Overall Performance Card */}
      <View
        style={{
          backgroundColor: '#F9EDFD',
          borderRadius: 24,
          padding: 20,
          marginBottom: 16,
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        {/* Period selector row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 10, letterSpacing: 1.5, color: '#615092', fontWeight: '600' }}>
            OVERALL PERFORMANCE
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F8E9FD',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 12, color: '#6E32CC', fontWeight: '600' }}>Last 3 Months</Text>
            <Text style={{ fontSize: 10, color: '#6E32CC' }}>▾</Text>
          </View>
        </View>

        {/* Donut + Metrics side by side */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <AnimatedProgressRing progress={perfScore} size={140} strokeWidth={14} color="#6E32CC" trackColor="#F8E9FD">
            <Text style={{ fontSize: 36, fontWeight: '900', color: '#0A0841', letterSpacing: -2 }}>
              {perfScore}
            </Text>
            <Text style={{ fontSize: 11, color: '#615092', marginTop: -2 }}>Performance</Text>
            <Text style={{ fontSize: 11, color: '#615092' }}>Score</Text>
          </AnimatedProgressRing>

          {/* Metrics */}
          <View style={{ flex: 1, gap: 6 }}>
            <MetricItem
              icon={<ShuttlecockIcon size={18} color="#6E32CC" />}
              value={`${user.careerStats.winRate}%`}
              label="Win Rate"
            />
            <View style={{ height: 1, backgroundColor: '#F8E9FD' }} />
            <MetricItem
              icon={<RacketIcon size={18} color="#D46CC7" />}
              value={`${avgPoints}`}
              label="Avg. Points/Game"
            />
            <View style={{ height: 1, backgroundColor: '#F8E9FD' }} />
            <MetricItem
              icon={<TargetIcon size={18} color="#8B52E3" />}
              value={`${unforcedErrors}`}
              label="Unforced Errors"
            />
          </View>
        </View>
      </View>

      {/* Shot Distribution */}
      <View
        style={{
          backgroundColor: '#F9EDFD',
          borderRadius: 24,
          padding: 20,
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 4,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, gap: 8 }}>
          <ShotBar label="Smashes" percent={matchShotData.smashes} color="#6E32CC" />
          <ShotBar label="Drops" percent={matchShotData.drops} color="#8B52E3" />
          <ShotBar label="Net" percent={matchShotData.net} color="#FAC0F6" />
          <ShotBar label="Clears" percent={matchShotData.clears} color="#EAD0F5" />
        </View>
      </View>
    </View>
  );
}

// ─── SECTION 4: Performance Summary ──────────────────────────────────────────
function Section4Summary({
  userName,
  user,
}: {
  userName: string;
  user: {
    careerStats: { winRate: number; wins: number; losses: number; totalMatches: number };
    radar: { attack: number; defence: number; movement: number };
  };
}) {
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
  observations.push("Keep the momentum — you're on the right track!");

  const words = [
    user.careerStats.winRate > 55 ? 'Consistent.' : 'Developing.',
    user.radar.attack > 70 ? 'Improving.' : 'Progressing.',
    'Match Ready.',
  ];

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 60 }}>
      {/* Header */}
      <View style={{ marginBottom: 28 }}>
        <ShuttlecockIcon size={32} color="#6E32CC" />
        <Text style={{ fontSize: 34, fontWeight: '800', color: '#0A0841', marginTop: 12, letterSpacing: -1 }}>
          Hi {userName}!
        </Text>
        <Text style={{ fontSize: 16, color: '#615092', marginTop: 4, fontWeight: '500' }}>
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
              color: '#0A0841',
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
              backgroundColor: '#F9EDFD',
              borderRadius: 20,
              padding: 16,
              shadowColor: '#6E32CC',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#F8E9FD',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#6E32CC' }}>{i + 1}</Text>
            </View>
            <Text style={{ flex: 1, fontSize: 14, color: '#0A0841', fontWeight: '500', lineHeight: 20, paddingTop: 6 }}>
              {obs}
            </Text>
          </View>
        ))}
      </View>

      {/* BaddyIQ wordmark */}
      <View style={{ marginTop: 'auto', alignItems: 'center', paddingTop: 32 }}>
        <Text style={{ fontSize: 13, letterSpacing: 6, color: '#615092', fontWeight: '700' }}>
          B A D D Y I Q
        </Text>
        <Text style={{ fontSize: 10, letterSpacing: 3, color: '#D46CC7', marginTop: 4 }}>
          PLAY · IMPROVE · RANK
        </Text>
      </View>
    </View>
  );
}

// ─── MAIN COACH SCREEN (1st Tab) ──────────────────────────────────────────────
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

  const shotData = latestMatch?.shotDistribution ?? [];
  const find = (shotName: string) =>
    shotData.find((s) => s.shot.toLowerCase().includes(shotName)) ?? { percentage: 0 };

  const matchShotData = {
    smashes: find('smash').percentage || 34,
    drops: find('drop').percentage || 18,
    net: find('net').percentage || 28,
    clears: find('clear').percentage || 20,
  };

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const y = e.nativeEvent.contentOffset.y;
    const section = Math.min(4, Math.floor(y / (screenHeight * 0.85)) + 1);
    setActiveSection(section);
  }

  const coachMessage =
    latestMatch?.coachSummary ??
    "Great pace today!\nYour net play was sharp,\nbut try to reduce unforced errors.";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5DDFD' }} edges={['top']}>
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
              <Text style={{ color: '#615092', fontSize: 14 }}>No matches yet</Text>
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
