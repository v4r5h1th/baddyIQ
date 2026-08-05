import { trainingService } from '@/services/api';
import type { Drill, TrainingPlanItem } from '@/types';
import { create } from 'zustand';

export type TrainingTab = 'today' | 'library' | 'completed' | 'favourites';

interface TrainingState {
  drills: Drill[];
  plan: TrainingPlanItem[];
  activeTab: TrainingTab;
  isLoading: boolean;
  fetch: () => Promise<void>;
  setActiveTab: (tab: TrainingTab) => void;
  toggleFavourite: (id: string) => void;
  completeDrill: (id: string) => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  drills: [],
  plan: [],
  activeTab: 'today',
  isLoading: false,
  fetch: async () => {
    set({ isLoading: true });
    const [drills, plan] = await Promise.all([trainingService.listDrills(), trainingService.getPlan()]);
    set({ drills, plan, isLoading: false });
  },
  setActiveTab: (activeTab) => set({ activeTab }),
  toggleFavourite: (id) =>
    set((state) => ({
      drills: state.drills.map((d) => (d.id === id ? { ...d, isFavourite: !d.isFavourite } : d)),
    })),
  completeDrill: (id) =>
    set((state) => ({
      drills: state.drills.map((d) => (d.id === id ? { ...d, isCompleted: true, progress: 100 } : d)),
      plan: state.plan.map((p) => (p.drillId === id ? { ...p, isCompleted: true } : p)),
    })),
}));
