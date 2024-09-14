import { PanelVariants } from "src/types/panel";
import { create } from "zustand";

type PanelType = PanelVariants | null;

interface PanelStore {
  activePanel: PanelType;
  setActivePanel: (panel: PanelType) => void;
}

export const usePanelStore = create<PanelStore>((set) => ({
  activePanel: null,
  setActivePanel: (panel) =>
    set((state) => ({
      activePanel: state.activePanel === panel ? null : panel,
    })),
}));
