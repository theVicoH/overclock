import { JoystickData } from "../types/joystick"

export function stopCar(): number[] {
  const data = [0]
  return data
}

export function goForward(joystickData: JoystickData): number[] {
  let data = []
  if (joystickData.force === 0) {
    data = [0]
  } else {
    data = [2095*joystickData.force, 2095*joystickData.force, 2095*joystickData.force, 2095*joystickData.force]
  }
  return data
}

export function goBack(joystickData: JoystickData): number[] {
  let data = []
  if (joystickData.force === 0) {
    data = [0]
  } else {
    data = [-2095*joystickData.force, -2095*joystickData.force, -2095*joystickData.force, -2095*joystickData.force]
  }
  return data
}

export function goLeft(joystickData: JoystickData): number[] {
  let data = []
  if (joystickData.force === 0) {
    data = [0]
  } else {
    data = [-2095*joystickData.force, -2095*joystickData.force, 2095*joystickData.force, 2095*joystickData.force]
  }
  return data
}

export function goRight(joystickData: JoystickData): number[] {
  let data = []
  if (joystickData.force === 0) {
    data = [0]
  } else {
    data = [2095*joystickData.force, 2095*joystickData.force, -2095*joystickData.force, -2095*joystickData.force]
  }
  return data
}
