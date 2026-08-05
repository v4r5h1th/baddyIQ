import type { DominantHand, PrimaryGoal, SkillLevel } from '@/types';
import { create } from 'zustand';

interface ProfileDraft {
  name: string;
  age: string;
  dominantHand: DominantHand | null;
  skillLevel: SkillLevel | null;
  avatarUrl: string | null;
  goal: PrimaryGoal | null;
}

interface UserState {
  draft: ProfileDraft;
  setDraft: (patch: Partial<ProfileDraft>) => void;
  resetDraft: () => void;
}

const initialDraft: ProfileDraft = {
  name: '',
  age: '',
  dominantHand: null,
  skillLevel: null,
  avatarUrl: null,
  goal: null,
};

export const useUserStore = create<UserState>((set) => ({
  draft: initialDraft,
  setDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),
  resetDraft: () => set({ draft: initialDraft }),
}));
