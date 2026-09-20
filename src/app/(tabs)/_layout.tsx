import React, { useEffect, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { Slot, useSegments } from 'expo-router';
import { TabBar } from '@/components/navigation/tab-bar';
import { useTabNavigationStore } from '@/store/tab-navigation.store';
import CoachScreen from './index';
import MatchesScreen from './matches/index';
import LeaderboardScreen from './leaderboard/index';
import HomeScreen from './home';
import ProfileScreen from './profile/index';

export default function TabsLayout() {
  const segments = useSegments();
  const isSubroute = segments.length > 2; // e.g. ['(tabs)', 'leaderboard', 'compare']

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
    useTabNavigationStore.getState().goToTab(index);
  };

  // If visiting a nested modal or subroute (like compare or edit), render Slot
  if (isSubroute) {
    return <Slot />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5DDFD' }}>
      {/* ─────────────────────────────────────────────────────────────
          INSTAGRAM-STYLE HORIZONTAL SWIPEABLE PAGER (5 TABS)
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
          <LeaderboardScreen />
        </View>
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <HomeScreen />
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
