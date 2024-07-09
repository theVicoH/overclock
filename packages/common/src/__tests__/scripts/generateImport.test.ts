import { describe, it, expect, beforeEach, afterEach } from "vitest"
import mock from "mock-fs"
import fs from "fs"
import { generateImport } from "../../scripts/generateImport"

describe("generateImport", () => {
  beforeEach(() => {
    mock({
      src: {
        services: {
          "service1.ts": "content of service1",
          "service2.ts": "content of service2",
        },
        styles: {
          "style1.ts": "content of style1",
          "style2.ts": "content of style2",
        },
        assets: {
          "asset1.txt": "content of asset1",
        },
        icons: {
          "icon1.ts": "content of icon1",
        },
      },
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it("should generate index.ts in appropriate directories", () => {
    generateImport()

    const servicesIndex = fs.readFileSync("src/services/index.ts", "utf-8")
    const stylesIndex = fs.readFileSync("src/styles/index.ts", "utf-8")

    // prettier-ignore
    expect(servicesIndex).toBe("export * from \"./service1\"\nexport * from \"./service2\"\n")
    // prettier-ignore
    expect(stylesIndex).toBe("export * from \"./style1\"\nexport * from \"./style2\"\n")
  })

  it("should not generate index.ts in icons and assets directories", () => {
    generateImport()

    expect(fs.existsSync("src/icons/index.ts")).toBe(false)
    expect(fs.existsSync("src/assets/index.ts")).toBe(false)
  })
})
