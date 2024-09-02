import { describe, it, expect, beforeEach } from "vitest";
import useModeStore from "../../stores/useModeStore";

describe("useModeStore", () => {
  beforeEach(() => {
    useModeStore.setState({ mode: "Manual" });
  });

  it("should initialize with Manual mode", () => {
    const { mode } = useModeStore.getState();
    expect(mode).toBe("Manual");
  });

  it("should toggle mode from Manual to Auto", () => {
    const { toggleMode } = useModeStore.getState();

    toggleMode();

    const { mode } = useModeStore.getState();
    expect(mode).toBe("Auto");
  });

  it("should toggle mode from Auto to Manual", () => {
    const { toggleMode } = useModeStore.getState();

    toggleMode();
    toggleMode();

    const { mode } = useModeStore.getState();
    expect(mode).toBe("Manual");
  });
});
