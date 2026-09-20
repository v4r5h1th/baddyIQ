import { create } from 'zustand';

export type RecordStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type CourtQuadrant = 'front-left' | 'front-right' | 'back-left' | 'back-right';

export interface NearbyCourt {
  id: string;
  name: string;
  distance: string;
  totalCourts: number;
  selectedCourtIndex: number;
  imageUrl: string;
}

export const MOCK_NEARBY_COURTS: NearbyCourt[] = [
  {
    id: 'play-arena',
    name: 'Play Arena',
    distance: '0.2 km',
    totalCourts: 3,
    selectedCourtIndex: 1, // Court 2
    imageUrl:
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'smash-zone',
    name: 'Smash Zone Sports Club',
    distance: '1.4 km',
    totalCourts: 4,
    selectedCourtIndex: 0, // Court 1
    imageUrl:
      'https://images.unsplash.com/photo-1521537634581-0dced2fed2a8?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'badminton-hub',
    name: 'Badminton Hub Arena',
    distance: '2.8 km',
    totalCourts: 6,
    selectedCourtIndex: 2, // Court 3
    imageUrl:
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1000&auto=format&fit=crop',
  },
];

interface RecordFlowState {
  currentStep: RecordStep;
  locationPermission: 'granted' | 'denied' | 'undetermined';
  cameraPermission: 'granted' | 'denied' | 'undetermined';
  cameraFacing: 'back' | 'front';
  nearbyCourts: NearbyCourt[];
  selectedCourt: NearbyCourt;
  selectedCourtNumber: number;
  selectedQuadrant: CourtQuadrant;
  trackingPhase: 'detecting' | 'player' | 'finalizing' | 'done';
  recordingStatus: 'idle' | 'recording' | 'paused' | 'stopped';
  elapsedSeconds: number;

  // Actions
  goToStep: (step: RecordStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setLocationPermission: (status: 'granted' | 'denied' | 'undetermined') => void;
  setCameraPermission: (status: 'granted' | 'denied' | 'undetermined') => void;
  toggleCameraFacing: () => void;
  selectCourt: (court: NearbyCourt) => void;
  setCourtNumber: (courtNumber: number) => void;
  nextCourtNumber: () => void;
  prevCourtNumber: () => void;
  selectQuadrant: (quadrant: CourtQuadrant) => void;
  setTrackingPhase: (phase: 'detecting' | 'player' | 'finalizing' | 'done') => void;
  setRecordingStatus: (status: 'idle' | 'recording' | 'paused' | 'stopped') => void;
  incrementElapsed: () => void;
  resetTimer: () => void;
  resetFlow: () => void;
}

export const useRecordFlowStore = create<RecordFlowState>((set, get) => ({
  currentStep: 1,
  locationPermission: 'undetermined',
  cameraPermission: 'undetermined',
  cameraFacing: 'back',
  nearbyCourts: MOCK_NEARBY_COURTS,
  selectedCourt: MOCK_NEARBY_COURTS[0],
  selectedCourtNumber: 2, // Court 2 default as in reference
  selectedQuadrant: 'back-left', // Back Left default as shown in reference
  trackingPhase: 'detecting',
  recordingStatus: 'idle',
  elapsedSeconds: 0,

  goToStep: (step) => set({ currentStep: step }),
  nextStep: () => {
    const next = Math.min(8, (get().currentStep + 1) as RecordStep) as RecordStep;
    set({ currentStep: next });
  },
  prevStep: () => {
    const prev = Math.max(1, (get().currentStep - 1) as RecordStep) as RecordStep;
    set({ currentStep: prev });
  },
  setLocationPermission: (locationPermission) => set({ locationPermission }),
  setCameraPermission: (cameraPermission) => set({ cameraPermission }),
  toggleCameraFacing: () =>
    set((state) => ({ cameraFacing: state.cameraFacing === 'back' ? 'front' : 'back' })),
  selectCourt: (court) =>
    set({
      selectedCourt: court,
      selectedCourtNumber: court.selectedCourtIndex + 1,
    }),
  setCourtNumber: (selectedCourtNumber) => set({ selectedCourtNumber }),
  nextCourtNumber: () => {
    const { selectedCourt, selectedCourtNumber } = get();
    const next = selectedCourtNumber >= selectedCourt.totalCourts ? 1 : selectedCourtNumber + 1;
    set({ selectedCourtNumber: next });
  },
  prevCourtNumber: () => {
    const { selectedCourt, selectedCourtNumber } = get();
    const prev = selectedCourtNumber <= 1 ? selectedCourt.totalCourts : selectedCourtNumber - 1;
    set({ selectedCourtNumber: prev });
  },
  selectQuadrant: (selectedQuadrant) => set({ selectedQuadrant }),
  setTrackingPhase: (trackingPhase) => set({ trackingPhase }),
  setRecordingStatus: (recordingStatus) => set({ recordingStatus }),
  incrementElapsed: () => set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 })),
  resetTimer: () => set({ elapsedSeconds: 0 }),
  resetFlow: () =>
    set({
      currentStep: 1,
      cameraFacing: 'back',
      selectedCourt: MOCK_NEARBY_COURTS[0],
      selectedCourtNumber: 2,
      selectedQuadrant: 'back-left',
      trackingPhase: 'detecting',
      recordingStatus: 'idle',
      elapsedSeconds: 0,
    }),
}));
