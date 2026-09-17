import { MatchCard } from '@/components/cards';
import { EmptyState } from '@/components/ui/empty-state';
import { SearchBar } from '@/components/ui/search-bar';
import { SegmentedControl } from '@/components/ui/segmented-control';
import type { MatchFilter } from '@/store/matches.store';
import { useMatchesStore } from '@/store/matches.store';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const filters: { value: MatchFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'wins', label: 'Wins' },
  { value: 'losses', label: 'Losses' },
  { value: 'favourites', label: 'Favourites' },
];

export default function MatchesScreen() {
  const { matches, fetchMatches, searchQuery, setSearchQuery, filter, setFilter, toggleFavourite, deleteMatch } = useMatchesStore();

  useEffect(() => {
    fetchMatches();
  }, []);

  const filtered = matches.filter((m) => {
    if (filter === 'wins' && m.result !== 'win') return false;
    if (filter === 'losses' && m.result !== 'loss') return false;
    if (filter === 'favourites' && !m.isFavourite) return false;
    if (filter === 'shared' && !m.isShared) return false;
    if (searchQuery && !m.opponentName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F0ECFF' }} edges={['top']}>
      <View style={{ gap: 12, paddingHorizontal: 20, paddingTop: 8 }}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1E1448', letterSpacing: -0.5 }}>Match History</Text>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder="Search opponents..." />
        <SegmentedControl options={filters} value={filter} onChange={setFilter} />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20, paddingBottom: 40, paddingTop: 16 }}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onToggleFavourite={() => toggleFavourite(item.id)}
            onDelete={() => deleteMatch(item.id)}
            onShare={() => router.push({ pathname: '/(modals)/share', params: { matchId: item.id } })}
          />
        )}
        ListEmptyComponent={<EmptyState icon="video-off" title="No matches found" description="Try adjusting your filters or record a new match." />}
      />
    </SafeAreaView>
  );
}
