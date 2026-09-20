import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BrandHeader } from '@/components/navigation/brand-header';
import { MatchCard } from '@/components/cards';
import { EmptyState } from '@/components/ui/empty-state';
import { SearchBar } from '@/components/ui/search-bar';
import { SegmentedControl } from '@/components/ui/segmented-control';
import type { MatchFilter } from '@/store/matches.store';
import { useMatchesStore } from '@/store/matches.store';

const filters: { value: MatchFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'wins', label: 'Wins' },
  { value: 'losses', label: 'Losses' },
  { value: 'favourites', label: 'Favourites' },
];

export default function MatchesScreen() {
  const {
    matches,
    fetchMatches,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    toggleFavourite,
    deleteMatch,
  } = useMatchesStore();

  useEffect(() => {
    fetchMatches();
  }, []);

  const filtered = matches.filter((m) => {
    if (filter === 'wins' && m.result !== 'win') return false;
    if (filter === 'losses' && m.result !== 'loss') return false;
    if (filter === 'favourites' && !m.isFavourite) return false;
    if (filter === 'shared' && !m.isShared) return false;
    if (searchQuery && !m.opponentName.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5DDFD' }} edges={['top']}>
      {/* ─────────────────────────────────────────────────────────────
          TOP BRAND HEADER (Consistent with Tab 1)
      ───────────────────────────────────────────────────────────── */}
      <BrandHeader />

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER (Consistent with Tab 1 Styling)
      ───────────────────────────────────────────────────────────── */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 12,
          marginBottom: 8,
          borderRadius: 30,
          borderWidth: 1.8,
          borderColor: '#EAD0F5',
          backgroundColor: 'rgba(248, 233, 253, 0.65)',
          overflow: 'hidden',
          paddingTop: 16,
        }}
      >
        {/* Center-aligned Section Header */}
        <View style={{ alignItems: 'center', width: '100%', paddingHorizontal: 16, marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '900',
              color: '#0A0841',
              letterSpacing: -0.8,
              textAlign: 'center',
            }}
          >
            Match History
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#615092',
              marginTop: 2,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Recent Games & Match Analysis
          </Text>
        </View>

        {/* Search & Filter Controls */}
        <View style={{ gap: 10, paddingHorizontal: 14, marginBottom: 12 }}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search opponents..."
          />
          <SegmentedControl options={filters} value={filter} onChange={setFilter} />
        </View>

        {/* Match Cards List */}
        <FlatList
          data={filtered}
          keyExtractor={(m) => m.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            paddingHorizontal: 14,
            paddingBottom: 90,
            paddingTop: 4,
          }}
          renderItem={({ item }) => (
            <MatchCard
              match={item}
              onToggleFavourite={() => toggleFavourite(item.id)}
              onDelete={() => deleteMatch(item.id)}
              onShare={() =>
                router.push({ pathname: '/(modals)/share', params: { matchId: item.id } })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="video-off"
              title="No matches found"
              description="Try adjusting your filters or record a new match."
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
