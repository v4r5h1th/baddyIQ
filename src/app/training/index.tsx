import { DrillCard } from '@/components/cards';
import { EmptyState } from '@/components/ui/empty-state';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { TopNav } from '@/components/ui/top-nav';
import type { TrainingTab } from '@/store/training.store';
import { useTrainingStore } from '@/store/training.store';
import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs: { value: TrainingTab; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'library', label: 'Library' },
  { value: 'completed', label: 'Completed' },
  { value: 'favourites', label: 'Favourites' },
];

export default function TrainingScreen() {
  const { drills, plan, activeTab, setActiveTab, fetch: fetchTraining, toggleFavourite } = useTrainingStore();

  useEffect(() => {
    fetchTraining();
  }, []);

  const todayDrillIds = new Set(plan.map((p) => p.drillId));
  const filtered = drills.filter((d) => {
    if (activeTab === 'today') return todayDrillIds.has(d.id);
    if (activeTab === 'completed') return d.isCompleted;
    if (activeTab === 'favourites') return d.isFavourite;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Training" showBack={false} />
      <View className="px-5 pb-3">
        <SegmentedControl options={tabs} value={activeTab} onChange={setActiveTab} />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(d) => d.id}
        contentContainerClassName="gap-3 px-5 pb-10"
        renderItem={({ item }) => <DrillCard drill={item} onToggleFavourite={() => toggleFavourite(item.id)} />}
        ListEmptyComponent={<EmptyState icon="activity" title="No drills here yet" description="Check back after completing more matches." />}
      />
    </SafeAreaView>
  );
}
