import { create } from "zustand";

interface ModeState {
  mode: "Manual" | "Auto";
  toggleMode: () => void;
}

const useModeStore = create<ModeState>((set) => ({
  mode: "Manual",
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "Manual" ? "Auto" : "Manual",
    })),
}));

export default useModeStore;
