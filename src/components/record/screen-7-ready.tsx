import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useRecordFlowStore } from '@/store/record-flow.store';

function VideoCameraIcon({ size = 32, color = '#FFFFFF' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 10L19.5528 7.72361C20.2177 7.39116 21 7.87465 21 8.61803V15.382C21 16.1253 20.2177 16.6088 19.5528 16.2764L15 14M5 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
        fill={color}
      />
    </Svg>
  );
}

export function Screen7Ready() {
  const {
    selectedCourt,
    selectedCourtNumber,
    selectedQuadrant,
    nextStep,
    prevStep,
    setRecordingStatus,
  } = useRecordFlowStore();

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const formatQuadrantLabel = (q: string) => {
    switch (q) {
      case 'back-left':
        return 'Back Left';
      case 'back-right':
        return 'Back Right';
      case 'front-left':
        return 'Front Left';
      case 'front-right':
        return 'Front Right';
      default:
        return 'Back Left';
    }
  };

  const handleStartRecording = () => {
    setRecordingStatus('recording');
    nextStep();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFAE8' }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 110,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header & Summary Card */}
      <View style={{ gap: 20 }}>
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

        {/* Title and subtitle */}
        <View style={{ alignItems: 'center', gap: 4, paddingHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#000000',
              letterSpacing: -0.4,
              textAlign: 'center',
            }}
          >
            Ready to Record
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#666666',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            Everything looks good. Start when you're ready.
          </Text>
        </View>

        {/* Summary Card */}
        <View
          style={{
            backgroundColor: '#F3EFE0',
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E8E1CC',
            gap: 14,
            marginTop: 6,
          }}
        >
          {/* Row 1: Court Location */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Feather name="map-pin" size={17} color="#000000" />
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>
                {selectedCourt?.name || 'Play Arena'}
              </Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#666666' }}>
              Court {selectedCourtNumber}
            </Text>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: '#E2DCD0' }} />

          {/* Row 2: Player Quadrant */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Feather name="user" size={17} color="#000000" />
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000' }}>
                You
              </Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#666666' }}>
              {formatQuadrantLabel(selectedQuadrant)}
            </Text>
          </View>
        </View>
      </View>

      {/* Big Circular Orange Record Button Section */}
      <View style={{ alignItems: 'center', gap: 18, paddingVertical: 20 }}>
        <Pressable onPress={handleStartRecording}>
          <Animated.View
            style={{
              width: 170,
              height: 170,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ scale: pulseAnim }],
            }}
          >
            {/* Outer concentric soft glow */}
            <View
              style={{
                position: 'absolute',
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: '#FFF0E0',
              }}
            />
            <View
              style={{
                position: 'absolute',
                width: 124,
                height: 124,
                borderRadius: 62,
                backgroundColor: '#FFD9B8',
              }}
            />
            {/* Core record button */}
            <View
              style={{
                width: 86,
                height: 86,
                borderRadius: 43,
                backgroundColor: '#FF914D',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#FF914D',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <VideoCameraIcon size={36} color="#FFFFFF" />
            </View>
          </Animated.View>
        </Pressable>

        <Text style={{ fontSize: 13, color: '#666666', fontWeight: '500', textAlign: 'center' }}>
          Tap to start recording
        </Text>
      </View>
    </ScrollView>
  );
}
