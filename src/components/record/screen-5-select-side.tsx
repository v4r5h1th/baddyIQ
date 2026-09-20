import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Line, Polygon } from 'react-native-svg';
import { useRecordFlowStore, type CourtQuadrant } from '@/store/record-flow.store';

export function InteractiveCourtDiagram({
  selected,
  onSelect,
}: {
  selected: CourtQuadrant;
  onSelect: (quadrant: CourtQuadrant) => void;
}) {
  const quadrants: { id: CourtQuadrant; label: string; x: number; y: number }[] = [
    { id: 'back-left', label: 'Back Left', x: 70, y: 70 },
    { id: 'back-right', label: 'Back Right', x: 190, y: 70 },
    { id: 'front-left', label: 'Front Left', x: 70, y: 190 },
    { id: 'front-right', label: 'Front Right', x: 190, y: 190 },
  ];

  return (
    <View
      style={{
        width: 280,
        height: 280,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Badminton Court Graphic */}
      <Svg width={280} height={280} viewBox="0 0 280 280">
        {/* Court green floor with 3D perspective angle */}
        <Polygon
          points="20,10 260,10 275,270 5,270"
          fill="#356859"
        />
        {/* Inner playing area */}
        <Polygon
          points="28,18 252,18 266,262 14,262"
          fill="#3B7A66"
        />

        {/* Outer boundary lines */}
        <Polygon
          points="28,18 252,18 266,262 14,262"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.9}
        />
        {/* Doubles side tramlines */}
        <Line x1={42} y1={18} x2={30} y2={262} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.8} />
        <Line x1={238} y1={18} x2={250} y2={262} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.8} />

        {/* Back service lines */}
        <Line x1={25} y1={36} x2={255} y2={36} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.8} />
        <Line x1={17} y1={244} x2={263} y2={244} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.8} />

        {/* Short service lines (Net area) */}
        <Line x1={22} y1={108} x2={258} y2={108} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.85} />
        <Line x1={19} y1={172} x2={261} y2={172} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.85} />

        {/* Center line (Back to Net and Net to Front) */}
        <Line x1={140} y1={18} x2={140} y2={108} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.8} />
        <Line x1={140} y1={172} x2={140} y2={262} stroke="#FFFFFF" strokeWidth={1.4} opacity={0.8} />

        {/* Center Net */}
        <Line x1={10} y1={140} x2={270} y2={140} stroke="#FFFFFF" strokeWidth={2.4} opacity={0.95} />
      </Svg>

      {/* 4 Interactive Quadrant Tap Targets */}
      {quadrants.map((q) => {
        const isSelected = selected === q.id;
        return (
          <Pressable
            key={q.id}
            onPress={() => onSelect(q.id)}
            style={{
              position: 'absolute',
              left: q.x - 45,
              top: q.y - 45,
              width: 90,
              height: 90,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isSelected ? (
              // Selected Orange Indicator with Outer Glow Ring
              <View
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  backgroundColor: 'rgba(255, 145, 77, 0.35)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1.5,
                  borderColor: 'rgba(255, 145, 77, 0.6)',
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#FF914D',
                    borderWidth: 2.5,
                    borderColor: '#FFFFFF',
                    shadowColor: '#FF914D',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 6,
                    elevation: 4,
                  }}
                />
              </View>
            ) : (
              // Neutral Inactive Target Ring
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  borderWidth: 1.5,
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 7,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  }}
                />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export function Screen5SelectSide() {
  const { selectedQuadrant, selectQuadrant, nextStep, prevStep } = useRecordFlowStore();

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
      {/* Top section */}
      <View style={{ gap: 16 }}>
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
        <View style={{ alignItems: 'center', gap: 4 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#000000',
              letterSpacing: -0.4,
              textAlign: 'center',
            }}
          >
            Select Your Side
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#666666',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            Choose the quadrant you're starting in.
          </Text>
        </View>

        {/* Badminton Court Selector */}
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <InteractiveCourtDiagram
            selected={selectedQuadrant}
            onSelect={selectQuadrant}
          />
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
            Confirm
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
