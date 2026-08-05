import type { NotificationItem, NotificationType } from '@/types';
import { cn } from '@/utils/cn';
import { formatRelativeTime } from '@/utils/format';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

const iconMap: Record<NotificationType, keyof typeof Feather.glyphMap> = {
  'analysis-ready': 'bar-chart-2',
  'weekly-report': 'file-text',
  'friend-overtook': 'users',
  'challenge-invite': 'crosshair',
  'mission-complete': 'check-circle',
  'achievement-unlocked': 'award',
  'practice-reminder': 'clock',
};

interface NotificationCardProps {
  notification: NotificationItem;
  onPress?: () => void;
  onDelete?: () => void;
}

export function NotificationCard({ notification, onPress, onDelete }: NotificationCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-row items-start gap-3 rounded-2xl border p-4',
        notification.read ? 'border-border bg-bg-card' : 'border-primary-700 bg-primary-900/20',
      )}
    >
      <View className="mt-0.5 h-9 w-9 items-center justify-center rounded-full bg-bg-input">
        <Feather name={iconMap[notification.type]} size={16} color="#8FADFF" />
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          {!notification.read ? <View className="h-2 w-2 rounded-full bg-primary-500" /> : null}
          <Text className="font-semibold text-text">{notification.title}</Text>
        </View>
        <Text className="text-sm text-text-secondary">{notification.body}</Text>
        <Text className="text-xs text-text-muted">{formatRelativeTime(notification.createdAt)}</Text>
      </View>
      {onDelete ? (
        <Pressable accessibilityLabel="Delete notification" onPress={onDelete} hitSlop={8}>
          <Feather name="x" size={16} color="#6B7385" />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
