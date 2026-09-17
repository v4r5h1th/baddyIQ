import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, G } from 'react-native-svg';

// Custom minimal SVG icons matching the reference design
function HomeIcon({ active }: { active: boolean }) {
  const color = active ? '#7B4FD4' : '#9087B8';
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

function MatchesIcon({ active }: { active: boolean }) {
  const color = active ? '#7B4FD4' : '#9087B8';
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
  const color = active ? '#7B4FD4' : '#9087B8';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 17H5C4.44772 17 4 17.4477 4 18V20C4 20.5523 4.44772 21 5 21H8M8 17V21M8 17V11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11V17M8 21H16M16 17H19C19.5523 17 20 17.4477 20 18V20C20 20.5523 19.5523 21 19 21H16M16 17V21M12 3V7M12 7L9.5 4.5M12 7L14.5 4.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function ShuttleIcon({ active }: { active: boolean }) {
  // Badminton shuttlecock icon for the center active tab
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3C8.5 3 6 5.5 6 9C6 11.5 7.5 13.5 9.5 14.5L8 21H16L14.5 14.5C16.5 13.5 18 11.5 18 9C18 5.5 15.5 3 12 3Z"
        fill="white"
        stroke="white"
        strokeWidth={0.5}
      />
      <Path d="M10 21H14M9 18H15" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  const color = active ? '#7B4FD4' : '#9087B8';
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        stroke={color}
        strokeWidth={1.8}
        fill="none"
      />
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
  index: HomeIcon,
  matches: MatchesIcon,
  leaderboard: LeaderboardIcon,
  coach: ShuttleIcon,
  profile: ProfileIcon,
};

const labels: Record<string, string> = {
  index: 'Home',
  matches: 'Matches',
  leaderboard: 'Ranks',
  coach: 'Coach',
  profile: 'Profile',
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom || 8,
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
          backgroundColor: '#EDE8FF',
          borderRadius: 40,
          paddingVertical: 8,
          paddingHorizontal: 8,
          shadowColor: '#7B4FD4',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const Icon = tabIcons[route.name] ?? HomeIcon;
          const label = labels[route.name] ?? route.name;
          const isCenter = route.name === 'coach';

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
                // Center elevated button with gradient
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    overflow: 'hidden',
                    marginTop: -14,
                    shadowColor: '#7B4FD4',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.4,
                    shadowRadius: 12,
                    elevation: 10,
                  }}
                >
                  <LinearGradient
                    colors={['#9F85F0', '#7B4FD4']}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 26 }}
                  >
                    <Icon active={focused} />
                  </LinearGradient>
                </View>
              ) : focused ? (
                // Active non-center tab: soft purple pill highlight
                <View
                  style={{
                    backgroundColor: '#DDD6FF',
                    borderRadius: 24,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon active={focused} />
                </View>
              ) : (
                // Inactive tab
                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 8,
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
