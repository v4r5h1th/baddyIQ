import { CoachCard, MatchCard, MissionCard, StatisticCard } from '@/components/cards';
import { SectionHeader } from '@/components/ui/section-header';
import { useAuthStore } from '@/store/auth.store';
import { useMatchesStore } from '@/store/matches.store';
import { useNotificationsStore } from '@/store/notifications.store';
import { formatCompactNumber, formatSigned } from '@/utils/format';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5DDFD' }} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingHorizontal: 20, paddingBottom: 40, paddingTop: 8 }}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 13, color: '#615092', fontWeight: '500' }}>Welcome back,</Text>
            <Text style={{ fontSize: 26, fontWeight: '800', color: '#0A0841', letterSpacing: -0.5 }}>
              {user?.name?.split(' ')[0] ?? 'Player'} 👋
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/notifications')}
            style={{
              position: 'relative',
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#F9EDFD',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#6E32CC',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 4,
            }}
          >
            <Feather name="bell" size={20} color="#6E32CC" />
            {notifications.some((n) => !n.read) ? (
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#D46CC7',
                }}
              />
            ) : null}
          </Pressable>
        </View>

        {/* ── Mission Card ────────────────────────────────────────────── */}
        <MissionCard title="Win 3 matches this week to unlock the Iron Racket badge" progress={66} reward="+50 XP" />

        {/* ── Record a Match CTA ──────────────────────────────────────── */}
        <Pressable
          onPress={() => router.push('/record')}
          style={{ borderRadius: 24, overflow: 'hidden' }}
        >
          <LinearGradient
            colors={['#8B52E3', '#6E32CC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              paddingVertical: 18,
              borderRadius: 24,
            }}
          >
            <Feather name="video" size={20} color="#FFFFFF" />
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF' }}>Record a Match</Text>
          </LinearGradient>
        </Pressable>

        {/* ── Stat Cards ──────────────────────────────────────────────── */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <StatisticCard icon="trending-up" label="Current Rating" value={`${user?.rating ?? 0}`} trend="+18 this week" trendPositive />
          <StatisticCard icon="award" label="Global Rank" value={`#${formatCompactNumber(user?.globalRank ?? 0)}`} />
          <StatisticCard icon="zap" label="Win Streak" value={`${user?.careerStats?.currentStreak ?? 0}`} trend="games" trendPositive />
        </View>

        {/* ── Latest Match ────────────────────────────────────────────── */}
        {latestMatch ? (
          <View style={{ gap: 12 }}>
            <SectionHeader title="Latest Match" actionLabel="View All" onActionPress={() => router.push('/matches')} />
            <MatchCard match={latestMatch} />
          </View>
        ) : null}

        {/* ── Weekly Progress ─────────────────────────────────────────── */}
        <View style={{ gap: 12 }}>
          <SectionHeader title="Weekly Progress" actionLabel="Full Report" onActionPress={() => router.push('/weekly-report')} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <StatisticCard icon="activity" label="Matches Played" value="4" />
            <StatisticCard icon="target" label="Avg Score" value="78" trend={formatSigned(6)} trendPositive />
          </View>
        </View>

        {/* ── Coach Insight ───────────────────────────────────────────── */}
        {latestMatch ? (
          <View style={{ gap: 12 }}>
            <SectionHeader title="Coach Insight" />
            <CoachCard summary={latestMatch.coachSummary} onPress={() => router.push('/(tabs)')} />
          </View>
        ) : null}

        {/* ── Quick Actions ───────────────────────────────────────────── */}
        <View style={{ gap: 12 }}>
          <SectionHeader title="Quick Actions" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {[
              { label: 'Training', icon: 'activity' as const, href: '/training' as const },
              { label: 'Leaderboard', icon: 'award' as const, href: '/(tabs)/leaderboard' as const },
              { label: 'Achievements', icon: 'star' as const, href: '/profile/achievements' as const },
              { label: 'Settings', icon: 'settings' as const, href: '/settings' as const },
            ].map((action) => (
              <Pressable
                key={action.label}
                onPress={() => router.push(action.href)}
                style={{
                  width: '47%',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 20,
                  backgroundColor: '#F9EDFD',
                  paddingVertical: 18,
                  shadowColor: '#6E32CC',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 3,
                }}
              >
                <Feather name={action.icon} size={20} color="#6E32CC" />
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#615092' }}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ── Recent Notifications ─────────────────────────────────────── */}
        {recentNotifications.length ? (
          <View style={{ gap: 12 }}>
            <SectionHeader title="Recent Notifications" actionLabel="See All" onActionPress={() => router.push('/notifications')} />
            <View style={{ gap: 8 }}>
              {recentNotifications.map((n) => (
                <View
                  key={n.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    borderRadius: 16,
                    backgroundColor: '#F9EDFD',
                    padding: 14,
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
                    <Feather name="bell" size={14} color="#6E32CC" />
                  </View>
                  <Text numberOfLines={2} style={{ flex: 1, fontSize: 12, color: '#615092' }}>
                    {n.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
