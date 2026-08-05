import { chartSeries, palette } from '@/theme/colors';
import { Fragment } from 'react';
import { View } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  width?: number;
}

export function BarChart({ data, height = 160, width = 320 }: BarChartProps) {
  const padding = 20;
  const max = Math.max(...data.map((d) => d.value), 1);
  const barGap = 10;
  const barWidth = (width - padding * 2 - barGap * (data.length - 1)) / data.length;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {data.map((d, i) => {
          const barHeight = (d.value / max) * (height - padding * 2);
          const x = padding + i * (barWidth + barGap);
          const y = height - padding - barHeight;
          return (
            <Fragment key={d.label}>
              <Rect x={x} y={y} width={barWidth} height={barHeight} rx={6} fill={chartSeries[i % chartSeries.length]} />
              <SvgText x={x + barWidth / 2} y={height - 4} fontSize={10} fill={palette.textSecondary} textAnchor="middle">
                {d.label}
              </SvgText>
            </Fragment>
          );
        })}
      </Svg>
    </View>
  );
}
