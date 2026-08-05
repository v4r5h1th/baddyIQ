import { NotificationCard } from '@/components/cards';
import { EmptyState } from '@/components/ui/empty-state';
import { TopNav } from '@/components/ui/top-nav';
import { useNotificationsStore } from '@/store/notifications.store';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const { items, fetch: fetchItems, markAsRead, markAllAsRead, remove } = useNotificationsStore();

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav
        title="Notifications"
        rightSlot={
          <Pressable onPress={markAllAsRead}>
            <Text className="text-xs font-semibold text-primary-400">Read All</Text>
          </Pressable>
        }
      />
      <FlatList
        data={items}
        keyExtractor={(n) => n.id}
        contentContainerClassName="gap-2 px-5 pb-10"
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onPress={() => {
              markAsRead(item.id);
              if (item.actionRoute) router.push(item.actionRoute as never);
            }}
            onDelete={() => remove(item.id)}
          />
        )}
        ListEmptyComponent={<EmptyState icon="bell-off" title="No notifications" description="You're all caught up." />}
      />
    </SafeAreaView>
  );
}
