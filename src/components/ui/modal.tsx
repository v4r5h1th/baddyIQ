import { cn } from '@/utils/cn';
import { Pressable, Modal as RNModal } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ visible, onClose, children, className }: ModalProps) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 items-center justify-center bg-black/70 px-6" onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className={cn('w-full rounded-3xl border border-border bg-bg-elevated p-5', className)}
        >
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
