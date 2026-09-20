import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecordFlowContainer } from '@/components/record/record-flow-container';

export default function RecordScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFAE8' }} edges={['top']}>
      <RecordFlowContainer />
    </SafeAreaView>
  );
}
