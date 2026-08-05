import { TopNav } from '@/components/ui/top-nav';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const content: Record<string, { title: string; body: string }> = {
  privacy: {
    title: 'Privacy Policy',
    body:
      'RallyIQ collects match video, gameplay metadata, and performance analytics you choose to record in order to provide AI-powered coaching insights. Video is processed on-device where possible and securely uploaded for analysis when cloud processing is required. We never sell your personal data or match footage to third parties. You may delete your account and all associated data at any time from Settings.',
  },
  terms: {
    title: 'Terms of Service',
    body:
      'By using RallyIQ you agree to use the recording features responsibly and only capture footage of matches you have the right to record. RallyIQ provides performance analysis for informational purposes and does not guarantee competitive outcomes. Accounts found violating community guidelines, including harassment on leaderboards or chat features, may be suspended.',
  },
  support: {
    title: 'Help & Support',
    body:
      'Need help? Check out our in-app tutorials from the Home screen, or reach out to our support team at support@rallyiq.app. Most camera and upload issues can be resolved by checking your camera and storage permissions in Settings > Permissions. For billing questions, visit your account page on rallyiq.app.',
  },
  about: {
    title: 'About RallyIQ',
    body:
      'RallyIQ is an AI-powered badminton coaching companion that analyzes your matches using computer vision and pose estimation to give you actionable feedback on technique, movement, and strategy. Built for players of every skill level, RallyIQ turns every match into a personalized training plan.',
  },
};

export default function LegalContentScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const entry = content[slug ?? 'about'] ?? content.about;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <TopNav title={entry.title} />
      <ScrollView contentContainerClassName="gap-4 px-5 pb-10 pt-2">
        <Text className="text-sm leading-6 text-text-secondary">{entry.body}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
