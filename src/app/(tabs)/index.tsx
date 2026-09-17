/**
 * Coach Tab — BaddyIQ (Tab 1 / Default Landing)
 *
 * Minimal, Bold & Sleek Viewport-Snapped Experience:
 *   - Center-aligned Section Headlines: Previous Match, AI Coach, Performance, Summary
 *   - Compact & sleek floating navigation rail (1 2 3 4) on the right edge
 *   - Bold, Large Typography for one-liners & key metrics
 *   - Rich Spring & Floating Card Animations
 *
 * Sections:
 *   1. Previous Match:
 *      - Top: Interactive Performance Dynamics Line Graph
 *      - Bottom: 4 Players with MVP Crown + Match Scores + Key Stats
 *   2. AI Coach:
 *      - Big bold quote takeaway + Strength & Focus cards
 *   3. Performance:
 *      - Big Progress Ring + High-level metrics + Shot bars
 *   4. Summary:
 *      - Bold impact statements + Key takeaways
 *
 * Color palette:
 *   Background:        #F5DDFD
 *   Surface/Card:      #F9EDFD  (glassy iOS-style)
 *   Secondary Surface: #F8E9FD
 *   Primary Purple:    #6E32CC
 *   Accent Pink:       #FAC0F6
 *   Primary Text:      #0A0841
 *   Secondary Text:    #615092
 */
import { useAuthStore } from '@/store/auth.store';
import { useMatchesStore } from '@/store/matches.store';
import { formatDate } from '@/utils/format';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Line, Path, Polyline } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Header & Viewport Constants ─────────────────────────────────────────────
const HEADER_HEIGHT = 60;
const BOTTOM_NAV_PADDING = 80;
const SECTION_HEIGHT = Math.max(560, SCREEN_HEIGHT - HEADER_HEIGHT - BOTTOM_NAV_PADDING);

// ─── Menu Hamburger Icon ──────────────────────────────────────────────────────
function MenuIcon({ size = 20, color = '#6E32CC' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 6H20M4 12H16M4 18H20"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Shuttlecock SVG ─────────────────────────────────────────────────────────
function ShuttlecockIcon({ size = 22, color = '#6E32CC' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C9 2 7 4.5 7 7.5C7 9.8 8.2 11.7 10 12.7L8.5 20H15.5L14 12.7C15.8 11.7 17 9.8 17 7.5C17 4.5 15 2 12 2Z"
        fill={color}
        opacity={0.95}
      />
      <Path d="M9.5 20H14.5M9 17.5H15" stroke="white" strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Crown Icon ───────────────────────────────────────────────────────────────
function CrownIcon({ size = 14, color = '#FFB300' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 19L5 9L9 13L12 5L15 13L19 9L22 19H2Z"
        fill={color}
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Target & Racket Icons ────────────────────────────────────────────────────
function TargetIcon({ color = '#6E32CC', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} fill="none" />
      <Circle cx={12} cy={12} r={5} stroke={color} strokeWidth={1.8} fill="none" />
      <Circle cx={12} cy={12} r={1.5} fill={color} />
    </Svg>
  );
}

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

// ─── Animated Floating Glass Card ────────────────────────────────────────────
function AnimatedGlassCard({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: object;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(22)).current;
  const scaleAnim = useRef(new Animated.Value(0.97)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 480,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 480,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 45,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          backgroundColor: 'rgba(249, 237, 253, 0.95)',
          borderRadius: 24,
          padding: 15,
          borderWidth: 1.2,
          borderColor: 'rgba(234, 208, 245, 0.9)',
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.08,
          shadowRadius: 14,
          elevation: 3,
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

// ─── Compact Navigation Indicator Rail (1 2 3 4) ─────────────────────────────
function CompactNavigationRail({
  activeSection,
  total,
  onSelect,
}: {
  activeSection: number;
  total: number;
  onSelect: (index: number) => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        right: 6,
        top: '36%',
        backgroundColor: 'rgba(249, 237, 253, 0.88)',
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 3,
        borderWidth: 1,
        borderColor: 'rgba(234, 208, 245, 0.8)',
        gap: 6,
        alignItems: 'center',
        zIndex: 20,
        shadowColor: '#6E32CC',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const index = i + 1;
        const isActive = index === activeSection;
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            onPress={() => onSelect(index)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: isActive ? '#6E32CC' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 9.5,
                fontWeight: isActive ? '900' : '700',
                color: isActive ? '#FFFFFF' : '#8F7FB8',
              }}
            >
              {index}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Player Avatar with MVP Crown ────────────────────────────────────────────
function PlayerAvatar({
  uri,
  name,
  isMVP = false,
  isOpponent = false,
  sublabel,
}: {
  uri?: string;
  name: string;
  isMVP?: boolean;
  isOpponent?: boolean;
  sublabel?: string;
}) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={{ alignItems: 'center', gap: 2, minWidth: 46 }}>
      <View style={{ position: 'relative' }}>
        {isMVP && (
          <View
            style={{
              position: 'absolute',
              top: -11,
              alignSelf: 'center',
              zIndex: 3,
              left: '50%',
              marginLeft: -7,
              backgroundColor: '#FFF9E6',
              borderRadius: 8,
              padding: 1.5,
              borderWidth: 1,
              borderColor: '#FFE082',
            }}
          >
            <CrownIcon size={11} color="#F59E0B" />
          </View>
        )}
        {uri ? (
          <Image
            source={{ uri }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: isMVP ? 2.2 : 1.8,
              borderColor: isMVP ? '#F59E0B' : isOpponent ? '#D46CC7' : '#6E32CC',
            }}
          />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: isOpponent ? '#FAC0F6' : '#F8E9FD',
              borderWidth: isMVP ? 2.2 : 1.8,
              borderColor: isMVP ? '#F59E0B' : isOpponent ? '#D46CC7' : '#6E32CC',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '800',
                color: isOpponent ? '#D46CC7' : '#6E32CC',
              }}
            >
              {initials}
            </Text>
          </View>
        )}
      </View>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 10,
          color: '#0A0841',
          fontWeight: '700',
          maxWidth: 52,
          textAlign: 'center',
        }}
      >
        {name.split(' ')[0]}
      </Text>
      {sublabel && (
        <Text style={{ fontSize: 8.5, color: '#615092', marginTop: -2, fontWeight: '500' }}>
          {sublabel}
        </Text>
      )}
    </View>
  );
}

// ─── Interactive Match Line Graph ────────────────────────────────────────────
function InteractiveMatchLineGraph({
  data,
  width,
  height,
}: {
  data: { time: number; score: number }[];
  width: number;
  height: number;
}) {
  const [selectedIdx, setSelectedIdx] = useState<number>(data.length - 1);

  if (!data || data.length < 2) return null;

  const maxScore = Math.max(...data.map((d) => d.score), 10);
  const minScore = Math.min(...data.map((d) => d.score), 0);
  const scoreRange = Math.max(maxScore - minScore, 1);

  const padLeft = 22;
  const padRight = 10;
  const padTop = 10;
  const padBottom = 18;
  const gW = width - padLeft - padRight;
  const gH = height - padTop - padBottom;

  const pts = data.map((d, i) => {
    const x = padLeft + (i / (data.length - 1)) * gW;
    const y = padTop + (1 - (d.score - minScore) / scoreRange) * gH;
    return { x, y, ...d, i };
  });

  const polylinePoints = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const selectedPoint = pts[selectedIdx] ?? pts[pts.length - 1];

  const yLabels = [maxScore, Math.round((maxScore + minScore) / 2), minScore];

  return (
    <View style={{ position: 'relative' }}>
      {/* Tooltip */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: '800', color: '#0A0841' }}>
          {selectedPoint.time} min mark
        </Text>
        <View
          style={{
            backgroundColor: '#F8E9FD',
            borderRadius: 8,
            paddingHorizontal: 7,
            paddingVertical: 2,
            borderWidth: 1,
            borderColor: '#EAD0F5',
          }}
        >
          <Text style={{ fontSize: 9.5, fontWeight: '800', color: '#6E32CC' }}>
            Rating: {selectedPoint.score}/100
          </Text>
        </View>
      </View>

      <Svg width={width} height={height}>
        {/* Horizontal grid lines */}
        {yLabels.map((label, i) => {
          const yVal = padTop + (1 - (label - minScore) / scoreRange) * gH;
          return (
            <Line
              key={i}
              x1={padLeft}
              y1={yVal}
              x2={width - padRight}
              y2={yVal}
              stroke="rgba(97, 80, 146, 0.12)"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
          );
        })}

        {/* Shaded Area fill */}
        <Polyline
          points={`${padLeft},${padTop + gH} ${polylinePoints} ${pts[pts.length - 1].x},${padTop + gH}`}
          fill="rgba(110, 50, 204, 0.08)"
          stroke="none"
        />

        {/* Line */}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke="#6E32CC"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active vertical guide line */}
        <Line
          x1={selectedPoint.x}
          y1={padTop}
          x2={selectedPoint.x}
          y2={padTop + gH}
          stroke="#6E32CC"
          strokeWidth={1.4}
          strokeDasharray="3 3"
          opacity={0.5}
        />

        {/* Interactive Dots */}
        {pts.map((p, i) => {
          const isSelected = i === selectedIdx;
          return (
            <Circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={isSelected ? 4.8 : 2.6}
              fill={isSelected ? '#6E32CC' : '#FAC0F6'}
              stroke="#6E32CC"
              strokeWidth={isSelected ? 1.8 : 1}
            />
          );
        })}
      </Svg>

      {/* Invisible Touch Hotspots */}
      <View
        style={{
          position: 'absolute',
          left: padLeft - 8,
          top: 22,
          width: gW + 16,
          height: gH + 12,
          flexDirection: 'row',
        }}
      >
        {pts.map((p, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            onPress={() => setSelectedIdx(i)}
            style={{ flex: 1, height: '100%' }}
          />
        ))}
      </View>

      {/* X-axis time marks */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: padLeft,
          paddingRight: padRight,
          marginTop: -3,
        }}
      >
        {[pts[0], pts[Math.floor(pts.length / 2)], pts[pts.length - 1]].map((p, i) => (
          <Text key={i} style={{ fontSize: 8.5, color: '#615092', fontWeight: '600' }}>
            {p.time}m
          </Text>
        ))}
      </View>
    </View>
  );
}

// ─── Dynamic Progress Ring ───────────────────────────────────────────────────
function DynamicProgressRing({
  progress,
  size = 108,
  strokeWidth = 10,
  color = '#6E32CC',
  children,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * Math.min(100, Math.max(0, progress))) / 100;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F8E9FD"
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
          strokeDashoffset={offset}
        />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>{children}</View>
    </View>
  );
}

// ─── Shot Distribution Bar ────────────────────────────────────────────────────
function AnimatedShotBar({
  label,
  percent,
  color,
}: {
  label: string;
  percent: number;
  color: string;
}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 3 }}>
      <Text style={{ fontSize: 11.5, fontWeight: '800', color: '#0A0841' }}>{percent}%</Text>
      <Text style={{ fontSize: 8.5, color: '#615092', marginBottom: 2, fontWeight: '600' }}>
        {label}
      </Text>
      <View
        style={{
          width: '100%',
          height: 6,
          borderRadius: 3,
          backgroundColor: '#F8E9FD',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: 3,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COACH SCREEN (1st Tab) - Fixed Viewport Snapping + Center-Aligned Headers
// ═══════════════════════════════════════════════════════════════════════════════
export default function CoachScreen() {
  const user = useAuthStore((s) => s.user);
  const { matches, fetchMatches } = useMatchesStore();
  const scrollRef = useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = useState<number>(1);

  useEffect(() => {
    fetchMatches();
  }, []);

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

  const isWin = latestMatch ? latestMatch.result === 'win' : true;

  // 4 Player avatars
  const userTeam = [
    { name: userName, uri: user?.avatarUrl, isMVP: isWin, sublabel: 'You' },
    { name: 'Alex T.', uri: 'https://i.pravatar.cc/150?img=12', isMVP: false, sublabel: 'Partner' },
  ];
  const opponentTeam = [
    {
      name: latestMatch?.opponentName ?? 'Liam Chen',
      uri: latestMatch?.opponentAvatar ?? 'https://i.pravatar.cc/150?img=5',
      isMVP: !isWin,
      sublabel: 'Opponent',
    },
    {
      name: 'Kenji W.',
      uri: 'https://i.pravatar.cc/150?img=7',
      isMVP: false,
      sublabel: 'Opponent',
    },
  ];

  // Performance over time rally data
  const rallyData = (
    latestMatch?.rallyLengths ?? [8, 14, 10, 22, 18, 26, 12, 20, 28, 16, 24, 30]
  ).map((len, i) => ({
    time: Math.round((i / 11) * ((latestMatch?.durationSeconds ?? 2400) / 60)),
    score: Math.min(96, Math.max(38, Math.round(42 + (len / 32) * 50 + Math.sin(i * 0.7) * 8))),
  }));

  const coachMessage =
    latestMatch?.coachSummary ??
    'Great tempo today! Your front-court net kills created key winning moments. Focus on quick resets to base during long rallies.';

  const performanceUser = user
    ? { careerStats: user.careerStats, radar: user.radar }
    : {
        careerStats: { winRate: 64, totalMatches: 87, wins: 56, losses: 31 },
        radar: { attack: 84, defence: 70, movement: 76, recovery: 62 },
      };

  const perfScore = Math.round(
    (performanceUser.radar.attack +
      performanceUser.radar.defence +
      performanceUser.radar.movement +
      performanceUser.radar.recovery) /
      4
  );

  // Available chart width accounting for container borders and rail padding
  const chartW = SCREEN_WIDTH - 24 - 28 - 26;

  // Handle scroll section detection
  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const y = e.nativeEvent.contentOffset.y;
    const section = Math.min(4, Math.max(1, Math.round(y / SECTION_HEIGHT) + 1));
    setActiveSection(section);
  }

  // Scroll to section when tapping 1, 2, 3, 4
  function scrollToSection(index: number) {
    scrollRef.current?.scrollTo({
      y: (index - 1) * SECTION_HEIGHT,
      animated: true,
    });
    setActiveSection(index);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5DDFD' }} edges={['top']}>
      {/* ─────────────────────────────────────────────────────────────
          TOP BRAND HEADER (BaddyIQ + Shuttlecock + Menu Icon)
      ───────────────────────────────────────────────────────────── */}
      <View
        style={{
          height: HEADER_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        {/* Left: Menu Icon Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: 'rgba(249, 237, 253, 0.95)',
            borderWidth: 1.2,
            borderColor: '#EAD0F5',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#6E32CC',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <MenuIcon size={18} color="#6E32CC" />
        </TouchableOpacity>

        {/* Center: BaddyIQ Logo & Wordmark */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#6E32CC',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#6E32CC',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <ShuttlecockIcon size={18} color="#FFFFFF" />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              color: '#0A0841',
              letterSpacing: -0.5,
            }}
          >
            Baddy<Text style={{ color: '#6E32CC' }}>IQ</Text>
          </Text>
        </View>

        {/* Right: Profile Avatar */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: 'rgba(249, 237, 253, 0.95)',
            borderWidth: 1.2,
            borderColor: '#EAD0F5',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#6E32CC',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          {user?.avatarUrl ? (
            <Image
              source={{ uri: user.avatarUrl }}
              style={{ width: 34, height: 34, borderRadius: 17 }}
            />
          ) : (
            <Text style={{ fontSize: 13, fontWeight: '800', color: '#6E32CC' }}>
              {userName[0]}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER (Clean, Bounded & Viewport Snapped)
      ───────────────────────────────────────────────────────────── */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 12,
          marginBottom: 8,
          borderRadius: 30,
          borderWidth: 1.8,
          borderColor: '#EAD0F5',
          backgroundColor: 'rgba(248, 233, 253, 0.65)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <ScrollView
          ref={scrollRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          pagingEnabled={false}
          decelerationRate="fast"
          snapToInterval={SECTION_HEIGHT}
          snapToAlignment="start"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          {/* ═══════════════════════════════════════════════════════════
              SECTION 1: PREVIOUS MATCH (CENTER-ALIGNED)
          ═══════════════════════════════════════════════════════════ */}
          <View
            style={{
              height: SECTION_HEIGHT,
              paddingLeft: 12,
              paddingRight: 26, // Space for navigation rail on right
              paddingTop: 16,
              paddingBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            {/* Center-aligned Header */}
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '900',
                  color: '#0A0841',
                  letterSpacing: -0.8,
                  textAlign: 'center',
                }}
              >
                Previous Match
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#615092',
                  marginTop: 2,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {isWin ? '🔥 Great Victory!' : '⚡ Good Effort!'} • {latestMatch ? formatDate(latestMatch.date) : 'Recent Game'}
              </Text>
            </View>

            {/* 1.1 Line Graph FIRST */}
            <AnimatedGlassCard delay={40}>
              <InteractiveMatchLineGraph data={rallyData} width={chartW} height={110} />
            </AnimatedGlassCard>

            {/* 1.2 Players + MVP Crown + Score */}
            <AnimatedGlassCard delay={100}>
              {/* Players Row */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 4,
                  marginBottom: 8,
                }}
              >
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  {userTeam.map((p, i) => (
                    <PlayerAvatar
                      key={`u_${i}`}
                      uri={p.uri}
                      name={p.name}
                      isMVP={p.isMVP}
                      sublabel={p.sublabel}
                    />
                  ))}
                </View>

                <View
                  style={{
                    backgroundColor: '#F8E9FD',
                    borderRadius: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 2.5,
                    borderWidth: 1,
                    borderColor: '#EAD0F5',
                  }}
                >
                  <Text style={{ fontSize: 9.5, fontWeight: '900', color: '#6E32CC', letterSpacing: 1 }}>
                    VS
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  {opponentTeam.map((p, i) => (
                    <PlayerAvatar
                      key={`o_${i}`}
                      uri={p.uri}
                      name={p.name}
                      isMVP={p.isMVP}
                      isOpponent
                      sublabel={p.sublabel}
                    />
                  ))}
                </View>
              </View>

              {/* Set Scores */}
              <View
                style={{
                  backgroundColor: '#F8E9FD',
                  borderRadius: 12,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  {(latestMatch?.scoreSelf ?? [21, 19]).map((s, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={{ fontSize: 22, fontWeight: '900', color: '#0A0841', letterSpacing: -1 }}>
                        {s}
                      </Text>
                      <Text style={{ fontSize: 14, color: '#615092', fontWeight: '700' }}>—</Text>
                      <Text style={{ fontSize: 22, fontWeight: '900', color: '#615092', letterSpacing: -1 }}>
                        {latestMatch?.scoreOpponent?.[i] ?? 16}
                      </Text>
                      {i < (latestMatch?.scoreSelf?.length ?? 2) - 1 && (
                        <View style={{ width: 1, height: 16, backgroundColor: '#EAD0F5', marginHorizontal: 4 }} />
                      )}
                    </View>
                  ))}
                </View>
              </View>

              {/* High-level stats */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {[
                  {
                    label: 'Rating',
                    value: `${(latestMatch?.ratingChange ?? 18) >= 0 ? '+' : ''}${latestMatch?.ratingChange ?? 18}`,
                    color: (latestMatch?.ratingChange ?? 18) >= 0 ? '#6E32CC' : '#D46CC7',
                  },
                  {
                    label: 'Duration',
                    value: `${Math.floor((latestMatch?.durationSeconds ?? 2580) / 60)}m`,
                    color: '#0A0841',
                  },
                  {
                    label: 'Performance',
                    value: `${latestMatch?.overallScore ?? 78}`,
                    color: '#6E32CC',
                  },
                ].map((stat) => (
                  <View key={stat.label} style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '900', color: stat.color }}>
                      {stat.value}
                    </Text>
                    <Text style={{ fontSize: 8.5, color: '#615092', marginTop: 1, fontWeight: '600' }}>
                      {stat.label}
                    </Text>
                  </View>
                ))}
              </View>
            </AnimatedGlassCard>
          </View>

          {/* ═══════════════════════════════════════════════════════════
              SECTION 2: AI COACH (CENTER-ALIGNED)
          ═══════════════════════════════════════════════════════════ */}
          <View
            style={{
              height: SECTION_HEIGHT,
              paddingLeft: 12,
              paddingRight: 26,
              paddingTop: 16,
              paddingBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            {/* Center-aligned Header */}
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '900',
                  color: '#0A0841',
                  letterSpacing: -0.8,
                  textAlign: 'center',
                }}
              >
                AI Coach
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#615092',
                  marginTop: 2,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Tactical Insights for {userName}
              </Text>
            </View>

            {/* Coach Quote Card */}
            <AnimatedGlassCard delay={120}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <View
                  style={{
                    backgroundColor: '#6E32CC',
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 2.5,
                  }}
                >
                  <Text style={{ fontSize: 8.5, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.8 }}>
                    ✦ COACH SAYS
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 26, color: '#D46CC7', fontWeight: '900', lineHeight: 24, marginBottom: 2 }}>
                "
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: '#0A0841',
                  lineHeight: 23,
                  fontWeight: '600',
                  marginTop: -6,
                  paddingLeft: 4,
                }}
              >
                {coachMessage}
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  marginTop: 8,
                  fontSize: 11,
                  color: '#615092',
                  fontStyle: 'italic',
                  fontWeight: '700',
                }}
              >
                — BaddyIQ Coach
              </Text>
            </AnimatedGlassCard>

            {/* Strength & Focus Cards */}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <AnimatedGlassCard delay={200} style={{ flex: 1 }}>
                <Text style={{ fontSize: 9, color: '#6E32CC', fontWeight: '800', letterSpacing: 1, marginBottom: 4 }}>
                  ↑ STRENGTH
                </Text>
                <Text style={{ fontSize: 12, color: '#0A0841', fontWeight: '700', lineHeight: 17 }}>
                  {latestMatch?.biggestStrength ?? 'Front-court net dominance'}
                </Text>
              </AnimatedGlassCard>

              <AnimatedGlassCard delay={240} style={{ flex: 1 }}>
                <Text style={{ fontSize: 9, color: '#D46CC7', fontWeight: '800', letterSpacing: 1, marginBottom: 4 }}>
                  ↓ FOCUS ON
                </Text>
                <Text style={{ fontSize: 12, color: '#0A0841', fontWeight: '700', lineHeight: 17 }}>
                  {latestMatch?.biggestWeakness ?? 'Reset speed to center court base'}
                </Text>
              </AnimatedGlassCard>
            </View>
          </View>

          {/* ═══════════════════════════════════════════════════════════
              SECTION 3: PERFORMANCE (CENTER-ALIGNED)
          ═══════════════════════════════════════════════════════════ */}
          <View
            style={{
              height: SECTION_HEIGHT,
              paddingLeft: 12,
              paddingRight: 26,
              paddingTop: 16,
              paddingBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            {/* Center-aligned Header */}
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '900',
                  color: '#0A0841',
                  letterSpacing: -0.8,
                  textAlign: 'center',
                }}
              >
                Performance
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#615092',
                  marginTop: 2,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Season Benchmark • {performanceUser.careerStats.totalMatches} Matches
              </Text>
            </View>

            {/* Donut Progress Ring + Metrics */}
            <AnimatedGlassCard delay={120}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <DynamicProgressRing progress={perfScore} size={108} strokeWidth={10} color="#6E32CC">
                  <Text style={{ fontSize: 24, fontWeight: '900', color: '#0A0841', letterSpacing: -1 }}>
                    {perfScore}
                  </Text>
                  <Text style={{ fontSize: 8.5, color: '#615092', fontWeight: '700' }}>Score</Text>
                </DynamicProgressRing>

                <View style={{ flex: 1, gap: 6 }}>
                  {[
                    {
                      label: 'Win Rate',
                      value: `${performanceUser.careerStats.winRate}%`,
                      icon: <ShuttlecockIcon size={13} color="#6E32CC" />,
                    },
                    {
                      label: 'Attack Power',
                      value: `${performanceUser.radar.attack}/100`,
                      icon: <RacketIcon size={13} color="#D46CC7" />,
                    },
                    {
                      label: 'Defence Index',
                      value: `${performanceUser.radar.defence}/100`,
                      icon: <TargetIcon size={13} color="#8B52E3" />,
                    },
                  ].map((m) => (
                    <View key={m.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <View
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 13,
                          backgroundColor: '#F8E9FD',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {m.icon}
                      </View>
                      <View>
                        <Text style={{ fontSize: 13, fontWeight: '800', color: '#0A0841' }}>
                          {m.value}
                        </Text>
                        <Text style={{ fontSize: 8.5, color: '#615092', fontWeight: '500' }}>
                          {m.label}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </AnimatedGlassCard>

            {/* Shot Distribution */}
            <AnimatedGlassCard delay={200}>
              <Text style={{ fontSize: 11.5, fontWeight: '800', color: '#0A0841', marginBottom: 8 }}>
                Shot Distribution
              </Text>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <AnimatedShotBar label="Smashes" percent={matchShotData.smashes} color="#6E32CC" />
                <AnimatedShotBar label="Drops" percent={matchShotData.drops} color="#8B52E3" />
                <AnimatedShotBar label="Net" percent={matchShotData.net} color="#D46CC7" />
                <AnimatedShotBar label="Clears" percent={matchShotData.clears} color="#EAD0F5" />
              </View>
            </AnimatedGlassCard>
          </View>

          {/* ═══════════════════════════════════════════════════════════
              SECTION 4: SUMMARY (CENTER-ALIGNED)
          ═══════════════════════════════════════════════════════════ */}
          <View
            style={{
              height: SECTION_HEIGHT,
              paddingLeft: 12,
              paddingRight: 26,
              paddingTop: 16,
              paddingBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            {/* Center-aligned Header */}
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '900',
                  color: '#0A0841',
                  letterSpacing: -0.8,
                  textAlign: 'center',
                }}
              >
                Summary
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#615092',
                  marginTop: 2,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Key Focus for Next Practice
              </Text>
            </View>

            {/* Center-aligned bold headline words */}
            <View style={{ alignItems: 'center', gap: 2, paddingVertical: 2 }}>
              <Text style={{ fontSize: 30, fontWeight: '900', color: '#0A0841', letterSpacing: -1, textAlign: 'center' }}>
                Consistent.
              </Text>
              <Text style={{ fontSize: 30, fontWeight: '900', color: '#6E32CC', letterSpacing: -1, textAlign: 'center' }}>
                Improving.
              </Text>
              <Text style={{ fontSize: 30, fontWeight: '900', color: '#D46CC7', letterSpacing: -1, textAlign: 'center' }}>
                Match Ready.
              </Text>
            </View>

            {/* Clean Takeaways */}
            <AnimatedGlassCard delay={120}>
              <View style={{ gap: 8 }}>
                {[
                  {
                    id: '1',
                    text: 'Jump smashes earned 65% of your attacking rally points.',
                    tag: 'Power',
                    accent: '#6E32CC',
                  },
                  {
                    id: '2',
                    text: 'Cut unforced errors against fast cross-court drives.',
                    tag: 'Defence',
                    accent: '#D46CC7',
                  },
                  {
                    id: '3',
                    text: 'Stamina was great — keep up your match conditioning.',
                    tag: 'Stamina',
                    accent: '#8B52E3',
                  },
                ].map((obs) => (
                  <View
                    key={obs.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: 8,
                      paddingVertical: 2,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#F8E9FD',
                        borderRadius: 6,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderWidth: 1,
                        borderColor: '#EAD0F5',
                      }}
                    >
                      <Text style={{ fontSize: 8.5, fontWeight: '800', color: obs.accent }}>
                        {obs.tag}
                      </Text>
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 11.5,
                        color: '#0A0841',
                        fontWeight: '600',
                        lineHeight: 16,
                      }}
                    >
                      {obs.text}
                    </Text>
                  </View>
                ))}
              </View>
            </AnimatedGlassCard>
          </View>
        </ScrollView>

        {/* Compact Navigation Rail Indicator (1 2 3 4) */}
        <CompactNavigationRail
          activeSection={activeSection}
          total={4}
          onSelect={scrollToSection}
        />
      </View>
    </SafeAreaView>
  );
}
