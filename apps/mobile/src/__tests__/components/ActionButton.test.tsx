import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import ActionButton from "../../components/ActionButton";

describe("Action Button Component", () => {
  test("triggers onPress when clicked", () => {
    const handlePress = vi.fn();
    const icon = <svg />;
    render(<ActionButton icon={icon} method={handlePress} />);

    fireEvent.click(screen.getByTestId("actionButton"));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
