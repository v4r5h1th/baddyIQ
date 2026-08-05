import { VideoTimeline } from '@/components/video/video-timeline';
import type { Bookmark } from '@/types';
import { formatClock } from '@/utils/format';
import { Feather } from '@expo/vector-icons';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface VideoPlayerProps {
  source: string;
  bookmarks?: Bookmark[];
  overlays?: React.ReactNode;
  height?: number;
}

export function VideoPlayer({ source, bookmarks = [], overlays, height = 220 }: VideoPlayerProps) {
  const viewRef = useRef<VideoView>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const player = useVideoPlayer(source, (p) => {
    p.loop = true;
    p.timeUpdateEventInterval = 0.5;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { currentTime } = useEvent(player, 'timeUpdate', {
    currentTime: player.currentTime,
    currentLiveTimestamp: null,
    currentOffsetFromLive: null,
    bufferedPosition: player.bufferedPosition ?? 0,
  });

  const duration = player.duration || 1;

  function togglePlay() {
    if (isPlaying) player.pause();
    else player.play();
  }

  function seekBy(seconds: number) {
    player.currentTime = Math.max(0, Math.min(duration, player.currentTime + seconds));
  }

  function setSlowMotion(active: boolean) {
    player.playbackRate = active ? 0.25 : 1;
  }

  return (
    <View className="gap-3">
      <View style={{ height }} className="overflow-hidden rounded-3xl bg-black">
        <VideoView
          ref={viewRef}
          player={player}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          nativeControls={false}
          onFullscreenEnter={() => setIsFullscreen(true)}
          onFullscreenExit={() => setIsFullscreen(false)}
        />
        {showAnnotations ? <View pointerEvents="none" className="absolute inset-0">{overlays}</View> : null}

        <Pressable
          onPress={togglePlay}
          accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
          className="absolute inset-0 items-center justify-center"
        >
          {!isPlaying ? (
            <View className="h-16 w-16 items-center justify-center rounded-full bg-black/50">
              <Feather name="play" size={28} color="#fff" />
            </View>
          ) : null}
        </Pressable>

        <View className="absolute right-3 top-3 flex-row gap-2">
          <Pressable
            accessibilityLabel="Toggle AI annotations"
            onPress={() => setShowAnnotations((v) => !v)}
            className="h-9 w-9 items-center justify-center rounded-full bg-black/50"
          >
            <Feather name="cpu" size={16} color={showAnnotations ? '#5B8CFF' : '#fff'} />
          </Pressable>
          <Pressable
            accessibilityLabel="Toggle fullscreen"
            onPress={() => (isFullscreen ? viewRef.current?.exitFullscreen() : viewRef.current?.enterFullscreen())}
            className="h-9 w-9 items-center justify-center rounded-full bg-black/50"
          >
            <Feather name={isFullscreen ? 'minimize' : 'maximize'} size={16} color="#fff" />
          </Pressable>
        </View>
      </View>

      <VideoTimeline
        currentTime={currentTime}
        duration={duration}
        bookmarks={bookmarks}
        onSeek={(t) => {
          player.currentTime = t;
        }}
      />

      <View className="flex-row items-center justify-between px-1">
        <Text className="text-xs text-text-secondary">
          {formatClock(currentTime)} / {formatClock(duration)}
        </Text>
        <View className="flex-row items-center gap-5">
          <Pressable accessibilityLabel="Step back 1 frame" onPress={() => seekBy(-1 / 30)}>
            <Feather name="skip-back" size={18} color="#9AA3B8" />
          </Pressable>
          <Pressable accessibilityLabel="Rewind 10 seconds" onPress={() => seekBy(-10)}>
            <Feather name="rewind" size={20} color="#9AA3B8" />
          </Pressable>
          <Pressable accessibilityLabel={isPlaying ? 'Pause' : 'Play'} onPress={togglePlay}>
            <Feather name={isPlaying ? 'pause' : 'play'} size={22} color="#F4F6FB" />
          </Pressable>
          <Pressable accessibilityLabel="Forward 10 seconds" onPress={() => seekBy(10)}>
            <Feather name="fast-forward" size={20} color="#9AA3B8" />
          </Pressable>
          <Pressable accessibilityLabel="Step forward 1 frame" onPress={() => seekBy(1 / 30)}>
            <Feather name="skip-forward" size={18} color="#9AA3B8" />
          </Pressable>
          <Pressable
            accessibilityLabel="Toggle slow motion replay"
            onPressIn={() => setSlowMotion(true)}
            onPressOut={() => setSlowMotion(false)}
          >
            <Feather name="clock" size={18} color="#9AA3B8" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
