import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TopNav } from '@/components/ui/top-nav';
import { useAuthStore } from '@/store/auth.store';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
  const { user, completeProfileSetup } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [age, setAge] = useState(String(user?.age ?? ''));
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
    if (!result.canceled) setAvatarUrl(result.assets[0].uri);
  }

  function save() {
    completeProfileSetup({ name, age: parseInt(age, 10) || user?.age, avatarUrl });
    router.back();
  }

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Edit Profile" />
      <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-2">
        <View className="items-center gap-3">
          <Pressable onPress={pickImage} className="relative">
            <Image source={{ uri: avatarUrl }} className="h-28 w-28 rounded-full" />
            <View className="absolute bottom-0 right-0 h-9 w-9 items-center justify-center rounded-full border-2 border-bg bg-primary-500">
              <Feather name="camera" size={16} color="#fff" />
            </View>
          </Pressable>
        </View>
        <Input label="Name" value={name} onChangeText={setName} />
        <Input label="Age" value={age} onChangeText={setAge} keyboardType="number-pad" />
        <Button label="Save Changes" onPress={save} fullWidth size="lg" />
      </ScrollView>
    </SafeAreaView>
  );
}
