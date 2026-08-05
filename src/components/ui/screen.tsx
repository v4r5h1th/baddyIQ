import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  edges?: Edge[];
  className?: string;
  contentClassName?: string;
}

export function Screen({ children, scroll = true, edges = ['top'], className, contentClassName }: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className={cn('flex-1 bg-bg', className)}>
      {scroll ? (
        <ScrollView
          contentContainerClassName={cn('gap-5 px-4 pb-10 pt-2', contentClassName)}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View className={cn('flex-1 px-4 pt-2', contentClassName)}>{children}</View>
      )}
    </SafeAreaView>
  );
}
