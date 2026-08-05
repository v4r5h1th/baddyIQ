import { palette } from '@/theme/colors';
import { View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

interface HeatmapProps {
  points: { x: number; y: number; intensity: number }[];
  width?: number;
  height?: number;
}

export function Heatmap({ points, width = 300, height = 200 }: HeatmapProps) {
  return (
    <View style={{ width, height }} className="overflow-hidden rounded-2xl">
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill={palette.bgElevated} />
        <Rect x={0} y={height / 2} width={width} height={1} fill={palette.border} />
        <Rect x={width / 2} y={0} width={1} height={height} fill={palette.border} />
        {points.map((p, i) => (
          <Circle
            key={i}
            cx={p.x * width}
            cy={p.y * height}
            r={10 + p.intensity * 10}
            fill={palette.danger}
            opacity={p.intensity * 0.5}
          />
        ))}
      </Svg>
    </View>
  );
}
