import { TopNav } from '@/components/ui/top-nav';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const options: { icon: keyof typeof Feather.glyphMap; title: string; description: string; href: '/record/camera' | '/record/upload' }[] = [
  {
    icon: 'video',
    title: 'Record New Match',
    description: 'Use your camera to record a live match for instant AI analysis.',
    href: '/record/camera',
  },
  {
    icon: 'upload',
    title: 'Upload Existing Match',
    description: 'Choose a previously recorded match video from your library.',
    href: '/record/upload',
  },
];

export default function SelectRecordingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TopNav title="Record Match" />
      <View className="flex-1 gap-4 px-6 pt-4">
        {options.map((opt) => (
          <Pressable
            key={opt.title}
            onPress={() => router.push(opt.href)}
            className="flex-row items-center gap-4 rounded-3xl border border-border bg-bg-card p-5 active:opacity-80"
          >
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary-900">
              <Feather name={opt.icon} size={26} color="#5B8CFF" />
            </View>
            <View className="flex-1 gap-1">
              <Text className="text-base font-semibold text-text">{opt.title}</Text>
              <Text className="text-xs text-text-secondary">{opt.description}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#6B7385" />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
