import { cn } from '@/utils/cn';
import { Image, Text, View } from 'react-native';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  online?: boolean;
  ring?: boolean;
  className?: string;
}

export function Avatar({ uri, name, size = 48, online, ring, className }: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
    : '?';

  return (
    <View style={{ width: size, height: size }} className={cn('relative', className)}>
      <View
        style={{ width: size, height: size, borderRadius: size / 2 }}
        className={cn('items-center justify-center bg-bg-card', ring && 'border-2 border-primary-500')}
      >
        {uri ? (
          <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} accessibilityLabel={name} />
        ) : (
          <Text className="font-semibold text-text" style={{ fontSize: size * 0.35 }}>
            {initials}
          </Text>
        )}
      </View>
      {online ? (
        <View
          style={{ width: size * 0.28, height: size * 0.28, borderRadius: size * 0.14 }}
          className="absolute bottom-0 right-0 border-2 border-bg bg-accent"
        />
      ) : null}
    </View>
  );
}
