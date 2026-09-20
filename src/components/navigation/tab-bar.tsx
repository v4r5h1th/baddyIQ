import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { router } from 'expo-router';
import { TAB_ROUTES, TabName, useTabNavigationStore } from '@/store/tab-navigation.store';
import { useAppTheme } from '@/context/theme-context';
import { useRecordFlowStore } from '@/store/record-flow.store';

// ─── 1st Tab: Coach (Shuttlecock) ─────────────────────────────────────────────
function CoachIcon({ active, primary, secondary }: { active: boolean; primary: string; secondary: string }) {
  const color = active ? primary : secondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C9 2 7 4.5 7 7.5C7 9.8 8.2 11.7 10 12.7L8.5 20H15.5L14 12.7C15.8 11.7 17 9.8 17 7.5C17 4.5 15 2 12 2Z"
        fill={active ? color : 'none'}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9.5 20H14.5M9 17.5H15" stroke={active ? '#FFFFFF' : color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

// ─── 2nd Tab: Matches (Trophy / Leaderboard Icon switched with 3rd tab) ───────
function MatchesTrophyIcon({ active, primary, secondary }: { active: boolean; primary: string; secondary: string }) {
  const color = active ? primary : secondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 21H16M12 17V21M6 4H4C4 7 5 9 8 10.5C8 13.5 9.5 16 12 17C14.5 16 16 13.5 16 10.5C19 9 20 7 20 4H18M6 4H18M6 4C6 7 7 9 10 10"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? color : 'none'}
      />
    </Svg>
  );
}

// ─── 3rd Tab: Record (Video Camera Icon switched with 2nd tab — Center Elevated)
function CenterRecordVideoIcon({ active, primary }: { active: boolean; primary: string; secondary: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? '#FFFFFF' : 'none'}
      />
    </Svg>
  );
}

// ─── 4th Tab: Leaderboard / Analytics Bar Chart ──────────────────────────────
function LeaderboardChartIcon({ active, primary, secondary }: { active: boolean; primary: string; secondary: string }) {
  const color = active ? primary : secondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Line x1={18} y1={20} x2={18} y2={10} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={12} y1={20} x2={12} y2={4} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={6} y1={20} x2={6} y2={14} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path
        d="M4 8L9 4L14 8L20 2"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── 5th Tab: Profile (User Icon) ─────────────────────────────────────────────
function ProfileIcon({ active, primary, secondary }: { active: boolean; primary: string; secondary: string }) {
  const color = active ? primary : secondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} fill={active ? color : 'none'} />
      <Path
        d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

const tabIconComponents: Record<
  string,
  (props: { active: boolean; primary: string; secondary: string }) => React.JSX.Element
> = {
  index: CoachIcon,
  matches: MatchesTrophyIcon,
  record: CenterRecordVideoIcon,
  leaderboard: LeaderboardChartIcon,
  profile: ProfileIcon,
};

export interface CustomTabBarProps {
  activeIndex?: number;
  onTabPress?: (index: number) => void;
  state?: BottomTabBarProps['state'];
  navigation?: BottomTabBarProps['navigation'];
}

export function TabBar(props: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { state, navigation, activeIndex = 0, onTabPress } = props;
  const theme = useAppTheme();

  const isNavigationMode = Boolean(state && navigation);

  const routes = isNavigationMode
    ? state!.routes.filter((r) => r.name !== 'coach').map((r, i) => ({
        key: r.key,
        name: r.name as TabName,
        label: TAB_ROUTES.find((t) => t.name === r.name)?.label ?? r.name,
        index: i,
      }))
    : TAB_ROUTES.map((r) => ({
        key: r.name,
        name: r.name,
        label: r.label,
        index: r.index,
      }));

  const currentIndex = isNavigationMode ? state!.index : activeIndex;

  return (
    <View
      style={{
        paddingBottom: insets.bottom || 10,
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor: 'transparent',
      }}
    >
      {/* Pill container */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.surfaceSecondary,
          borderRadius: 40,
          paddingVertical: 6,
          paddingHorizontal: 8,
          borderWidth: 1,
          borderColor: theme.border,
          shadowColor: theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 6,
        }}
      >
        {routes.map((route, i) => {
          const focused = currentIndex === i;
          const Icon = tabIconComponents[route.name] ?? CoachIcon;
          const isCenter = route.name === 'record' || i === 2;

          const handlePress = () => {
            if (route.name === 'record') {
              // Ensure record flow starts at Screen 1 (Allow Location)
              useRecordFlowStore.getState().goToStep(1);
            }

            if (onTabPress) {
              onTabPress(i);
            } else {
              useTabNavigationStore.getState().goToTab(i);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={route.label}
              onPress={handlePress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              {isCenter ? (
                // Center elevated button with video camera icon & primary gradient
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    overflow: 'hidden',
                    marginTop: -16,
                    shadowColor: theme.primary,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.38,
                    shadowRadius: 10,
                    elevation: 8,
                  }}
                >
                  <LinearGradient
                    colors={[theme.accentDark || theme.primary, theme.primary] as [string, string]}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 26 }}
                  >
                    <Icon active={focused} primary={theme.primary} secondary={theme.textSecondary} />
                  </LinearGradient>
                </View>
              ) : focused ? (
                // Active tab: soft accent highlight
                <View
                  style={{
                    backgroundColor: theme.card,
                    borderRadius: 22,
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                >
                  <Icon active={focused} primary={theme.primary} secondary={theme.textSecondary} />
                </View>
              ) : (
                // Inactive tab
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon active={focused} primary={theme.primary} secondary={theme.textSecondary} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
