import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';

import { useTabNavigationStore } from '@/store/tab-navigation.store';

export const BRAND_HEADER_HEIGHT = 60;

function MenuIcon({ size = 18, color = '#6E32CC' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 6H20M4 12H16M4 18H20"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ShuttlecockIcon({ size = 18, color = '#FFFFFF' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C9 2 7 4.5 7 7.5C7 9.8 8.2 11.7 10 12.7L8.5 20H15.5L14 12.7C15.8 11.7 17 9.8 17 7.5C17 4.5 15 2 12 2Z"
        fill={color}
        opacity={0.95}
      />
      <Path d="M9.5 20H14.5M9 17.5H15" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

interface BrandHeaderProps {
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}

export function BrandHeader({ onMenuPress, onProfilePress }: BrandHeaderProps) {
  const user = useAuthStore((s) => s.user);
  const userName = user?.name?.split(' ')[0] ?? 'Player';

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      useTabNavigationStore.getState().goToTab('profile');
    }
  };

  return (
    <View
      style={{
        height: BRAND_HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}
    >
      {/* Left: Menu Icon Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onMenuPress}
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: 'rgba(249, 237, 253, 0.95)',
          borderWidth: 1.2,
          borderColor: '#EAD0F5',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <MenuIcon size={18} color="#6E32CC" />
      </TouchableOpacity>

      {/* Center: BaddyIQ Logo & Wordmark */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#6E32CC',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#6E32CC',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <ShuttlecockIcon size={18} color="#FFFFFF" />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
            color: '#0A0841',
            letterSpacing: -0.5,
          }}
        >
          Baddy<Text style={{ color: '#6E32CC' }}>IQ</Text>
        </Text>
      </View>

      {/* Right: Profile Avatar Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleProfilePress}
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          backgroundColor: 'rgba(249, 237, 253, 0.95)',
          borderWidth: 1.2,
          borderColor: '#EAD0F5',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#6E32CC',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {user?.avatarUrl ? (
          <Image
            source={{ uri: user.avatarUrl }}
            style={{ width: 34, height: 34, borderRadius: 17 }}
          />
        ) : (
          <Text style={{ fontSize: 13, fontWeight: '800', color: '#6E32CC' }}>
            {userName[0]}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
