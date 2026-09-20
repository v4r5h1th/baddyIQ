import React, { useEffect, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { Slot, useSegments, router } from 'expo-router';
import { TabBar } from '@/components/navigation/tab-bar';
import { useTabNavigationStore } from '@/store/tab-navigation.store';
import { useAppTheme } from '@/context/theme-context';
import { useRecordFlowStore } from '@/store/record-flow.store';
import CoachScreen from './index';
import MatchesScreen from './matches/index';
import RecordScreen from './record';
import LeaderboardScreen from './leaderboard/index';
import ProfileScreen from './profile/index';

export default function TabsLayout() {
  const segments = useSegments();
  const isSubroute = segments.length > 2; // e.g. ['(tabs)', 'matches', 'm_123']
  const theme = useAppTheme();

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const horizontalScrollRef = useRef<ScrollView>(null);
  const activeIndex = useTabNavigationStore((s) => s.activeIndex);
  const setActiveIndex = useTabNavigationStore((s) => s.setActiveIndex);
  const registerScrollHandler = useTabNavigationStore((s) => s.registerScrollHandler);

  // Register smooth scroll handler for tab button clicks or external links
  useEffect(() => {
    registerScrollHandler((index: number) => {
      horizontalScrollRef.current?.scrollTo({
        x: index * SCREEN_WIDTH,
        animated: true,
      });
    });
    return () => registerScrollHandler(null);
  }, [SCREEN_WIDTH]);

  // Handle finger swipe gesture between tabs (Instagram style)
  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / SCREEN_WIDTH);
    if (pageIndex !== activeIndex) {
      setActiveIndex(pageIndex);
    }
  };

  const handleTabPress = (index: number) => {
    if (index === 2) {
      // 3rd Tab: Record match flow begins from Step 1 (Allow Location)
      useRecordFlowStore.getState().goToStep(1);
    }

    if (isSubroute) {
      // If currently on a subroute (like match details), navigate back to tabs root
      router.replace('/(tabs)');
      setTimeout(() => {
        useTabNavigationStore.getState().goToTab(index);
      }, 50);
    } else {
      useTabNavigationStore.getState().goToTab(index);
    }
  };

  // If visiting a nested modal or subroute, render the Slot + Floating Tab Bar
  if (isSubroute) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
          <TabBar activeIndex={activeIndex} onTabPress={handleTabPress} />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* ─────────────────────────────────────────────────────────────
          INSTAGRAM-STYLE HORIZONTAL SWIPEABLE PAGER (5 TABS)
          Tab 0: Coach
          Tab 1: Matches
          Tab 2: Record Flow (Center)
          Tab 3: Leaderboard (4th Tab)
          Tab 4: Profile
      ───────────────────────────────────────────────────────────── */}
      <ScrollView
        ref={horizontalScrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        directionalLockEnabled
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ width: SCREEN_WIDTH * 5 }}
      >
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <CoachScreen />
        </View>
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <MatchesScreen />
        </View>
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <RecordScreen />
        </View>
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <LeaderboardScreen />
        </View>
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <ProfileScreen />
        </View>
      </ScrollView>

      {/* ─────────────────────────────────────────────────────────────
          FLOATING BOTTOM TAB BAR
      ───────────────────────────────────────────────────────────── */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
        <TabBar activeIndex={activeIndex} onTabPress={handleTabPress} />
      </View>
    </View>
  );
}
