import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const icons: Record<string, keyof typeof Feather.glyphMap> = {
  index: 'home',
  matches: 'video',
  leaderboard: 'award',
  coach: 'message-circle',
  profile: 'user',
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
      style={{ paddingBottom: insets.bottom || 12 }}
      className="flex-row border-t border-border bg-bg-elevated pt-2"
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const icon = icons[route.name] ?? 'circle';
        const label = labels[route.name] ?? route.name;

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
            className="flex-1 items-center gap-1 pb-2"
          >
            <Feather name={icon} size={22} color={focused ? '#5B8CFF' : '#6B7385'} />
            <Text className={cn('text-[11px] font-medium', focused ? 'text-primary-400' : 'text-text-muted')}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
