import { Dropdown } from '@/components/ui/dropdown';
import { TopNav } from '@/components/ui/top-nav';
import type { Language, VideoQuality } from '@/store/settings.store';
import { useSettingsStore } from '@/store/settings.store';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const languages: { value: Language; label: string }[] = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Japanese', label: 'Japanese' },
];

const qualities: { value: VideoQuality; label: string }[] = [
  { value: '480p', label: '480p' },
  { value: '720p', label: '720p' },
  { value: '1080p', label: '1080p' },
  { value: '4k', label: '4K' },
];

const legalLinks = [
  { slug: 'privacy', label: 'Privacy Policy' },
  { slug: 'terms', label: 'Terms of Service' },
  { slug: 'support', label: 'Help & Support' },
  { slug: 'about', label: 'About RallyIQ' },
];

function Row({ children }: { children: React.ReactNode }) {
  return <View className="gap-3 rounded-2xl border border-border bg-bg-card p-4">{children}</View>;
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View className="flex-row items-center justify-between rounded-2xl border border-border bg-bg-card p-4">
      <Text className="text-sm font-medium text-text">{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: '#5B8CFF' }} />
    </View>
  );
}

export default function SettingsScreen() {
  const settings = useSettingsStore();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title="Settings" />
      <ScrollView contentContainerClassName="gap-6 px-5 pb-10 pt-2">
        <View className="gap-3">
          <Text className="text-xs font-semibold uppercase text-text-secondary">Notifications</Text>
          <ToggleRow label="Push Notifications" value={settings.notificationsEnabled} onChange={settings.setNotificationsEnabled} />
        </View>

        <View className="gap-3">
          <Text className="text-xs font-semibold uppercase text-text-secondary">General</Text>
          <Row>
            <Dropdown label="Language" value={settings.language} options={languages} onChange={settings.setLanguage} />
          </Row>
        </View>

        <View className="gap-3">
          <Text className="text-xs font-semibold uppercase text-text-secondary">Video</Text>
          <Row>
            <Dropdown label="Streaming Quality" value={settings.videoQuality} options={qualities} onChange={settings.setVideoQuality} />
          </Row>
          <Row>
            <Dropdown label="Download Quality" value={settings.downloadQuality} options={qualities} onChange={settings.setDownloadQuality} />
          </Row>
          <ToggleRow label="Auto-Download New Matches" value={settings.autoDownload} onChange={settings.setAutoDownload} />
          <ToggleRow label="Data Saver Mode" value={settings.dataSaver} onChange={settings.setDataSaver} />
        </View>

        <View className="gap-3">
          <Text className="text-xs font-semibold uppercase text-text-secondary">Legal & Support</Text>
          {legalLinks.map((link) => (
            <Pressable
              key={link.slug}
              onPress={() => router.push(`/settings/legal/${link.slug}`)}
              className="flex-row items-center justify-between rounded-2xl border border-border bg-bg-card p-4"
            >
              <Text className="text-sm font-medium text-text">{link.label}</Text>
              <Feather name="chevron-right" size={18} color="#6B7385" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
