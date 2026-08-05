import { StatisticCard } from '@/components/cards';
import { RadarChart } from '@/components/charts';
import { useAuthStore } from '@/store/auth.store';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const menu: { label: string; icon: keyof typeof Feather.glyphMap; href: string }[] = [
  { label: 'Edit Profile', icon: 'edit-2', href: '/profile/edit' },
  { label: 'Achievements', icon: 'award', href: '/profile/achievements' },
  { label: 'Friends', icon: 'users', href: '/profile/friends' },
  { label: 'Friend Requests', icon: 'user-plus', href: '/profile/friend-requests' },
  { label: 'Season History', icon: 'archive', href: '/profile/season-history' },
  { label: 'Settings', icon: 'settings', href: '/settings' },
];

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="gap-6 pb-10">
        <View className="h-36 w-full">
          <Image source={{ uri: user.bannerUrl }} className="h-36 w-full" />
        </View>
        <View className="-mt-14 items-center gap-2 px-5">
          <Image source={{ uri: user.avatarUrl }} className="h-24 w-24 rounded-full border-4 border-bg" />
          <Text className="text-xl font-bold text-text">{user.name}</Text>
          <Text className="text-sm text-text-secondary">{user.countryFlag} {user.country} • Rank #{user.globalRank}</Text>
        </View>

        <View className="flex-row gap-3 px-5">
          <StatisticCard icon="trending-up" label="Rating" value={`${user.rating}`} />
          <StatisticCard icon="percent" label="Win Rate" value={`${user.careerStats.winRate}%`} />
          <StatisticCard icon="activity" label="Matches" value={`${user.careerStats.totalMatches}`} />
        </View>

        <View className="items-center gap-3 rounded-3xl border border-border bg-bg-card p-4 mx-5">
          <Text className="self-start text-sm font-semibold text-text">Performance Radar</Text>
          <RadarChart
            data={[
              { label: 'Attack', value: user.radar.attack },
              { label: 'Defence', value: user.radar.defence },
              { label: 'Movement', value: user.radar.movement },
              { label: 'Recovery', value: user.radar.recovery },
              { label: 'Consistency', value: user.radar.consistency },
            ]}
          />
        </View>

        <View className="gap-2 px-5">
          {menu.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => router.push(item.href as never)}
              className="flex-row items-center gap-3 rounded-2xl border border-border bg-bg-card p-4"
            >
              <Feather name={item.icon} size={18} color="#8FADFF" />
              <Text className="flex-1 text-sm font-medium text-text">{item.label}</Text>
              <Feather name="chevron-right" size={18} color="#6B7385" />
            </Pressable>
          ))}
          <Pressable
            onPress={() => {
              logout();
              router.replace('/(auth)/login');
            }}
            className="flex-row items-center justify-center gap-2 rounded-2xl border border-danger/30 bg-danger/10 p-4"
          >
            <Feather name="log-out" size={16} color="#FF5C6C" />
            <Text className="text-sm font-semibold text-danger">Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
