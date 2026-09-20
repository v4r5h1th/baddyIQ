import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import * as Location from 'expo-location';
import { useRecordFlowStore } from '@/store/record-flow.store';

export function LocationPinIllustration() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 200, height: 200 }}>
      {/* Outer concentric soft glow rings */}
      <View
        style={{
          position: 'absolute',
          width: 190,
          height: 190,
          borderRadius: 95,
          backgroundColor: '#FFF1E0',
          opacity: 0.9,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: '#FFE6CC',
          opacity: 0.95,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: 95,
          height: 95,
          borderRadius: 47.5,
          backgroundColor: '#FFD7B3',
        }}
      />
      {/* Core solid orange circle with location pin */}
      <View
        style={{
          width: 58,
          height: 58,
          borderRadius: 29,
          backgroundColor: '#FF914D',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#FF914D',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 10,
          elevation: 6,
        }}
      >
        <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2Z"
            fill="#FFFFFF"
          />
          <Circle cx={12} cy={9} r={3} fill="#FF914D" />
        </Svg>
      </View>
    </View>
  );
}

export function Screen1Location() {
  const { nextStep, setLocationPermission } = useRecordFlowStore();

  const handleAllow = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission('granted');
      } else {
        setLocationPermission('denied');
      }
    } catch {
      setLocationPermission('granted');
    }
    nextStep();
  };

  const handleNotNow = () => {
    setLocationPermission('denied');
    nextStep();
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#FFFAE8' }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 28,
        paddingTop: 30,
        paddingBottom: 110, // Safe distance above floating tab bar
      }}
    >
      {/* Upper section with illustration & text */}
      <View style={{ alignItems: 'center', paddingTop: 20, gap: 20 }}>
        <LocationPinIllustration />

        <View style={{ alignItems: 'center', gap: 10, paddingHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '900',
              color: '#000000',
              letterSpacing: -0.5,
              textAlign: 'center',
            }}
          >
            Allow Location
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#555555',
              textAlign: 'center',
              lineHeight: 21,
              fontWeight: '500',
            }}
          >
            We need your location to find nearby badminton courts automatically.
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={{ gap: 12, width: '100%', marginTop: 24 }}>
        {/* Primary CTA */}
        <Pressable
          onPress={handleAllow}
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
            Allow Location
          </Text>
        </Pressable>

        {/* Secondary CTA */}
        <Pressable
          onPress={handleNotNow}
          style={({ pressed }) => ({
            height: 52,
            backgroundColor: '#F0EAD6',
            borderRadius: 26,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#333333' }}>
            Not Now
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
