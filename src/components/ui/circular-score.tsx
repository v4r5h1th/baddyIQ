import { ProgressRing } from '@/components/ui/progress-ring';
import { palette } from '@/theme/colors';
import { Text } from 'react-native';

interface CircularScoreProps {
  score: number;
  size?: number;
  label?: string;
}

function scoreColor(score: number): string {
  if (score >= 80) return palette.accent;
  if (score >= 60) return palette.primary;
  if (score >= 40) return palette.warn;
  return palette.danger;
}

export function CircularScore({ score, size = 140, label }: CircularScoreProps) {
  return (
    <ProgressRing progress={score} size={size} strokeWidth={size * 0.09} color={scoreColor(score)}>
      <Text className="font-bold text-text" style={{ fontSize: size * 0.28 }}>
        {score}
      </Text>
      {label ? <Text className="text-xs text-text-secondary">{label}</Text> : null}
    </ProgressRing>
  );
}
