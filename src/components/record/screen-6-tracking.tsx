import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';
import { useRecordFlowStore } from '@/store/record-flow.store';

export function TrackingCourtDiagram() {
  return (
    <View style={{ width: 280, height: 180, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={280} height={180} viewBox="0 0 280 180">
        {/* Court surface */}
        <Polygon
          points="20,10 260,10 270,170 10,170"
          fill="#3B7A66"
        />
        {/* Outer boundary lines */}
        <Polygon
          points="25,15 255,15 265,165 15,165"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.8}
          opacity={0.85}
        />
        {/* Center Net line */}
        <Line x1={140} y1={10} x2={140} y2={170} stroke="#FFFFFF" strokeWidth={2.4} opacity={0.95} />
        {/* Service lines */}
        <Line x1={80} y1={15} x2={80} y2={165} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.7} />
        <Line x1={200} y1={15} x2={200} y2={165} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.7} />
        {/* Center divide line */}
        <Line x1={25} y1={90} x2={80} y2={90} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.7} />
        <Line x1={200} y1={90} x2={255} y2={90} stroke="#FFFFFF" strokeWidth={1.2} opacity={0.7} />

        {/* Player Tracking Dot (Player side) */}
        <Circle cx={85} cy={95} r={16} fill="rgba(255, 145, 77, 0.3)" />
        <Circle cx={85} cy={95} r={8} fill="#FF914D" />

        {/* Opponent Tracking Dot (Opponent side) */}
        <Circle cx={195} cy={95} r={14} fill="rgba(255, 255, 255, 0.2)" />
        <Circle cx={195} cy={95} r={7} fill="#A0D0C0" />
      </Svg>
    </View>
  );
}

export function Screen6Tracking() {
  const { nextStep, prevStep } = useRecordFlowStore();
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(2), 900);
    const timer2 = setTimeout(() => setStage(3), 1800);
    const timer3 = setTimeout(() => {
      nextStep();
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFAE8',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
      }}
    >
      {/* Upper content */}
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
            Setting up tracking
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#666666',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            Calibrating court and player position...
          </Text>
        </View>

        {/* Court visualization */}
        <View style={{ alignItems: 'center', marginVertical: 8 }}>
          <TrackingCourtDiagram />
        </View>

        {/* Setup progress checklist */}
        <View style={{ gap: 14, paddingHorizontal: 24 }}>
          {/* Step 1: Court lines */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#34C759',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather name="check" size={13} color="#FFFFFF" />
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000' }}>
              Detecting court lines
            </Text>
          </View>

          {/* Step 2: Tracking player */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {stage >= 2 ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: stage === 3 ? '#34C759' : '#FF914D',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stage === 3 ? (
                  <Feather name="check" size={13} color="#FFFFFF" />
                ) : (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                )}
              </View>
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1.8,
                  borderColor: '#C2B8A3',
                }}
              />
            )}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: stage >= 2 ? '#000000' : '#888888',
              }}
            >
              Tracking player
            </Text>
          </View>

          {/* Step 3: Finalizing setup */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {stage >= 3 ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#34C759',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather name="check" size={13} color="#FFFFFF" />
              </View>
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1.8,
                  borderColor: '#C2B8A3',
                }}
              />
            )}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: stage >= 3 ? '#000000' : '#888888',
              }}
            >
              Finalizing setup
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
