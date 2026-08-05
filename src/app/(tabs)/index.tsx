import { CoachCard, MatchCard, MissionCard, StatisticCard } from '@/components/cards';
import { SectionHeader } from '@/components/ui/section-header';
import { useAuthStore } from '@/store/auth.store';
import { useMatchesStore } from '@/store/matches.store';
import { useNotificationsStore } from '@/store/notifications.store';
import { formatCompactNumber, formatSigned } from '@/utils/format';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const { matches, fetchMatches } = useMatchesStore();
  const { items: notifications, fetch: fetchNotifications } = useNotificationsStore();

  useEffect(() => {
    fetchMatches();
    fetchNotifications();
  }, []);

  const latestMatch = matches[0];
  const recentNotifications = notifications.slice(0, 3);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-6 px-5 pb-10 pt-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-text-secondary">Welcome back,</Text>
            <Text className="text-2xl font-bold text-text">{user?.name?.split(' ')[0] ?? 'Player'} 👋</Text>
          </View>
          <Pressable onPress={() => router.push('/notifications')} className="relative h-11 w-11 items-center justify-center rounded-full bg-bg-card">
            <Feather name="bell" size={20} color="#F4F6FB" />
            {notifications.some((n) => !n.read) ? <View className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-danger" /> : null}
          </Pressable>
        </View>

        <MissionCard title="Win 3 matches this week to unlock the Iron Racket badge" progress={66} reward="+50 XP" />

        <Pressable
          onPress={() => router.push('/record')}
          className="flex-row items-center justify-center gap-3 rounded-3xl bg-primary-500 py-4 active:opacity-90"
        >
          <Feather name="video" size={20} color="#fff" />
          <Text className="text-base font-bold text-white">Record a Match</Text>
        </Pressable>

        <View className="flex-row gap-3">
          <StatisticCard icon="trending-up" label="Current Rating" value={`${user?.rating ?? 0}`} trend="+18 this week" trendPositive />
          <StatisticCard icon="award" label="Global Rank" value={`#${formatCompactNumber(user?.globalRank ?? 0)}`} />
          <StatisticCard icon="zap" label="Win Streak" value={`${user?.careerStats.currentStreak ?? 0}`} trend="games" trendPositive />
        </View>

        {latestMatch ? (
          <View className="gap-3">
            <SectionHeader title="Latest Match" actionLabel="View All" onActionPress={() => router.push('/matches')} />
            <MatchCard match={latestMatch} />
          </View>
        ) : null}

        <View className="gap-3">
          <SectionHeader title="Weekly Progress" actionLabel="Full Report" onActionPress={() => router.push('/weekly-report')} />
          <View className="flex-row gap-3">
            <StatisticCard icon="activity" label="Matches Played" value="4" />
            <StatisticCard icon="target" label="Avg Score" value="78" trend={formatSigned(6)} trendPositive />
          </View>
        </View>

        {latestMatch ? (
          <View className="gap-3">
            <SectionHeader title="Coach Insight" />
            <CoachCard summary={latestMatch.coachSummary} onPress={() => router.push('/(tabs)/coach')} />
          </View>
        ) : null}

        <View className="gap-3">
          <SectionHeader title="Quick Actions" />
          <View className="flex-row flex-wrap gap-3">
            {[
              { label: 'Training', icon: 'activity' as const, href: '/training' as const },
              { label: 'Leaderboard', icon: 'award' as const, href: '/(tabs)/leaderboard' as const },
              { label: 'Achievements', icon: 'star' as const, href: '/profile/achievements' as const },
              { label: 'Settings', icon: 'settings' as const, href: '/settings' as const },
            ].map((action) => (
              <Pressable
                key={action.label}
                onPress={() => router.push(action.href)}
                className="w-[47%] items-center gap-2 rounded-2xl border border-border bg-bg-card py-4"
              >
                <Feather name={action.icon} size={20} color="#5B8CFF" />
                <Text className="text-xs font-medium text-text-secondary">{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {recentNotifications.length ? (
          <View className="gap-3">
            <SectionHeader title="Recent Notifications" actionLabel="See All" onActionPress={() => router.push('/notifications')} />
            <View className="gap-2">
              {recentNotifications.map((n) => (
                <View key={n.id} className="flex-row items-center gap-3 rounded-2xl border border-border bg-bg-card p-3">
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-900">
                    <Feather name="bell" size={14} color="#8FADFF" />
                  </View>
                  <Text numberOfLines={2} className="flex-1 text-xs text-text-secondary">{n.title}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
