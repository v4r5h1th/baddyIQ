import { SetupScreen } from '@/components/features/profile-setup/setup-screen';
import { currentUser } from '@/data/mock/current-user';
import { useUserStore } from '@/store/user.store';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

export default function ProfilePhotoScreen() {
  const { draft, setDraft } = useUserStore();
  const avatar = draft.avatarUrl ?? currentUser.avatarUrl;

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setDraft({ avatarUrl: result.assets[0].uri });
  }

  return (
    <SetupScreen
      step={4}
      total={6}
      title="Add a profile picture"
      subtitle="Help friends recognize you on the leaderboard."
      onNext={() => router.push('/(profile-setup)/goal')}
    >
      <View className="items-center gap-4 pt-4">
        <Pressable onPress={pickImage} className="relative">
          <Image source={{ uri: avatar }} className="h-32 w-32 rounded-full" accessibilityLabel="Profile picture" />
          <View className="absolute bottom-0 right-0 h-9 w-9 items-center justify-center rounded-full border-2 border-bg bg-primary-500">
            <Feather name="camera" size={16} color="#fff" />
          </View>
        </Pressable>
        <Text className="text-sm text-text-secondary">Tap to choose from your library</Text>
      </View>
    </SetupScreen>
  );
}
