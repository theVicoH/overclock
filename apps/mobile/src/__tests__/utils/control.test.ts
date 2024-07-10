import { stopCar, goForward, goBack, goRight, goLeft } from "../../utils/control"
import { JoystickData } from "../../types/joystick"

describe("Tests all control functions", () => {
  test("Test stopCar function", () => {
    const result = stopCar()
    expect(result).toStrictEqual([0])
  })
  test("Test goForward function with force equal to 1", () => {
    const fakeJoystickData: JoystickData = { "x": 1, "y": -64, "force": 1 }
    const result = goForward(fakeJoystickData)
    expect(result).toStrictEqual([2095, 2095, 2095, 2095])
  })
  test("Test goForward function with force equal to 0.5", () => {
    const fakeJoystickData: JoystickData = { "x": 1, "y": -64, "force": 0.5 }
    const result = goForward(fakeJoystickData)
    expect(result).toStrictEqual([1047.5, 1047.5, 1047.5, 1047.5])
  })
  test("Test goForward function with force equal to 0", () => {
    const fakeJoystickData: JoystickData = { "x": 1, "y": -64, "force": 0 }
    const result = goForward(fakeJoystickData)
    expect(result).toStrictEqual([0])
  })
  test("Test goBack function with force equal to 1", () => {
    const fakeJoystickData: JoystickData = { "x": 1, "y": 64, "force": 1 }
    const result = goBack(fakeJoystickData)
    expect(result).toStrictEqual([-2095, -2095, -2095, -2095])
  })
  test("Test goBack function with force equal to 0.5", () => {
    const fakeJoystickData: JoystickData = { "x": 1, "y": 64, "force": 0.5 }
    const result = goBack(fakeJoystickData)
    expect(result).toStrictEqual([-1047.5, -1047.5, -1047.5, -1047.5])
  })
  test("Test goBack function with force equal to 0", () => {
    const fakeJoystickData: JoystickData = { "x": 1, "y": 64, "force": 0 }
    const result = goBack(fakeJoystickData)
    expect(result).toStrictEqual([0])
  })
  test("Test goRight function with force equal to 1", () => {
    const fakeJoystickData: JoystickData = { "x": 64, "y": 1, "force": 1 }
    const result = goRight(fakeJoystickData)
    expect(result).toStrictEqual([2095, 2095, -2095, -2095])
  })
  test("Test goRight function with force equal to 0.5", () => {
    const fakeJoystickData: JoystickData = { "x": 64, "y": 1, "force": 0.5 }
    const result = goRight(fakeJoystickData)
    expect(result).toStrictEqual([1047.5, 1047.5, -1047.5, -1047.5])
  })
  test("Test goRight function with force equal to 0", () => {
    const fakeJoystickData: JoystickData = { "x": 64, "y": 1, "force": 0 }
    const result = goRight(fakeJoystickData)
    expect(result).toStrictEqual([0])
  })
  test("Test goLeft function with force equal to 1", () => {
    const fakeJoystickData: JoystickData = { "x": -64, "y": 0, "force": 1 }
    const result = goLeft(fakeJoystickData)
    expect(result).toStrictEqual([-2095, -2095, 2095, 2095])
  })
  test("Test goLeft function with force equal to 0.5", () => {
    const fakeJoystickData: JoystickData = { "x": -64, "y": 0, "force": 0.5 }
    const result = goLeft(fakeJoystickData)
    expect(result).toStrictEqual([-1047.5, -1047.5, 1047.5, 1047.5])
  })
  test("Test goLeft function with force equal to 0", () => {
    const fakeJoystickData: JoystickData = { "x": -64, "y": 0, "force": 0 }
    const result = goLeft(fakeJoystickData)
    expect(result).toStrictEqual([0])
  })
})
