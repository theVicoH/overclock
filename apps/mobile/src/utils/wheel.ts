import { JoystickData } from "../types/joystick"

export function StopCar(): number[] {
  const data = [0]
  return data
}

export function GoForward(joystickData: JoystickData): number[] {
  let data = []
  if (joystickData.force === 0) {
    data = [0]
  } else {
    data = [2095*joystickData.force, 2095*joystickData.force, 2095*joystickData.force, 2095*joystickData.force]
  }
  return data
}

export function GoBack(joystickData: JoystickData): number[] {
  let data = []
  if (joystickData.force === 0) {
    data = [0]
  } else {
    data = [-2095*joystickData.force, -2095*joystickData.force, -2095*joystickData.force, -2095*joystickData.force]
  }
  return data
}

export function GoLeft(joystickData: JoystickData): number[] {
  let data = []
  if (joystickData.force === 0) {
    data = [0]
  } else {
    data = [-2095*joystickData.force, -2095*joystickData.force, 2095*joystickData.force, 2095*joystickData.force]
  }
  return data
}

export function GoRight(joystickData: JoystickData): number[] {
  let data = []
  if (joystickData.force === 0) {
    data = [0]
  } else {
    data = [2095*joystickData.force, 2095*joystickData.force, -2095*joystickData.force, -2095*joystickData.force]
  }
  return data
}
