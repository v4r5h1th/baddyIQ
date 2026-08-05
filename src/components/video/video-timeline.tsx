import type { Bookmark } from '@/types';
import { cn } from '@/utils/cn';
import { Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

const bookmarkColor: Record<Bookmark['type'], string> = {
  'key-rally': 'bg-primary-500',
  'turning-point': 'bg-warn',
  'biggest-mistake': 'bg-danger',
  'best-rally': 'bg-accent',
};

interface VideoTimelineProps {
  currentTime: number;
  duration: number;
  bookmarks: Bookmark[];
  onSeek: (time: number) => void;
}

export function VideoTimeline({ currentTime, duration, bookmarks, onSeek }: VideoTimelineProps) {
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  const pan = Gesture.Pan().onUpdate((e) => {
    const ratio = Math.max(0, Math.min(1, e.x / 320));
    runOnJS(onSeek)(ratio * duration);
  });

  return (
    <View className="gap-2">
      <GestureDetector gesture={pan}>
        <View className="relative h-8 justify-center">
          <View className="h-1.5 w-full overflow-hidden rounded-full bg-bg-input">
            <View style={{ width: `${progress * 100}%` }} className="h-full rounded-full bg-primary-500" />
          </View>
          {bookmarks.map((bm) => (
            <View
              key={bm.id}
              style={{ left: `${(bm.timestampSeconds / duration) * 100}%` }}
              className={cn('absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-bg', bookmarkColor[bm.type])}
            />
          ))}
        </View>
      </GestureDetector>
      <View className="flex-row flex-wrap gap-2">
        {bookmarks.map((bm) => (
          <Pressable
            key={bm.id}
            onPress={() => onSeek(bm.timestampSeconds)}
            className="flex-row items-center gap-1.5 rounded-full bg-bg-input px-2.5 py-1"
          >
            <View className={cn('h-2 w-2 rounded-full', bookmarkColor[bm.type])} />
            <Text className="text-[11px] text-text-secondary">{bm.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
