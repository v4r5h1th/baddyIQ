import { Button } from '@/components/ui/button';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Something went wrong', description = 'Please try again in a moment.', onRetry }: ErrorStateProps) {
  return (
    <View className="items-center gap-3 rounded-3xl border border-danger/30 bg-danger/5 px-6 py-12">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-danger/15">
        <Feather name="alert-triangle" size={28} color="#FF5C6C" />
      </View>
      <Text className="text-center text-base font-semibold text-text">{title}</Text>
      <Text className="text-center text-sm text-text-secondary">{description}</Text>
      {onRetry ? <Button label="Retry" variant="danger" size="sm" onPress={onRetry} className="mt-2" /> : null}
    </View>
  );
}

export function RetryCard({ title = 'Upload failed', onRetry, onCancel }: { title?: string; onRetry: () => void; onCancel?: () => void }) {
  return (
    <View className="flex-row items-center justify-between rounded-2xl border border-danger/30 bg-danger/5 px-4 py-3.5">
      <View className="flex-row items-center gap-3">
        <Feather name="alert-circle" size={20} color="#FF5C6C" />
        <Text className="font-medium text-text">{title}</Text>
      </View>
      <View className="flex-row gap-3">
        {onCancel ? (
          <Text onPress={onCancel} className="text-sm font-semibold text-text-secondary">
            Cancel
          </Text>
        ) : null}
        <Text onPress={onRetry} className="text-sm font-semibold text-primary-400">
          Retry
        </Text>
      </View>
    </View>
  );
}
