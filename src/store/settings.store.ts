import { create } from 'zustand';

export type VideoQuality = '480p' | '720p' | '1080p' | '4k';
export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Japanese';

interface SettingsState {
  notificationsEnabled: boolean;
  language: Language;
  videoQuality: VideoQuality;
  downloadQuality: VideoQuality;
  autoDownload: boolean;
  dataSaver: boolean;
  setNotificationsEnabled: (v: boolean) => void;
  setLanguage: (v: Language) => void;
  setVideoQuality: (v: VideoQuality) => void;
  setDownloadQuality: (v: VideoQuality) => void;
  setAutoDownload: (v: boolean) => void;
  setDataSaver: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  notificationsEnabled: true,
  language: 'English',
  videoQuality: '1080p',
  downloadQuality: '720p',
  autoDownload: false,
  dataSaver: false,
  setNotificationsEnabled: (v) => set({ notificationsEnabled: v }),
  setLanguage: (v) => set({ language: v }),
  setVideoQuality: (v) => set({ videoQuality: v }),
  setDownloadQuality: (v) => set({ downloadQuality: v }),
  setAutoDownload: (v) => set({ autoDownload: v }),
  setDataSaver: (v) => set({ dataSaver: v }),
}));
