import { LeaderboardCard, LeaderboardPodium } from '@/components/cards';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { SectionHeader } from '@/components/ui/section-header';
import { useAuthStore } from '@/store/auth.store';
import { useLeaderboardStore } from '@/store/leaderboard.store';
import type { LeaderboardPeriod, LeaderboardScope } from '@/types';
import { useAppTheme } from '@/context/theme-context';
import { BrandHeader } from '@/components/navigation/brand-header';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const scopes: { value: LeaderboardScope; label: string }[] = [
  { value: 'friends', label: 'Friends' },
  { value: 'regional', label: 'Regional' },
  { value: 'global', label: 'Global' },
];

const periods: { value: LeaderboardPeriod; label: string }[] = [
  { value: 'weekly', label: 'Week' },
  { value: 'monthly', label: 'Month' },
  { value: 'season', label: 'Season' },
  { value: 'all-time', label: 'All-Time' },
];

export default function LeaderboardScreen() {
  const theme = useAppTheme();
  const { scope, setScope, period, setPeriod, entries, fetch: fetchEntries } = useLeaderboardStore();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    fetchEntries();
  }, []);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
      <BrandHeader />

      {/* Rounded card container — consistent with Coach & Matches tabs */}
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
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* ── Header ──────────────────────────────────────────────── */}
          <View style={{ gap: 12, paddingHorizontal: 16, paddingTop: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 24, fontWeight: '900', color: theme.text, letterSpacing: -0.8, textAlign: 'center' }}>
                  Leaderboard
                </Text>
                <Text style={{ fontSize: 13, color: theme.textSecondary, fontWeight: '500', marginTop: 1, textAlign: 'center' }}>
                  Play. Improve. Compete.
                </Text>
              </View>
              <Pressable
                onPress={() => router.push('/(tabs)/leaderboard/compare')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  borderRadius: 20,
                  backgroundColor: theme.card,
                  borderWidth: 1,
                  borderColor: theme.border,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  shadowColor: theme.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Feather name="users" size={14} color={theme.primary} />
                <Text style={{ fontSize: 12, fontWeight: '700', color: theme.primary }}>Compare</Text>
              </Pressable>
            </View>
            <SegmentedControl options={scopes} value={scope} onChange={setScope} />
            <SegmentedControl options={periods} value={period} onChange={setPeriod} />
          </View>

          {/* ── Animated Top 3 Podium ─────────────────────────────── */}
          {top3.length >= 1 && (
            <View style={{ paddingHorizontal: 12, paddingBottom: 8 }}>
              <LeaderboardPodium
                entries={top3}
                onPress={(userId) => router.push(`/(tabs)/leaderboard/player/${userId}`)}
              />
            </View>
          )}

          {/* ── Ranks 4+ ─────────────────────────────────────────── */}
          {rest.length > 0 && (
            <View style={{ paddingHorizontal: 16, paddingTop: 8, gap: 12 }}>
              <SectionHeader title="Rankings" prominent />
              <View style={{ gap: 8 }}>
                {rest.map((item) => (
                  <LeaderboardCard
                    key={item.userId}
                    entry={item}
                    highlight={item.userId === user?.id}
                    onPress={() => router.push(`/(tabs)/leaderboard/player/${item.userId}`)}
                  />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
