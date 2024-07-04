import hexToRgb from "../../utils/hexToRgb"

describe("hexToRgb", () => {
  test("should convert shorthand hex to RGB", () => {
    expect(hexToRgb("#03f")).toBe("rgb(0, 51, 255)")
  })

  test("should convert full hex to RGB", () => {
    expect(hexToRgb("#0033ff")).toBe("rgb(0, 51, 255)")
  })

  test("should handle hex without hash", () => {
    expect(hexToRgb("0033ff")).toBe("rgb(0, 51, 255)")
  })

  test("should return null for invalid hex", () => {
    expect(hexToRgb("zzzzzz")).toBeNull()
  })

  test("should return null for incomplete hex", () => {
    expect(hexToRgb("#03")).toBeNull()
  })
})
