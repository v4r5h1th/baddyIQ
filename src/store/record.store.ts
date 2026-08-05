import type { ProcessingStage } from '@/types';
import { create } from 'zustand';

export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped';
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'failed';

export const processingStages: { key: ProcessingStage; label: string }[] = [
  { key: 'uploading', label: 'Uploading video' },
  { key: 'court-detection', label: 'Detecting court' },
  { key: 'player-tracking', label: 'Tracking players' },
  { key: 'shuttle-tracking', label: 'Tracking shuttle' },
  { key: 'pose-estimation', label: 'Estimating pose' },
  { key: 'shot-classification', label: 'Classifying shots' },
  { key: 'generating-analysis', label: 'Generating analysis' },
  { key: 'coach-report', label: 'Writing coach report' },
  { key: 'complete', label: 'Complete' },
];

interface RecordState {
  recordingStatus: RecordingStatus;
  elapsedSeconds: number;
  uploadStatus: UploadStatus;
  uploadProgress: number;
  processingStageIndex: number;
  setRecordingStatus: (s: RecordingStatus) => void;
  setElapsedSeconds: (updater: (s: number) => number) => void;
  setUploadStatus: (s: UploadStatus) => void;
  setUploadProgress: (n: number) => void;
  setProcessingStageIndex: (updater: (n: number) => number) => void;
  reset: () => void;
}

export const useRecordStore = create<RecordState>((set) => ({
  recordingStatus: 'idle',
  elapsedSeconds: 0,
  uploadStatus: 'idle',
  uploadProgress: 0,
  processingStageIndex: 0,
  setRecordingStatus: (recordingStatus) => set({ recordingStatus }),
  setElapsedSeconds: (updater) => set((state) => ({ elapsedSeconds: updater(state.elapsedSeconds) })),
  setUploadStatus: (uploadStatus) => set({ uploadStatus }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setProcessingStageIndex: (updater) =>
    set((state) => ({ processingStageIndex: updater(state.processingStageIndex) })),
  reset: () =>
    set({
      recordingStatus: 'idle',
      elapsedSeconds: 0,
      uploadStatus: 'idle',
      uploadProgress: 0,
      processingStageIndex: 0,
    }),
}));
