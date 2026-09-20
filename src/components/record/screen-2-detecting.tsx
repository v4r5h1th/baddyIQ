import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useRecordFlowStore, type NearbyCourt } from '@/store/record-flow.store';

function OrangeArcSpinner({ size = 36 }: { size?: number }) {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1100,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }], width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 40 40">
        <Circle
          cx={20}
          cy={20}
          r={16}
          stroke="#FFE4CC"
          strokeWidth={3.5}
          fill="none"
        />
        <Path
          d="M20 4 A 16 16 0 0 1 36 20"
          stroke="#FF914D"
          strokeWidth={3.5}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
}

function PinIcon({ color = '#000000', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={9} r={2.5} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

export function Screen2Detecting() {
  const { nearbyCourts, selectCourt, nextStep } = useRecordFlowStore();
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDetected(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (court: NearbyCourt) => {
    selectCourt(court);
    nextStep();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFAE8' }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 110,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Top spinner and title */}
      <View style={{ alignItems: 'center', gap: 16, marginBottom: 36 }}>
        <OrangeArcSpinner size={42} />

        <View style={{ alignItems: 'center', gap: 6 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#000000',
              letterSpacing: -0.4,
              textAlign: 'center',
            }}
          >
            Finding nearby courts...
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#666666',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            Detecting badminton arenas around you.
          </Text>
        </View>
      </View>

      {/* Courts list */}
      <View style={{ gap: 12 }}>
        {/* Detected Court 1 (Play Arena) */}
        <Pressable
          onPress={() => handleSelect(nearbyCourts[0])}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F3EFE0',
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: '#E8E1CC',
            opacity: pressed ? 0.8 : 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 1,
          })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <PinIcon color="#000000" size={18} />
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>
              {nearbyCourts[0].name}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: '#777777', fontWeight: '500' }}>
            {nearbyCourts[0].distance}
          </Text>
        </Pressable>

        {/* Detected Court 2 or Skeleton */}
        {detected ? (
          <Pressable
            onPress={() => handleSelect(nearbyCourts[1])}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F3EFE0',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: '#E8E1CC',
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <PinIcon color="#000000" size={18} />
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>
                {nearbyCourts[1].name}
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: '#777777', fontWeight: '500' }}>
              {nearbyCourts[1].distance}
            </Text>
          </Pressable>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F3EFE0',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: '#E8E1CC',
              opacity: 0.7,
              gap: 12,
            }}
          >
            <PinIcon color="#888888" size={18} />
            <View
              style={{
                width: 140,
                height: 14,
                borderRadius: 7,
                backgroundColor: '#E2DBD0',
              }}
            />
          </View>
        )}

        {/* Skeleton Card 3 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F3EFE0',
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: '#E8E1CC',
            opacity: 0.5,
            gap: 12,
          }}
        >
          <PinIcon color="#999999" size={18} />
          <View
            style={{
              width: 180,
              height: 14,
              borderRadius: 7,
              backgroundColor: '#E2DBD0',
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
