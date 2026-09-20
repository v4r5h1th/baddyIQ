import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRecordFlowStore } from '@/store/record-flow.store';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');
const PREVIEW_HEIGHT = WINDOW_HEIGHT < 700 ? 220 : 250;

const PLAYER_ON_COURT_FALLBACK =
  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop';

export function Screen4FindYourself() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const {
    cameraFacing,
    toggleCameraFacing,
    setCameraPermission,
    nextStep,
    prevStep,
  } = useRecordFlowStore();

  useEffect(() => {
    if (!permission) {
      requestPermission().then((res) => {
        setCameraPermission(res.granted ? 'granted' : 'denied');
      });
    } else {
      setCameraPermission(permission.granted ? 'granted' : 'denied');
    }
  }, [permission]);

  const hasCamera = permission?.granted;

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
        paddingBottom: 110,
      }}
    >
      {/* Upper section */}
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

        {/* Title and subtitle */}
        <View style={{ alignItems: 'center', gap: 2, paddingHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#000000',
              letterSpacing: -0.4,
              textAlign: 'center',
            }}
          >
            Find Yourself
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#666666',
              fontWeight: '500',
              textAlign: 'center',
              lineHeight: 18,
            }}
          >
            Make sure you're visible in the camera view before continuing.
          </Text>
        </View>

        {/* Camera Preview Card */}
        <View style={{ alignItems: 'center', gap: 14, marginTop: 4 }}>
          <View
            style={{
              width: '100%',
              height: PREVIEW_HEIGHT,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#1E2923',
              position: 'relative',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 4,
            }}
          >
            {hasCamera ? (
              <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing={cameraFacing}
                mode="video"
              />
            ) : (
              <Image
                source={{ uri: PLAYER_ON_COURT_FALLBACK }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            )}
          </View>

          {/* Switch Camera Button */}
          <Pressable
            onPress={toggleCameraFacing}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#F3EFE0',
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#E8E1CC',
              opacity: pressed ? 0.75 : 1,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 3,
              elevation: 1,
            })}
          >
            <Feather name="camera" size={16} color="#000000" />
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#000000' }}>
              Switch Camera
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Primary CTA */}
      <View style={{ marginTop: 20 }}>
        <Pressable
          onPress={nextStep}
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
            Next
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
