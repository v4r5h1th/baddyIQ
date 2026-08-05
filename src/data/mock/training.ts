import type { Drill, DrillCategory, TrainingPlanItem } from '@/types';

const categories: DrillCategory[] = ['recovery', 'footwork', 'smash', 'drop', 'net', 'backhand', 'defence'];

const drillTitles: Record<DrillCategory, string[]> = {
  recovery: ['Base Position Reset', 'Split-Step Recovery', 'Center Court Return'],
  footwork: ['6-Corner Footwork', 'Lunge & Recover', 'Shadow Footwork Ladder'],
  smash: ['Jump Smash Power', 'Smash Angle Control', 'Cross-Court Smash'],
  drop: ['Deceptive Slow Drop', 'Fast Drop from Rearcourt', 'Reverse Slice Drop'],
  net: ['Net Kill Reflex', 'Tight Net Lift', 'Net Tumbling Push'],
  backhand: ['Backhand Clear Power', 'Backhand Drive Control', 'Backhand Serve Precision'],
  defence: ['Defensive Block Reflex', 'Body Smash Defence', 'Doubles Rotation Defence'],
};

const difficulties: Drill['difficulty'][] = ['beginner', 'intermediate', 'advanced'];

function buildDrills(): Drill[] {
  const drills: Drill[] = [];
  let id = 1;
  categories.forEach((category) => {
    drillTitles[category].forEach((title, i) => {
      drills.push({
        id: `drill_${id}`,
        title,
        category,
        illustration: `https://picsum.photos/seed/drill-${id}/300/200`,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        instructions: [
          'Start in ready position at center court.',
          'Perform the movement with full focus on technique over speed.',
          'Reset to base position between every repetition.',
          'Repeat for the prescribed number of sets.',
        ],
        durationMinutes: 8 + ((id * 3) % 15),
        difficulty: difficulties[(id + i) % difficulties.length],
        expectedImprovement: `+${4 + (id % 6)}% ${category}`,
        progress: (id * 17) % 100,
        isFavourite: id % 5 === 0,
        isCompleted: id % 4 === 0,
      });
      id += 1;
    });
  });
  return drills;
}

export const mockDrills: Drill[] = buildDrills();

export function getDrillById(id: string): Drill | undefined {
  return mockDrills.find((d) => d.id === id);
}

export const mockTrainingPlan: TrainingPlanItem[] = [
  { day: 'Monday', drillId: 'drill_2', focus: 'Footwork speed', isCompleted: true },
  { day: 'Tuesday', drillId: 'drill_8', focus: 'Smash power', isCompleted: true },
  { day: 'Wednesday', drillId: 'drill_11', focus: 'Deceptive drops', isCompleted: false },
  { day: 'Thursday', drillId: 'drill_14', focus: 'Net reflexes', isCompleted: false },
  { day: 'Friday', drillId: 'drill_18', focus: 'Backhand control', isCompleted: false },
  { day: 'Saturday', drillId: 'drill_20', focus: 'Defensive blocking', isCompleted: false },
];
