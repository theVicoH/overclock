import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import IconButton from "../../components/IconButton"
import { ButtonVariants } from "../../types/buttons"
import { colors } from "common/styles"
import hexToRgb from "../../utils/hexToRgb"

describe("Icon Button Component", () => {
  test("triggers onPress when clicked", () => {
    const handlePress = vi.fn()
    const icon = <svg data-testid="icon" />
    render(<IconButton icon={icon} onPress={handlePress} />)

    fireEvent.click(screen.getByTestId("button"))

    expect(handlePress).toHaveBeenCalledTimes(1)
  })

  test("applies correct styles for primary variant", () => {
    const icon = <svg data-testid="icon" />
    render(<IconButton icon={icon} variant={ButtonVariants.Primary} />)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.backgroundColor).toBe(hexToRgb(colors.primary500))
  })

  test("applies correct styles for secondary variant", () => {
    const icon = <svg data-testid="icon" />
    render(<IconButton icon={icon} variant={ButtonVariants.Secondary} />)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.backgroundColor).toBe(hexToRgb(colors.neutral400))
  })

  test("applies correct styles for error variant", () => {
    const icon = <svg data-testid="icon" />
    render(<IconButton icon={icon} variant={ButtonVariants.Error} />)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.backgroundColor).toBe(hexToRgb(colors.red500))
  })

  test("applies correct styles for inline variant", () => {
    const icon = <svg data-testid="icon" />
    render(<IconButton icon={icon} variant={ButtonVariants.Inline} />)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.backgroundColor).toBe("rgba(0, 0, 0, 0)")
  })

  test("disables the button", () => {
    const icon = <svg data-testid="icon" />
    render(<IconButton icon={icon} disabled />)
    const button = screen.getByTestId("button")
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  test("applies correct styles when disabled", () => {
    const icon = <svg data-testid="icon" />
    render(<IconButton icon={icon} variant={ButtonVariants.Primary} disabled />)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.opacity).toBe("0.5")
  })
})
