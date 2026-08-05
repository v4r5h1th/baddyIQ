import { Redirect, useLocalSearchParams } from 'expo-router';

export default function MatchDetailsIndex() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Redirect href={`/matches/${id}/summary`} />;
}
