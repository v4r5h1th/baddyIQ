import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader } from '@/components/navigation/brand-header';
import { RecordFlowContainer } from '@/components/record/record-flow-container';
import { useAppTheme } from '@/context/theme-context';

export default function RecordScreen() {
  const theme = useAppTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
      <BrandHeader />
      {/* Rounded card container — consistent with Coach & Matches tabs */}
      <View
        style={{
          flex: 1,
          marginHorizontal: 12,
          marginBottom: 8,
          borderRadius: 30,
          borderWidth: 1.8,
          borderColor: theme.border,
          backgroundColor: '#FFFAE8',
          overflow: 'hidden',
        }}
      >
        <RecordFlowContainer />
      </View>
    </SafeAreaView>
  );
}
