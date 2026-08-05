import { palette } from '@/theme/colors';
import { View } from 'react-native';
import Svg, { Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';

interface RadarChartProps {
  data: { label: string; value: number }[]; // value 0-100
  size?: number;
  color?: string;
}

export function RadarChart({ data, size = 240, color = palette.primary }: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.34;
  const angleStep = (2 * Math.PI) / data.length;

  const points = data.map((d, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (Math.max(0, Math.min(100, d.value)) / 100) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  });

  const axisPoints = data.map((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });

  const labelPoints = data.map((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = radius + 20;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  });

  const rings = [0.33, 0.66, 1];

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {rings.map((ring) => (
          <Polygon
            key={ring}
            points={data
              .map((_, i) => {
                const angle = -Math.PI / 2 + i * angleStep;
                const r = radius * ring;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              })
              .join(' ')}
            fill="none"
            stroke={palette.border}
            strokeWidth={1}
          />
        ))}
        {axisPoints.map((p, i) => (
          <Line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke={palette.border} strokeWidth={1} />
        ))}
        <Polygon
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill={color}
          fillOpacity={0.25}
          stroke={color}
          strokeWidth={2}
        />
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} />
        ))}
        {labelPoints.map((p, i) => (
          <SvgText
            key={i}
            x={p.x}
            y={p.y}
            fontSize={11}
            fill={palette.textSecondary}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {data[i].label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
