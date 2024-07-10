import { renderHook } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { useJoystickControls } from "../../hooks/joystickCalculation"

describe("Test joystick calculation hook", () => {
  const radius = 64
  it("Force should be equal to 1, if distance is equal to 64", () => {
    const { result } = renderHook(() => useJoystickControls())
    expect(result.current.calculateForce(64, radius)).toBe(1)
  })
  it("Force should be equal to 0, if distance is equal to 0", () => {
    const { result } = renderHook(() => useJoystickControls())
    expect(result.current.calculateForce(0, radius)).toBe(0)
  })
  it("Force should be equal to 0.5, if distance is equal to 32", () => {
    const { result } = renderHook(() => useJoystickControls())
    expect(result.current.calculateForce(32, radius)).toBe(0.5)
  })
})
