import { PlayerCard } from '@/components/cards';
import { RadarChart } from '@/components/charts';
import { TopNav } from '@/components/ui/top-nav';
import { currentUser } from '@/data/mock/current-user';
import { mockPlayers } from '@/data/mock/players';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ComparePlayersScreen() {
  const [selectedId, setSelectedId] = useState(mockPlayers[0].id);
  const opponent = mockPlayers.find((p) => p.id === selectedId) ?? mockPlayers[0];

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Compare Players" />
      <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-2">
        <View className="flex-row gap-3">
          <PlayerCard name={currentUser.name} avatarUrl={currentUser.avatarUrl} rating={currentUser.rating} selected />
          <PlayerCard name={opponent.name} avatarUrl={opponent.avatarUrl} rating={opponent.rating} selected />
        </View>

        <View className="items-center gap-3 rounded-3xl border border-border bg-bg-card p-4">
          <Text className="self-start text-sm font-semibold text-text">Head-to-Head Radar</Text>
          <RadarChart
            data={[
              { label: 'Attack', value: currentUser.radar.attack },
              { label: 'Defence', value: currentUser.radar.defence },
              { label: 'Movement', value: currentUser.radar.movement },
              { label: 'Recovery', value: currentUser.radar.recovery },
            ]}
          />
        </View>

        <Text className="text-sm font-semibold text-text">Choose an opponent</Text>
        <View className="flex-row flex-wrap gap-3">
          {mockPlayers.slice(0, 10).map((p) => (
            <View key={p.id} className="w-[47%]">
              <PlayerCard
                name={p.name}
                avatarUrl={p.avatarUrl}
                rating={p.rating}
                selected={p.id === selectedId}
                onPress={() => setSelectedId(p.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
