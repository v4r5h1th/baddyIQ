import React, { useEffect, useRef } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { useRecordFlowStore } from '@/store/record-flow.store';
import { generateId } from '@/utils/random';

const PLAYER_ON_COURT_FALLBACK =
  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop';

function formatTimer(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function Screen8Recording() {
  const cameraRef = useRef<CameraView>(null);
  const {
    recordingStatus,
    elapsedSeconds,
    cameraFacing,
    cameraPermission,
    toggleCameraFacing,
    setRecordingStatus,
    incrementElapsed,
    resetTimer,
    resetFlow,
    prevStep,
  } = useRecordFlowStore();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (recordingStatus === 'recording') {
      timerRef.current = setInterval(() => {
        incrementElapsed();
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recordingStatus]);

  const handlePauseResume = () => {
    if (recordingStatus === 'recording') {
      setRecordingStatus('paused');
    } else {
      setRecordingStatus('recording');
    }
  };

  const handleStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordingStatus('stopped');
    const matchId = generateId('match');
    resetTimer();
    resetFlow();
    router.replace(`/processing/${matchId}`);
  };

  const hasCamera = cameraPermission === 'granted';

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', position: 'relative' }}>
      {/* Background Camera Preview or Fallback */}
      {hasCamera ? (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={cameraFacing}
          mode="video"
        />
      ) : (
        <Image
          source={{ uri: PLAYER_ON_COURT_FALLBACK }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      )}

      {/* Top Header Overlay: Down Chevron & Live Timer */}
      <View
        style={{
          position: 'absolute',
          top: 48,
          left: 16,
          right: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Back / Down chevron */}
        <Pressable
          onPress={prevStep}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Feather name="chevron-down" size={24} color="#FFFFFF" />
        </Pressable>

        {/* Live Recording Timer Pill */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Red Blinking / Pulsing Dot */}
          <View
            style={{
              width: 9,
              height: 9,
              borderRadius: 4.5,
              backgroundColor: recordingStatus === 'paused' ? '#FFCC00' : '#FF3B30',
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: '#FFFFFF',
              letterSpacing: 0.5,
              fontVariant: ['tabular-nums'],
            }}
          >
            {formatTimer(elapsedSeconds)}
          </Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      {/* Bottom Floating Controls */}
      <View
        style={{
          position: 'absolute',
          bottom: 100, // Above tab bar
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        {/* Pause / Resume Button */}
        <Pressable
          onPress={handlePauseResume}
          style={({ pressed }) => ({
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: 'rgba(255, 255, 255, 0.4)',
            opacity: pressed ? 0.75 : 1,
          })}
        >
          <Feather
            name={recordingStatus === 'recording' ? 'pause' : 'play'}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>

        {/* Large Stop Recording Button */}
        <Pressable
          onPress={handleStop}
          style={({ pressed }) => ({
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 3,
            borderColor: '#FFFFFF',
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#FF3B30',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                backgroundColor: '#FFFFFF',
              }}
            />
          </View>
        </Pressable>

        {/* Flip Camera Button */}
        <Pressable
          onPress={toggleCameraFacing}
          style={({ pressed }) => ({
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: 'rgba(255, 255, 255, 0.4)',
            opacity: pressed ? 0.75 : 1,
          })}
        >
          <Feather name="camera" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}
