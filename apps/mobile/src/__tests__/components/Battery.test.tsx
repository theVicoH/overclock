import React from "react";
import { render, screen } from "@testing-library/react";
import BatteryComponent from "../../components/Battery";
import { colors } from "common/styles";
import hexToRgb from "../../utils/hexToRgb"

describe("Battery Component", () => {
  test("displays correct color and size for high battery", () => {
    render(<BatteryComponent battery={75} />);
    const batteryFill = screen.getByTestId("batteryFill");
    expect(batteryFill.style.backgroundColor).toBe(hexToRgb(colors.white));
    expect(batteryFill.style.width).toBe(`${(75 * 23) / 100}px`);
  });

  test("displays correct color and size for medium battery", () => {
    render(<BatteryComponent battery={35} />);
    const batteryFill = screen.getByTestId("batteryFill");
    expect(batteryFill.style.backgroundColor).toBe(hexToRgb(colors.primary500));
    expect(batteryFill.style.width).toBe(`${(35 * 23) / 100}px`);
  });

  test("displays correct color and size for low battery", () => {
    render(<BatteryComponent battery={15} />);
    const batteryFill = screen.getByTestId("batteryFill");
    expect(batteryFill.style.backgroundColor).toBe(hexToRgb(colors.red500));
    expect(batteryFill.style.width).toBe(`${(15 * 23) / 100}px`);
  });
});
