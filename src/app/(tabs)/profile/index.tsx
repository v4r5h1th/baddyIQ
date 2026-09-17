import { StatisticCard } from '@/components/cards';
import { RadarChart } from '@/components/charts';
import { currentUser } from '@/data/mock/current-user';
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
  const { user: authUser, logout } = useAuthStore();
  const user = authUser ?? currentUser;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5DDFD' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ gap: 20, paddingBottom: 40 }}>
        {/* Banner */}
        <View style={{ height: 140, width: '100%', backgroundColor: '#F8E9FD' }}>
          <Image source={{ uri: user.bannerUrl }} style={{ height: 140, width: '100%' }} />
        </View>

        {/* Avatar & Name */}
        <View style={{ marginTop: -56, alignItems: 'center', gap: 6, paddingHorizontal: 20 }}>
          <Image
            source={{ uri: user.avatarUrl }}
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              borderWidth: 4,
              borderColor: '#F5DDFD',
            }}
          />
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#0A0841', marginTop: 4 }}>{user.name}</Text>
          <Text style={{ fontSize: 13, color: '#615092' }}>
            {user.countryFlag} {user.country} · Rank #{user.globalRank}
          </Text>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20 }}>
          <StatisticCard icon="trending-up" label="Rating" value={`${user.rating}`} />
          <StatisticCard icon="percent" label="Win Rate" value={`${user.careerStats.winRate}%`} />
          <StatisticCard icon="activity" label="Matches" value={`${user.careerStats.totalMatches}`} />
        </View>

        {/* Performance Radar */}
        <View
          style={{
            alignItems: 'center',
            gap: 12,
            borderRadius: 24,
            backgroundColor: '#F9EDFD',
            padding: 18,
            marginHorizontal: 20,
            shadowColor: '#6E32CC',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <Text style={{ alignSelf: 'flex-start', fontSize: 15, fontWeight: '700', color: '#0A0841' }}>
            Performance Radar
          </Text>
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

        {/* Menu */}
        <View style={{ gap: 8, paddingHorizontal: 20 }}>
          {menu.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => router.push(item.href as never)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                borderRadius: 18,
                backgroundColor: '#F9EDFD',
                padding: 16,
                shadowColor: '#6E32CC',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#F8E9FD',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather name={item.icon} size={16} color="#6E32CC" />
              </View>
              <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: '#0A0841' }}>{item.label}</Text>
              <Feather name="chevron-right" size={18} color="#D46CC7" />
            </Pressable>
          ))}

          {/* Log Out */}
          <Pressable
            onPress={() => {
              logout();
              router.replace('/(auth)/login');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderRadius: 18,
              backgroundColor: '#FAC0F6',
              padding: 16,
              marginTop: 4,
            }}
          >
            <Feather name="log-out" size={16} color="#6E32CC" />
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#6E32CC' }}>Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
