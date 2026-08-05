import { mockDrills, mockTrainingPlan } from '@/data/mock/training';
import { simulate } from '@/services/api/mock-client';
import type { Drill, TrainingPlanItem } from '@/types';

export const trainingService = {
  listDrills(): Promise<Drill[]> {
    return simulate(mockDrills, 400);
  },
  getPlan(): Promise<TrainingPlanItem[]> {
    return simulate(mockTrainingPlan, 400);
  },
};
