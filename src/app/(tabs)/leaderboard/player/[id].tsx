import { StatisticCard } from '@/components/cards';
import { RadarChart } from '@/components/charts';
import { Avatar } from '@/components/ui/avatar';
import { TopNav } from '@/components/ui/top-nav';
import { currentUser } from '@/data/mock/current-user';
import { getPlayerById } from '@/data/mock/players';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlayerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const player = getPlayerById(id);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title={player.name} />
      <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-2">
        <View className="items-center gap-2">
          <Avatar uri={player.avatarUrl} name={player.name} size={88} />
          <Text className="text-xl font-bold text-text">{player.name}</Text>
          <Text className="text-sm text-text-secondary">{player.countryFlag} {player.country}</Text>
        </View>

        <View className="flex-row gap-3">
          <StatisticCard icon="trending-up" label="Rating" value={`${player.rating}`} />
          <StatisticCard icon="percent" label="Win Rate" value={`${player.winRate}%`} />
          <StatisticCard icon="zap" label="Streak" value={`${player.streak}`} />
        </View>

        <View className="gap-3 rounded-3xl border border-border bg-bg-card p-4">
          <Text className="text-sm font-semibold text-text">Current Mission</Text>
          <Text className="text-sm text-text-secondary">{player.mission}</Text>
        </View>

        <View className="items-center gap-3 rounded-3xl border border-border bg-bg-card p-4">
          <Text className="self-start text-sm font-semibold text-text">Performance Comparison</Text>
          <RadarChart
            data={[
              { label: 'Attack', value: currentUser.radar.attack },
              { label: 'Defence', value: currentUser.radar.defence },
              { label: 'Movement', value: currentUser.radar.movement },
              { label: 'Recovery', value: currentUser.radar.recovery },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
