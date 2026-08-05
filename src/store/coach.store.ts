import { initialCoachMessage } from '@/data/mock/coach';
import { coachService } from '@/services/api';
import type { ChatMessage } from '@/types';
import { generateId } from '@/utils/random';
import { create } from 'zustand';

interface CoachState {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (text: string) => Promise<void>;
}

export const useCoachStore = create<CoachState>((set, get) => ({
  messages: [initialCoachMessage],
  isTyping: false,
  sendMessage: async (text) => {
    const userMessage: ChatMessage = {
      id: generateId('msg'),
      role: 'user',
      text,
      createdAt: new Date().toISOString(),
    };
    set({ messages: [...get().messages, userMessage], isTyping: true });
    const reply = await coachService.ask(text);
    set({ messages: [...get().messages, reply], isTyping: false });
  },
}));
