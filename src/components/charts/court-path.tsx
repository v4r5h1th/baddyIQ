import { palette } from '@/theme/colors';
import { View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

interface CourtPathProps {
  idealPath: { x: number; y: number }[];
  actualPath: { x: number; y: number }[];
  width?: number;
  height?: number;
}

function toPath(pts: { x: number; y: number }[], width: number, height: number): string {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * width} ${p.y * height}`).join(' ');
}

export function CourtPath({ idealPath, actualPath, width = 300, height = 220 }: CourtPathProps) {
  return (
    <View style={{ width, height }} className="overflow-hidden rounded-2xl">
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill={palette.bgElevated} />
        <Rect x={4} y={4} width={width - 8} height={height - 8} rx={4} stroke={palette.border} strokeWidth={2} fill="none" />
        <Line x1={4} y1={height / 2} x2={width - 4} y2={height / 2} stroke={palette.border} strokeWidth={1} />
        <Path d={toPath(idealPath, width, height)} stroke={palette.textMuted} strokeWidth={2} strokeDasharray="6 5" fill="none" />
        <Path d={toPath(actualPath, width, height)} stroke={palette.primary} strokeWidth={3} fill="none" />
        {actualPath.map((p, i) => (
          <Circle key={i} cx={p.x * width} cy={p.y * height} r={3} fill={palette.primary} />
        ))}
      </Svg>
    </View>
  );
}
