import React, { useRef, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRecordFlowStore } from '@/store/record-flow.store';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = WINDOW_WIDTH - 48; // Padding 24 on each side
const CARD_HEIGHT = WINDOW_HEIGHT < 700 ? 190 : 225; // Responsive height for smaller devices

const COURT_IMAGES = [
  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521537634581-0dced2fed2a8?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop',
];

export function Screen3SelectCourt() {
  const {
    selectedCourt,
    selectedCourtNumber,
    setCourtNumber,
    nextStep,
    prevStep,
  } = useRecordFlowStore();

  const flatListRef = useRef<FlatList>(null);
  const totalCourts = selectedCourt?.totalCourts || 3;
  const courtName = selectedCourt?.name || 'Play Arena';

  const courtsList = Array.from({ length: totalCourts }).map((_, i) => ({
    courtNumber: i + 1,
    image: COURT_IMAGES[i % COURT_IMAGES.length],
  }));

  useEffect(() => {
    const targetIndex = Math.max(0, Math.min(totalCourts - 1, selectedCourtNumber - 1));
    flatListRef.current?.scrollToIndex({
      index: targetIndex,
      animated: true,
    });
  }, []);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / CARD_WIDTH);
    const validIndex = Math.max(0, Math.min(totalCourts - 1, pageIndex));
    setCourtNumber(validIndex + 1);
  };

  const scrollToCourt = (courtNum: number) => {
    const validIndex = Math.max(0, Math.min(totalCourts - 1, courtNum - 1));
    setCourtNumber(courtNum);
    flatListRef.current?.scrollToIndex({
      index: validIndex,
      animated: true,
    });
  };

  const handlePrev = () => {
    if (selectedCourtNumber > 1) {
      scrollToCourt(selectedCourtNumber - 1);
    } else {
      scrollToCourt(totalCourts);
    }
  };

  const handleNext = () => {
    if (selectedCourtNumber < totalCourts) {
      scrollToCourt(selectedCourtNumber + 1);
    } else {
      scrollToCourt(1);
    }
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#FFFAE8' }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 110, // Generous padding so CTA is 100% above the floating tab bar
      }}
    >
      {/* Top Section */}
      <View style={{ gap: 14 }}>
        {/* Back navigation */}
        <Pressable
          onPress={prevStep}
          hitSlop={12}
          style={({ pressed }) => ({
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Feather name="chevron-left" size={24} color="#000000" />
        </Pressable>

        {/* Title and Subtitle */}
        <View style={{ alignItems: 'center', gap: 2 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#000000',
              letterSpacing: -0.4,
              textAlign: 'center',
            }}
          >
            {courtName}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#666666',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            {totalCourts} courts available
          </Text>
        </View>

        {/* Court Chip Selectors */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: 2 }}>
          {courtsList.map((c) => {
            const isSelected = c.courtNumber === selectedCourtNumber;
            return (
              <Pressable
                key={c.courtNumber}
                onPress={() => scrollToCourt(c.courtNumber)}
                style={({ pressed }) => ({
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: isSelected ? '#FF914D' : '#F0EAD6',
                  borderWidth: 1,
                  borderColor: isSelected ? '#FF914D' : '#E0D6C2',
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: isSelected ? '700' : '600',
                    color: isSelected ? '#FFFFFF' : '#444444',
                  }}
                >
                  Court {c.courtNumber}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Swipeable Court Carousel with FlatList */}
        <View style={{ width: '100%', alignItems: 'center', position: 'relative' }}>
          <FlatList
            ref={flatListRef}
            data={courtsList}
            keyExtractor={(item) => `court_${item.courtNumber}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onMomentumScrollEnd={handleScrollEnd}
            getItemLayout={(_, index) => ({
              length: CARD_WIDTH,
              offset: CARD_WIDTH * index,
              index,
            })}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 20 }}
            renderItem={({ item }) => (
              <View
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  borderRadius: 20,
                  overflow: 'hidden',
                  backgroundColor: '#2D4A3E',
                  position: 'relative',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.12,
                  shadowRadius: 10,
                  elevation: 4,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />

                {/* Top Center "Court X" Badge */}
                <View
                  style={{
                    position: 'absolute',
                    top: 14,
                    alignSelf: 'center',
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 16,
                    paddingVertical: 5,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#000000' }}>
                    Court {item.courtNumber}
                  </Text>
                </View>
              </View>
            )}
          />

          {/* Left Arrow Button Overlay */}
          <Pressable
            onPress={handlePrev}
            style={({ pressed }) => ({
              position: 'absolute',
              left: 10,
              top: CARD_HEIGHT / 2 - 18,
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
              zIndex: 10,
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <Feather name="chevron-left" size={20} color="#000000" />
          </Pressable>

          {/* Right Arrow Button Overlay */}
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => ({
              position: 'absolute',
              right: 10,
              top: CARD_HEIGHT / 2 - 18,
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
              zIndex: 10,
              opacity: pressed ? 0.75 : 1,
            })}
          >
            <Feather name="chevron-right" size={20} color="#000000" />
          </Pressable>

          {/* Pagination Dots */}
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 10 }}>
            {courtsList.map((c) => {
              const isActive = c.courtNumber === selectedCourtNumber;
              return (
                <Pressable key={c.courtNumber} onPress={() => scrollToCourt(c.courtNumber)}>
                  <View
                    style={{
                      width: isActive ? 8 : 6,
                      height: isActive ? 8 : 6,
                      borderRadius: 4,
                      backgroundColor: isActive ? '#FF914D' : '#D5CDBE',
                    }}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* Primary CTA - Use This Court */}
      <View style={{ marginTop: 20 }}>
        <Pressable
          onPress={() => nextStep()}
          style={({ pressed }) => ({
            height: 52,
            backgroundColor: '#FF914D',
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1,
            shadowColor: '#FF914D',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 3,
          })}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
            Use This Court
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
