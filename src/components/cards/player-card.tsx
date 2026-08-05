import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/utils/cn';
import { Pressable, Text } from 'react-native';

interface PlayerCardProps {
  name: string;
  avatarUrl: string;
  rating: number;
  subtitle?: string;
  selected?: boolean;
  onPress?: () => void;
}

export function PlayerCard({ name, avatarUrl, rating, subtitle, selected, onPress }: PlayerCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-1 items-center gap-2 rounded-2xl border p-4',
        selected ? 'border-primary-500 bg-primary-900/30' : 'border-border bg-bg-card',
      )}
    >
      <Avatar uri={avatarUrl} name={name} size={56} ring={selected} />
      <Text numberOfLines={1} className="font-semibold text-text">{name}</Text>
      <Text className="text-xs text-text-secondary">{subtitle ?? `Rating ${rating}`}</Text>
    </Pressable>
  );
}
