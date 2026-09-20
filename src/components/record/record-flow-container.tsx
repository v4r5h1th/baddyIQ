import React from 'react';
import { View } from 'react-native';
import { useRecordFlowStore } from '@/store/record-flow.store';
import { Screen1Location } from './screen-1-location';
import { Screen2Detecting } from './screen-2-detecting';
import { Screen3SelectCourt } from './screen-3-select-court';
import { Screen4FindYourself } from './screen-4-find-yourself';
import { Screen5SelectSide } from './screen-5-select-side';
import { Screen6Tracking } from './screen-6-tracking';
import { Screen7Ready } from './screen-7-ready';
import { Screen8Recording } from './screen-8-recording';

export function RecordFlowContainer() {
  const currentStep = useRecordFlowStore((s) => s.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Screen1Location />;
      case 2:
        return <Screen2Detecting />;
      case 3:
        return <Screen3SelectCourt />;
      case 4:
        return <Screen4FindYourself />;
      case 5:
        return <Screen5SelectSide />;
      case 6:
        return <Screen6Tracking />;
      case 7:
        return <Screen7Ready />;
      case 8:
        return <Screen8Recording />;
      default:
        return <Screen1Location />;
    }
  };

  return <View style={{ flex: 1, backgroundColor: '#FFFAE8' }}>{renderStep()}</View>;
}
