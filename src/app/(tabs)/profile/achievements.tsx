import { AchievementCard } from '@/components/cards';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { TopNav } from '@/components/ui/top-nav';
import { achievementsService } from '@/services/api';
import type { Achievement, AchievementCategory } from '@/types';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories: { value: AchievementCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'playing', label: 'Playing' },
  { value: 'improvement', label: 'Improvement' },
  { value: 'training', label: 'Training' },
  { value: 'leaderboards', label: 'Ranks' },
  { value: 'social', label: 'Social' },
];

export default function AchievementsScreen() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [category, setCategory] = useState<AchievementCategory | 'all'>('all');

  useEffect(() => {
    achievementsService.list().then(setAchievements);
  }, []);

  const filtered = category === 'all' ? achievements : achievements.filter((a) => a.category === category);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Achievements" />
      <View className="px-5 pb-3">
        <SegmentedControl options={categories} value={category} onChange={setCategory} />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(a) => a.id}
        numColumns={3}
        columnWrapperStyle={{ gap: 8, justifyContent: 'flex-start' }}
        contentContainerClassName="gap-2 px-5 pb-10"
        renderItem={({ item }) => <AchievementCard achievement={item} />}
      />
    </SafeAreaView>
  );
}
