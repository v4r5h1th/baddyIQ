import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockPlayers } from '@/data/mock/players';
import { useToastStore } from '@/store/toast.store';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChallengeModal() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const show = useToastStore((s) => s.show);

  function sendChallenge() {
    const player = mockPlayers.find((p) => p.id === selectedId);
    show(`Challenge sent to ${player?.name ?? 'player'}!`, 'success');
    router.back();
  }

  return (
    <SafeAreaView className="flex-1 justify-end bg-black/40">
      <View className="max-h-[80%] gap-4 rounded-t-3xl bg-bg p-6">
        <View className="self-center h-1.5 w-12 rounded-full bg-border-light" />
        <Text className="text-lg font-bold text-text">Challenge a Player</Text>
        <FlatList
          data={mockPlayers.slice(0, 12)}
          keyExtractor={(p) => p.id}
          contentContainerClassName="gap-2"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedId(item.id)}
              className={`flex-row items-center gap-3 rounded-2xl border p-3 ${selectedId === item.id ? 'border-primary-500 bg-primary-900/30' : 'border-border bg-bg-card'}`}
            >
              <Avatar uri={item.avatarUrl} name={item.name} size={40} />
              <Text className="flex-1 text-sm font-medium text-text">{item.name}</Text>
              <Text className="text-xs text-text-secondary">{item.rating}</Text>
            </Pressable>
          )}
        />
        <Button label="Send Challenge" onPress={sendChallenge} disabled={!selectedId} fullWidth size="lg" />
      </View>
    </SafeAreaView>
  );
}
