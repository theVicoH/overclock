import { describe, it, expect, beforeEach } from "vitest";
import { useCameraStore } from "../../stores/useCameraStore";

describe("useCameraStore", () => {
  beforeEach(() => {
    useCameraStore.setState({ isCameraOn: false });
  });

  it("should toggle camera state", () => {
    const { toggleCamera } = useCameraStore.getState();

    expect(useCameraStore.getState().isCameraOn).toBe(false);

    toggleCamera();

    expect(useCameraStore.getState().isCameraOn).toBe(true);

    toggleCamera();

    expect(useCameraStore.getState().isCameraOn).toBe(false);
  });
});
