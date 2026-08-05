import { getCoachResponse } from '@/data/mock/coach';
import { simulate } from '@/services/api/mock-client';
import type { ChatMessage } from '@/types';

export const coachService = {
  ask(question: string): Promise<ChatMessage> {
    return simulate(getCoachResponse(question), 1100);
  },
};
