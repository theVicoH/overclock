import { create } from "zustand";

interface CameraState {
  isCameraOn: boolean;
  toggleCamera: () => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  isCameraOn: false,
  toggleCamera: () => set((state) => ({ isCameraOn: !state.isCameraOn })),
}));
