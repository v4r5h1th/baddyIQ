/**
 * Coach Tab — BaddyIQ (Tab 1 / Default Landing)
 *
 * Minimal, Bold & Sleek Viewport-Snapped Experience:
 *   - Center-aligned Section Headlines: Previous Match, AI Coach, Performance, Summary
 *   - Compact & sleek floating navigation rail (1 2 3 4) on the right edge
 *   - Bold, Large Typography for one-liners & key metrics
 *   - Dynamic theme support across all palettes (Purple, Forest Green, Sunset Orange)
 *
 * Sections:
 *   1. Previous Match:
 *      - Top: Interactive Performance Dynamics Line Graph
 *      - Bottom: 4 Players with MVP Crown + Match Scores + Key Stats
 *   2. AI Coach:
 *      - Big bold quote takeaway + Strength & Focus cards
 *   3. Performance:
 *      - Big Progress Ring + High-level metrics + Shot bars
 *      - Court Control and Speed/Tempo stacked vertically
 *   4. Summary:
 *      - Bold impact statements + Key takeaways
 */
import { BrandHeader, BRAND_HEADER_HEIGHT } from '@/components/navigation/brand-header';
import { useAuthStore } from '@/store/auth.store';
import { useMatchesStore } from '@/store/matches.store';
import { formatDate } from '@/utils/format';
import { useAppTheme } from '@/context/theme-context';
import type { ThemePalette } from '@/store/theme-palette.store';
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
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Header & Viewport Constants ─────────────────────────────────────────────
const HEADER_HEIGHT = BRAND_HEADER_HEIGHT;
const BOTTOM_NAV_PADDING = 80;
const SECTION_HEIGHT = Math.max(560, SCREEN_HEIGHT - HEADER_HEIGHT - BOTTOM_NAV_PADDING);

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

// ─── Target & Racket & Shuttlecock Icons ───────────────────────────────────────
function TargetIcon({ color, size = 18 }: { color?: string; size?: number }) {
  const theme = useAppTheme();
  const c = color || theme.primary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={c} strokeWidth={1.8} fill="none" />
      <Circle cx={12} cy={12} r={5} stroke={c} strokeWidth={1.8} fill="none" />
      <Circle cx={12} cy={12} r={1.5} fill={c} />
    </Svg>
  );
}

function RacketIcon({ color, size = 18 }: { color?: string; size?: number }) {
  const theme = useAppTheme();
  const c = color || theme.primary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={9} r={6} stroke={c} strokeWidth={1.8} fill="none" />
      <Path d="M12 15L8 21" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M12 15L16 21" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M9 21H15" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function ShuttlecockIcon({ color, size = 22 }: { color?: string; size?: number }) {
  const theme = useAppTheme();
  const c = color || theme.primary;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C9 2 7 4.5 7 7.5C7 9.8 8.2 11.7 10 12.7L8.5 20H15.5L14 12.7C15.8 11.7 17 9.8 17 7.5C17 4.5 15 2 12 2Z"
        fill={c}
        opacity={0.95}
      />
      <Path d="M9.5 20H14.5M9 17.5H15" stroke="white" strokeWidth={1.2} strokeLinecap="round" />
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
  [key: string]: any;
}) {
  const theme = useAppTheme();
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
          backgroundColor: theme.card,
          borderRadius: 24,
          padding: 15,
          borderWidth: 1.2,
          borderColor: theme.border,
          shadowColor: theme.primary,
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
  [key: string]: any;
}) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        position: 'absolute',
        right: 6,
        top: '36%',
        backgroundColor: theme.card,
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 3,
        borderWidth: 1,
        borderColor: theme.border,
        gap: 6,
        alignItems: 'center',
        zIndex: 20,
        shadowColor: theme.primary,
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
              backgroundColor: isActive ? theme.primary : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 9.5,
                fontWeight: isActive ? '900' : '700',
                color: isActive ? '#FFFFFF' : theme.textMuted,
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
  const theme = useAppTheme();
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const borderColor = isMVP ? '#F59E0B' : isOpponent ? theme.accentDark : theme.primary;
  const avatarBg = isOpponent ? theme.accent : theme.surfaceSecondary;
  const textColor = isOpponent ? theme.accentDark : theme.primary;

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
              borderColor,
            }}
          />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: avatarBg,
              borderWidth: isMVP ? 2.2 : 1.8,
              borderColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '800',
                color: textColor,
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
          color: theme.text,
          fontWeight: '700',
          maxWidth: 52,
          textAlign: 'center',
        }}
      >
        {name.split(' ')[0]}
      </Text>
      {sublabel && (
        <Text style={{ fontSize: 8.5, color: theme.textSecondary, marginTop: -2, fontWeight: '500' }}>
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
  const theme = useAppTheme();
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
        <Text style={{ fontSize: 12, fontWeight: '800', color: theme.text }}>
          {selectedPoint.time} min mark
        </Text>
        <View
          style={{
            backgroundColor: theme.surfaceSecondary,
            borderRadius: 8,
            paddingHorizontal: 7,
            paddingVertical: 2,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text style={{ fontSize: 9.5, fontWeight: '800', color: theme.primary }}>
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
              stroke="rgba(100, 100, 100, 0.15)"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
          );
        })}

        {/* Shaded Area fill */}
        <Polyline
          points={`${padLeft},${padTop + gH} ${polylinePoints} ${pts[pts.length - 1].x},${padTop + gH}`}
          fill={theme.accent}
          opacity={0.35}
          stroke="none"
        />

        {/* Line */}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke={theme.primary}
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
          stroke={theme.primary}
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
              fill={isSelected ? theme.primary : theme.accent}
              stroke={theme.primary}
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
          <Text key={i} style={{ fontSize: 8.5, color: theme.textSecondary, fontWeight: '600' }}>
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
  color,
  children,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const theme = useAppTheme();
  const ringColor = color || theme.primary;
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
          stroke={theme.surfaceSecondary}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
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
  color?: string;
}) {
  const theme = useAppTheme();
  const barColor = color || theme.primary;

  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 3 }}>
      <Text style={{ fontSize: 11.5, fontWeight: '800', color: theme.text }}>{percent}%</Text>
      <Text style={{ fontSize: 8.5, color: theme.textSecondary, marginBottom: 2, fontWeight: '600' }}>
        {label}
      </Text>
      <View
        style={{
          width: '100%',
          height: 6,
          borderRadius: 3,
          backgroundColor: theme.surfaceSecondary,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: 3,
            backgroundColor: barColor,
          }}
        />
      </View>
    </View>
  );
}

// ─── Infographic 1: Court Dominance & Zone Control ───────────────────────────
function CourtControlInfographic({
  frontPct = 84,
  rearPct = 76,
}: {
  frontPct?: number;
  rearPct?: number;
}) {
  const theme = useAppTheme();

  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 9, color: theme.primary, fontWeight: '800', letterSpacing: 0.6 }}>
          ✦ COURT CONTROL
        </Text>
        <View
          style={{
            backgroundColor: theme.surfaceSecondary,
            borderRadius: 6,
            paddingHorizontal: 5,
            paddingVertical: 1,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text style={{ fontSize: 7.5, fontWeight: '800', color: theme.primary }}>Dominant</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* Stylized Mini Badminton Court */}
        <Svg width={36} height={44} viewBox="0 0 36 44" fill="none">
          <Rect x={1} y={1} width={34} height={42} rx={4} stroke={theme.primary} strokeWidth={1.2} fill={theme.card} />
          <Line x1={1} y1={22} x2={35} y2={22} stroke={theme.primary} strokeWidth={1.2} strokeDasharray="2 2" />
          <Rect x={2.5} y={15} width={31} height={14} rx={2} fill={theme.primary} opacity={0.2} />
          <Rect x={2.5} y={2.5} width={31} height={11} rx={2} fill={theme.accentDark} opacity={0.18} />
          <Line x1={18} y1={1} x2={18} y2={43} stroke={theme.border} strokeWidth={0.8} />
        </Svg>

        {/* Zone metrics */}
        <View style={{ flex: 1, gap: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 9.5, color: theme.textSecondary, fontWeight: '600' }}>Front Net</Text>
            <Text style={{ fontSize: 10.5, fontWeight: '800', color: theme.primary }}>{frontPct}%</Text>
          </View>
          <View style={{ width: '100%', height: 3.5, borderRadius: 2, backgroundColor: theme.surfaceSecondary, overflow: 'hidden' }}>
            <View style={{ width: `${frontPct}%`, height: '100%', borderRadius: 2, backgroundColor: theme.primary }} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 1 }}>
            <Text style={{ fontSize: 9.5, color: theme.textSecondary, fontWeight: '600' }}>Rear Court</Text>
            <Text style={{ fontSize: 10.5, fontWeight: '800', color: theme.accentDark }}>{rearPct}%</Text>
          </View>
          <View style={{ width: '100%', height: 3.5, borderRadius: 2, backgroundColor: theme.surfaceSecondary, overflow: 'hidden' }}>
            <View style={{ width: `${rearPct}%`, height: '100%', borderRadius: 2, backgroundColor: theme.accentDark }} />
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Infographic 2: Speed & Rally Intensity ──────────────────────────────────
function SpeedTempoInfographic({
  peakSmash = 318,
  rallyTempo = 18.4,
}: {
  peakSmash?: number;
  rallyTempo?: number;
}) {
  const theme = useAppTheme();

  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 9, color: theme.accentDark, fontWeight: '800', letterSpacing: 0.6 }}>
          ⚡ SPEED & TEMPO
        </Text>
        <View
          style={{
            backgroundColor: theme.surfaceSecondary,
            borderRadius: 6,
            paddingHorizontal: 5,
            paddingVertical: 1,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text style={{ fontSize: 7.5, fontWeight: '800', color: theme.accentDark }}>Fast Pace</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            width: 36,
            height: 44,
            borderRadius: 6,
            backgroundColor: theme.surfaceSecondary,
            borderWidth: 1,
            borderColor: theme.border,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              fill={theme.accentDark}
              stroke={theme.primary}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={{ fontSize: 7, fontWeight: '800', color: theme.primary }}>KM/H</Text>
        </View>

        {/* Stat metrics */}
        <View style={{ flex: 1, gap: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 9.5, color: theme.textSecondary, fontWeight: '600' }}>Peak Smash</Text>
            <Text style={{ fontSize: 10.5, fontWeight: '800', color: theme.text }}>{peakSmash}</Text>
          </View>
          <View style={{ width: '100%', height: 3.5, borderRadius: 2, backgroundColor: theme.surfaceSecondary, overflow: 'hidden' }}>
            <View style={{ width: '88%', height: '100%', borderRadius: 2, backgroundColor: theme.primary }} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 1 }}>
            <Text style={{ fontSize: 9.5, color: theme.textSecondary, fontWeight: '600' }}>Tempo</Text>
            <Text style={{ fontSize: 10.5, fontWeight: '800', color: theme.text }}>{rallyTempo}/m</Text>
          </View>
          <View style={{ width: '100%', height: 3.5, borderRadius: 2, backgroundColor: theme.surfaceSecondary, overflow: 'hidden' }}>
            <View style={{ width: '76%', height: '100%', borderRadius: 2, backgroundColor: theme.accentDark }} />
          </View>
        </View>
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
  const theme = useAppTheme();

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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
      {/* ─────────────────────────────────────────────────────────────
          TOP BRAND HEADER (BaddyIQ + Shuttlecock + Menu + Profile)
      ───────────────────────────────────────────────────────────── */}
      <BrandHeader />

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
          borderColor: theme.border,
          backgroundColor: theme.surfaceSecondary,
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
                  color: theme.text,
                  letterSpacing: -0.8,
                  textAlign: 'center',
                }}
              >
                Previous Match
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: theme.textSecondary,
                  marginTop: 2,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {isWin ? '🔥 Great Victory!' : '⚡ Good Effort!'} • {latestMatch ? formatDate(latestMatch.date) : 'Recent Game'}
              </Text>
            </View>

            {/* 1.1 Line Graph FIRST (Expanded size to fill space) */}
            <AnimatedGlassCard delay={40}>
              <InteractiveMatchLineGraph data={rallyData} width={chartW} height={165} />
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
                    backgroundColor: theme.surfaceSecondary,
                    borderRadius: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 2.5,
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                >
                  <Text style={{ fontSize: 9.5, fontWeight: '900', color: theme.primary, letterSpacing: 1 }}>
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
                  backgroundColor: theme.surfaceSecondary,
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
                      <Text style={{ fontSize: 22, fontWeight: '900', color: theme.text, letterSpacing: -1 }}>
                        {s}
                      </Text>
                      <Text style={{ fontSize: 14, color: theme.textSecondary, fontWeight: '700' }}>—</Text>
                      <Text style={{ fontSize: 22, fontWeight: '900', color: theme.textSecondary, letterSpacing: -1 }}>
                        {latestMatch?.scoreOpponent?.[i] ?? 16}
                      </Text>
                      {i < (latestMatch?.scoreSelf?.length ?? 2) - 1 && (
                        <View style={{ width: 1, height: 16, backgroundColor: theme.border, marginHorizontal: 4 }} />
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
                    color: (latestMatch?.ratingChange ?? 18) >= 0 ? theme.primary : theme.accentDark,
                  },
                  {
                    label: 'Duration',
                    value: `${Math.floor((latestMatch?.durationSeconds ?? 2580) / 60)}m`,
                    color: theme.text,
                  },
                  {
                    label: 'Performance',
                    value: `${latestMatch?.overallScore ?? 78}`,
                    color: theme.primary,
                  },
                ].map((stat) => (
                  <View key={stat.label} style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '900', color: stat.color }}>
                      {stat.value}
                    </Text>
                    <Text style={{ fontSize: 8.5, color: theme.textSecondary, marginTop: 1, fontWeight: '600' }}>
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
                  color: theme.text,
                  letterSpacing: -0.8,
                  textAlign: 'center',
                }}
              >
                AI Coach
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: theme.textSecondary,
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
                    backgroundColor: theme.primary,
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
              <Text style={{ fontSize: 26, color: theme.accentDark, fontWeight: '900', lineHeight: 24, marginBottom: 2 }}>
                "
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: theme.text,
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
                  color: theme.textSecondary,
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
                <Text style={{ fontSize: 9, color: theme.primary, fontWeight: '800', letterSpacing: 1, marginBottom: 4 }}>
                  ↑ STRENGTH
                </Text>
                <Text style={{ fontSize: 12, color: theme.text, fontWeight: '700', lineHeight: 17 }}>
                  {latestMatch?.biggestStrength ?? 'Front-court net dominance'}
                </Text>
              </AnimatedGlassCard>

              <AnimatedGlassCard delay={240} style={{ flex: 1 }}>
                <Text style={{ fontSize: 9, color: theme.accentDark, fontWeight: '800', letterSpacing: 1, marginBottom: 4 }}>
                  ↓ FOCUS ON
                </Text>
                <Text style={{ fontSize: 12, color: theme.text, fontWeight: '700', lineHeight: 17 }}>
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
                  color: theme.text,
                  letterSpacing: -0.8,
                  textAlign: 'center',
                }}
              >
                Performance
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: theme.textSecondary,
                  marginTop: 2,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Season Benchmark • {performanceUser.careerStats.totalMatches} Matches
              </Text>
            </View>

            {/* Donut Progress Ring + Metrics */}
            <AnimatedGlassCard delay={120} style={{ padding: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <DynamicProgressRing progress={perfScore} size={92} strokeWidth={9} color={theme.primary}>
                  <Text style={{ fontSize: 21, fontWeight: '900', color: theme.text, letterSpacing: -1 }}>
                    {perfScore}
                  </Text>
                  <Text style={{ fontSize: 8, color: theme.textSecondary, fontWeight: '700' }}>Score</Text>
                </DynamicProgressRing>

                <View style={{ flex: 1, gap: 5 }}>
                  {[
                    {
                      label: 'Win Rate',
                      value: `${performanceUser.careerStats.winRate}%`,
                      icon: <ShuttlecockIcon size={12} color={theme.primary} />,
                    },
                    {
                      label: 'Attack Power',
                      value: `${performanceUser.radar.attack}/100`,
                      icon: <RacketIcon size={12} color={theme.accentDark} />,
                    },
                    {
                      label: 'Defence Index',
                      value: `${performanceUser.radar.defence}/100`,
                      icon: <TargetIcon size={12} color={theme.primary} />,
                    },
                  ].map((m) => (
                    <View key={m.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: theme.surfaceSecondary,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {m.icon}
                      </View>
                      <View>
                        <Text style={{ fontSize: 12, fontWeight: '800', color: theme.text }}>
                          {m.value}
                        </Text>
                        <Text style={{ fontSize: 8, color: theme.textSecondary, fontWeight: '500' }}>
                          {m.label}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </AnimatedGlassCard>

            {/* Stacked Infographics (Court Control above Speed/Tempo) */}
            <View style={{ gap: 8 }}>
              <AnimatedGlassCard delay={160} style={{ padding: 10 }}>
                <CourtControlInfographic frontPct={84} rearPct={76} />
              </AnimatedGlassCard>

              <AnimatedGlassCard delay={180} style={{ padding: 10 }}>
                <SpeedTempoInfographic peakSmash={318} rallyTempo={18.4} />
              </AnimatedGlassCard>
            </View>

            {/* Shot Distribution */}
            <AnimatedGlassCard delay={200} style={{ padding: 11 }}>
              <Text style={{ fontSize: 11, fontWeight: '800', color: theme.text, marginBottom: 6 }}>
                Shot Distribution
              </Text>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <AnimatedShotBar label="Smashes" percent={matchShotData.smashes} color={theme.primary} />
                <AnimatedShotBar label="Drops" percent={matchShotData.drops} color={theme.accentDark} />
                <AnimatedShotBar label="Net" percent={matchShotData.net} color={theme.accent} />
                <AnimatedShotBar label="Clears" percent={matchShotData.clears} color={theme.border} />
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
                  color: theme.text,
                  letterSpacing: -0.8,
                  textAlign: 'center',
                }}
              >
                Summary
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: theme.textSecondary,
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
              <Text style={{ fontSize: 30, fontWeight: '900', color: theme.text, letterSpacing: -1, textAlign: 'center' }}>
                Consistent.
              </Text>
              <Text style={{ fontSize: 30, fontWeight: '900', color: theme.primary, letterSpacing: -1, textAlign: 'center' }}>
                Improving.
              </Text>
              <Text style={{ fontSize: 30, fontWeight: '900', color: theme.accentDark, letterSpacing: -1, textAlign: 'center' }}>
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
                    accent: theme.primary,
                  },
                  {
                    id: '2',
                    text: 'Cut unforced errors against fast cross-court drives.',
                    tag: 'Defence',
                    accent: theme.accentDark,
                  },
                  {
                    id: '3',
                    text: 'Stamina was great — keep up your match conditioning.',
                    tag: 'Stamina',
                    accent: theme.primary,
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
                        backgroundColor: theme.surfaceSecondary,
                        borderRadius: 6,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderWidth: 1,
                        borderColor: theme.border,
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
                        color: theme.text,
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
