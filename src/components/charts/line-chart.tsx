import { palette } from '@/theme/colors';
import { View } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  width?: number;
  color?: string;
}

export function LineChart({ data, height = 160, width = 320, color = palette.primary }: LineChartProps) {
  const padding = 24;
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (width - padding * 2) / (data.length - 1 || 1);

  const points = data.map((d, i) => ({
    x: padding + i * stepX,
    y: height - padding - ((d.value - min) / range) * (height - padding * 2),
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={palette.border} strokeWidth={1} />
        <Path d={areaPath} fill={color} fillOpacity={0.12} />
        <Path d={linePath} fill="none" stroke={color} strokeWidth={2.5} />
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
        ))}
        {data.map((d, i) => (
          <SvgText key={i} x={points[i].x} y={height - 4} fontSize={10} fill={palette.textSecondary} textAnchor="middle">
            {d.label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
