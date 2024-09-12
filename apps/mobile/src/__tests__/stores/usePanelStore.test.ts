import { describe, it, expect, beforeEach } from "vitest";
import { usePanelStore } from "../../stores/usePanelStore";
import { PanelVariants } from "../../types/panel";

describe("usePanelStore", () => {
  beforeEach(() => {
    usePanelStore.setState({ activePanel: null });
  });

  it("should initialize with no active panel", () => {
    const panelStore = usePanelStore.getState();
    expect(panelStore.activePanel).toBeNull();
  });

  it("should set the active panel correctly", () => {
    usePanelStore.getState().setActivePanel(PanelVariants.BuzzerVolume);
    const panelStore = usePanelStore.getState();
    expect(panelStore.activePanel).toBe(PanelVariants.BuzzerVolume);
  });

  it("should toggle the active panel off if it is the same panel", () => {
    const store = usePanelStore.getState();
    console.log(usePanelStore.getState().activePanel, "1")
    store.setActivePanel(PanelVariants.BuzzerVolume);
    console.log(usePanelStore.getState().activePanel, "2")
    expect(usePanelStore.getState().activePanel).toBe(PanelVariants.BuzzerVolume);

    store.setActivePanel(PanelVariants.BuzzerVolume);
    expect(usePanelStore.getState().activePanel).toBeNull();
  });

  it("should switch between different panels correctly", () => {
    usePanelStore.getState().setActivePanel(PanelVariants.BuzzerVolume);
    expect(usePanelStore.getState().activePanel).toBe(PanelVariants.BuzzerVolume);

    usePanelStore.getState().setActivePanel(PanelVariants.Database);
    expect(usePanelStore.getState().activePanel).toBe(PanelVariants.Database);
  });
});
