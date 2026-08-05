import { Button } from '@/components/ui/button';
import { useRecordStore } from '@/store/record.store';
import { formatClock } from '@/utils/format';
import { generateId } from '@/utils/random';
import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecordCameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const { recordingStatus, elapsedSeconds, setRecordingStatus, setElapsedSeconds, reset } = useRecordStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
  }
  function stopTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }

  async function handleStart() {
    setRecordingStatus('recording');
    startTimer();
    try {
      await cameraRef.current?.recordAsync();
    } catch {
      // recording resolved on stop
    }
  }

  function handlePauseResume() {
    if (recordingStatus === 'recording') {
      cameraRef.current?.toggleRecordingAsync();
      setRecordingStatus('paused');
      stopTimer();
    } else {
      cameraRef.current?.toggleRecordingAsync();
      setRecordingStatus('recording');
      startTimer();
    }
  }

  function handleStop() {
    stopTimer();
    cameraRef.current?.stopRecording();
    setRecordingStatus('idle');
    const matchId = generateId('match');
    reset();
    router.replace(`/processing/${matchId}`);
  }

  if (!permission) return <View className="flex-1 bg-bg" />;

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center gap-4 bg-bg px-6">
        <Feather name="camera-off" size={40} color="#6B7385" />
        <Text className="text-center text-base text-text-secondary">We need camera access to record your match.</Text>
        <Button label="Grant Camera Access" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} mode="video" />
      <SafeAreaView className="absolute inset-x-0 top-0" edges={['top']}>
        <View className="flex-row items-center justify-between px-4 pt-2">
          <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-black/50">
            <Feather name="x" size={20} color="#fff" />
          </Pressable>
          {recordingStatus !== 'idle' ? (
            <View className="flex-row items-center gap-2 rounded-full bg-black/50 px-3 py-1.5">
              <View className="h-2 w-2 rounded-full bg-danger" />
              <Text className="text-sm font-semibold text-white">{formatClock(elapsedSeconds)}</Text>
            </View>
          ) : (
            <View />
          )}
          <Pressable
            onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
            className="h-10 w-10 items-center justify-center rounded-full bg-black/50"
          >
            <Feather name="refresh-cw" size={18} color="#fff" />
          </Pressable>
        </View>
      </SafeAreaView>
      <SafeAreaView className="absolute inset-x-0 bottom-0" edges={['bottom']}>
        <View className="items-center gap-4 pb-6">
          {recordingStatus === 'idle' ? (
            <Pressable onPress={handleStart} className="h-20 w-20 items-center justify-center rounded-full border-4 border-white">
              <View className="h-16 w-16 rounded-full bg-danger" />
            </Pressable>
          ) : (
            <View className="flex-row items-center gap-8">
              <Pressable onPress={handlePauseResume} className="h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Feather name={recordingStatus === 'recording' ? 'pause' : 'play'} size={22} color="#fff" />
              </Pressable>
              <Pressable onPress={handleStop} className="h-20 w-20 items-center justify-center rounded-full border-4 border-white">
                <View className="h-8 w-8 rounded-md bg-danger" />
              </Pressable>
              <View className="h-14 w-14" />
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
