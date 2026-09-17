import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';

// Custom icons matching the sleek palette
function CoachIcon({ active }: { active: boolean }) {
  const color = active ? '#6E32CC' : '#615092';
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

function MatchesIcon({ active }: { active: boolean }) {
  const color = active ? '#6E32CC' : '#615092';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function LeaderboardIcon({ active }: { active: boolean }) {
  // Center elevated button icon
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 21H16M12 17V21M6 4H4C4 7 5 9 8 10.5C8 13.5 9.5 16 12 17C14.5 16 16 13.5 16 10.5C19 9 20 7 20 4H18M6 4H18M6 4C6 7 7 9 10 10"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  const color = active ? '#6E32CC' : '#615092';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12L12 4L21 12V20C21 20.5523 20.5523 21 20 21H15V16H9V21H4C3.44772 21 3 20.5523 3 20V12Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  const color = active ? '#6E32CC' : '#615092';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} fill="none" />
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

const tabIcons: Record<string, (props: { active: boolean }) => React.JSX.Element> = {
  index: CoachIcon,
  matches: MatchesIcon,
  leaderboard: LeaderboardIcon,
  home: HomeIcon,
  profile: ProfileIcon,
};

const labels: Record<string, string> = {
  index: 'Coach',
  matches: 'Matches',
  leaderboard: 'Ranks',
  home: 'Home',
  profile: 'Profile',
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Filter out any hidden routes (e.g. coach alias)
  const visibleRoutes = state.routes.filter((r) => r.name !== 'coach');

  return (
    <View
      style={{
        paddingBottom: insets.bottom || 10,
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor: 'transparent',
      }}
    >
      {/* Pill container with new secondary surface #F8E9FD */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F8E9FD',
          borderRadius: 40,
          paddingVertical: 6,
          paddingHorizontal: 8,
          borderWidth: 1,
          borderColor: '#EAD0F5',
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 6,
        }}
      >
        {visibleRoutes.map((route) => {
          const routeIndex = state.routes.findIndex((r) => r.key === route.key);
          const focused = state.index === routeIndex;
          const Icon = tabIcons[route.name] ?? CoachIcon;
          const label = labels[route.name] ?? route.name;
          const isCenter = route.name === 'leaderboard';

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={label}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              }}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              {isCenter ? (
                // Center elevated button with primary purple gradient #8B52E3 -> #6E32CC
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    overflow: 'hidden',
                    marginTop: -14,
                    shadowColor: '#6E32CC',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.35,
                    shadowRadius: 10,
                    elevation: 8,
                  }}
                >
                  <LinearGradient
                    colors={['#8B52E3', '#6E32CC']}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 25 }}
                  >
                    <Icon active={focused} />
                  </LinearGradient>
                </View>
              ) : focused ? (
                // Active tab: soft accent highlight
                <View
                  style={{
                    backgroundColor: '#F9EDFD',
                    borderRadius: 22,
                    paddingHorizontal: 12,
                    paddingVertical: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#EAD0F5',
                  }}
                >
                  <Icon active={focused} />
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
                  <Icon active={focused} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
