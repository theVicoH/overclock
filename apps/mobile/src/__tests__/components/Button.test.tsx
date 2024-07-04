import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Button from "../../components/Button"
import { ButtonVariants, ButtonIconsPosition } from "../../types/buttons"
import { colors } from "common/styles"
import hexToRgb from "../../utils/hexToRgb"

describe("Button Component", () => {
  test("renders the button with children", () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText("Click Me")).toBeInTheDocument()
  })

  test("triggers onPress when clicked", () => {
    const handlePress = vi.fn()
    render(<Button onPress={handlePress}>Click Me</Button>)
    fireEvent.click(screen.getByText("Click Me"))
    expect(handlePress).toHaveBeenCalledTimes(1)
  })

  test("applies correct styles for primary variant", () => {
    render(<Button variant={ButtonVariants.Primary}>Primary Button</Button>)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.backgroundColor).toBe(hexToRgb(colors.primary500))
  })

  test("applies correct styles for secondary variant", () => {
    render(<Button variant={ButtonVariants.Secondary}>Secondary Button</Button>)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.backgroundColor).toBe(hexToRgb(colors.neutral400))
  })

  test("applies correct styles for error variant", () => {
    render(<Button variant={ButtonVariants.Error}>Error Button</Button>)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.backgroundColor).toBe(hexToRgb(colors.red500))
  })

  test("applies correct styles for inline variant", () => {
    render(<Button variant={ButtonVariants.Inline}>Inline Button</Button>)
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.backgroundColor).toBe("rgba(0, 0, 0, 0)")
  })

  test("renders icon on the left", () => {
    const icon = <svg data-testid="icon" />
    render(
      <Button icon={icon} iconPosition={ButtonIconsPosition.Left}>
        Button with Icon
      </Button>
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
    expect(screen.getByText("Button with Icon")).toBeInTheDocument()
  })

  test("renders icon on the right", () => {
    const icon = <svg data-testid="icon" />
    render(
      <Button icon={icon} iconPosition={ButtonIconsPosition.Right}>
        Button with Icon
      </Button>
    )
    expect(screen.getByTestId("icon")).toBeInTheDocument()
    expect(screen.getByText("Button with Icon")).toBeInTheDocument()
  })

  test("disables the button", () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  test("applies correct styles when disabled", () => {
    render(
      <Button variant={ButtonVariants.Primary} disabled>
        Disabled Primary Button
      </Button>
    )
    const background = screen.getByTestId("background")
    const computedStyle = window.getComputedStyle(background)
    expect(computedStyle.opacity).toBe("0.5")
  })
})
