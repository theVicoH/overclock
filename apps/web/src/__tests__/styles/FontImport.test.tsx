import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

const FontTester: React.FC = () => {
  return (
    <div>
      <div className="font-dsDigital" style={{ fontFamily: "DSDigitalBold" }}>DS-Digital Bold</div>
      <div className="font-notoSans" style={{ fontFamily: "NotoSans" }}>NotoSans</div>
    </div>
  );
}

describe("FontTester component", () => {
  const fonts = [
    { text: "DS-Digital Bold", fontClass: "font-dsDigital", fontFamily: "DSDigitalBold" },
    { text: "NotoSans", fontClass: "font-notoSans", fontFamily: "NotoSans" },
  ];

  fonts.forEach(({ text, fontClass, fontFamily }) => {
    it(`should have the class '${fontClass}' applied to the text '${text}'`, () => {
      const { getByText } = render(<FontTester />);
      const element = getByText(text);
      expect(element).toHaveClass(fontClass);
    });

    it(`should apply the font-family '${fontFamily}' to the text '${text}'`, () => {
      const { getByText } = render(<FontTester />);
      const element = getByText(text);
      expect(window.getComputedStyle(element).fontFamily).toBe(fontFamily);
    });
  });
});
