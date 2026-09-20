import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { Slot, router, useLocalSearchParams, usePathname } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTabNavigationStore } from '@/store/tab-navigation.store';

const tabs = [
  { key: 'summary', label: 'Summary' },
  { key: 'statistics', label: 'Statistics' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'video', label: 'Video' },
  { key: 'coach', label: 'Coach' },
];

export default function MatchDetailsLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pathname = usePathname();

  const handleBack = () => {
    useTabNavigationStore.getState().goToTab('matches');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <View className="flex-row items-center gap-3 px-4 pb-2 pt-1">
        <Pressable onPress={handleBack} className="h-10 w-10 items-center justify-center rounded-full bg-bg-card">
          <Feather name="chevron-left" size={20} color="#000000" />
        </Pressable>
        <Text className="text-lg font-bold text-text">Match Details</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 px-4 pb-3">
        {tabs.map((tab) => {
          const active = pathname.endsWith(`/${tab.key}`);
          return (
            <Pressable
              key={tab.key}
              onPress={() => router.push(`/matches/${id}/${tab.key}`)}
              className={cn('rounded-full px-4 py-2', active ? 'bg-primary-500' : 'bg-bg-card')}
            >
              <Text className={cn('text-sm font-semibold', active ? 'text-white' : 'text-text-secondary')}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Slot />
    </SafeAreaView>
  );
}
