import { cn } from '@/utils/cn';
import { Pressable, Modal as RNModal, View } from 'react-native';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ visible, onClose, children, className }: BottomSheetProps) {
  return (
    <RNModal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end bg-black/60" onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className={cn('rounded-t-3xl border-t border-border bg-bg-elevated p-5 pb-8', className)}
        >
          <View className="mb-4 h-1 w-10 self-center rounded-full bg-border-light" />
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
