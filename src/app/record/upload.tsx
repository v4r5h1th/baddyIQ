import { Button } from '@/components/ui/button';
import { TopNav } from '@/components/ui/top-nav';
import { useRecordStore } from '@/store/record.store';
import { generateId } from '@/utils/random';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UploadMatchScreen() {
  const [video, setVideo] = useState<{ uri: string } | null>(null);
  const { uploadStatus, uploadProgress, setUploadStatus, setUploadProgress, reset } = useRecordStore();

  async function pickVideo() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['videos'], quality: 1 });
    if (!result.canceled) setVideo({ uri: result.assets[0].uri });
  }

  function startUpload() {
    setUploadStatus('uploading');
    setUploadProgress(0);
    let progress = 0;
    const tick = setInterval(() => {
      progress += 8;
      setUploadProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(tick);
        setUploadStatus('success');
        const matchId = generateId('match');
        reset();
        router.replace(`/processing/${matchId}`);
      }
    }, 180);
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TopNav title="Upload Match" />
      <View className="flex-1 gap-5 px-6 pt-4">
        {video ? (
          <View className="gap-3">
            <View className="h-56 items-center justify-center overflow-hidden rounded-3xl bg-bg-card">
              <Feather name="film" size={40} color="#5B8CFF" />
            </View>
            <Text className="text-center text-sm text-text-secondary" numberOfLines={1}>
              {video.uri.split('/').pop()}
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={pickVideo}
            className="h-56 items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border bg-bg-card"
          >
            <Feather name="upload-cloud" size={36} color="#9AA3B8" />
            <Text className="text-sm font-medium text-text-secondary">Tap to choose a video</Text>
          </Pressable>
        )}

        {uploadStatus === 'uploading' ? (
          <View className="gap-2">
            <View className="h-2 overflow-hidden rounded-full bg-bg-input">
              <View className="h-full rounded-full bg-primary-500" style={{ width: `${uploadProgress}%` }} />
            </View>
            <Text className="text-center text-xs text-text-secondary">Uploading… {uploadProgress}%</Text>
          </View>
        ) : null}

        <View className="mt-auto pb-6">
          <Button
            label={video ? 'Upload & Analyze' : 'Choose a Video'}
            onPress={video ? startUpload : pickVideo}
            fullWidth
            size="lg"
            isLoading={uploadStatus === 'uploading'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
