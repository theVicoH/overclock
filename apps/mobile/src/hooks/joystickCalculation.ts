import { useCallback } from "react"

export const useJoystickControls = () => {
  const calculateForce = useCallback((distance: number, radius: number) => {
    return Math.min(distance / radius, 1)
  }, [])

  return {
    calculateForce
  }
}
