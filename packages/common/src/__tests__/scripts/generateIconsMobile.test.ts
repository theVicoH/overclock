import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import mock from "mock-fs"

const outDir = path.resolve(process.cwd(), "src/__tests__/icons/mobile")
const srcDir = path.resolve(process.cwd(), "src/__tests__/assets/icons")

describe("SVG to React Native Components Generation", () => {
  beforeEach(() => {
    mock({
      [srcDir]: {
        "icon1.svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 2l1.09 3.26L16 5.27l-2.45 2.12L13.91 11 12 9.27 10.09 11l.36-3.61L8 5.27l2.91-.01L12 2z\"/></svg>",
        "icon2.svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 2l1.09 3.26L16 5.27l-2.45 2.12L13.91 11 12 9.27 10.09 11l.36-3.61L8 5.27l2.91-.01L12 2z\"/></svg>"
      },
      [outDir]: {}
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it("should generate React Native components from SVG files", () => {
    execSync(`cross-env svgr --typescript --native --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" })

    const filesAfterGeneration = fs.readdirSync(outDir)
    expect(filesAfterGeneration).toContain("Icon1.tsx")
    expect(filesAfterGeneration).toContain("Icon2.tsx")

    const icon1Content = fs.readFileSync(path.join(outDir, "Icon1.tsx"), "utf8")
    expect(icon1Content).toContain("import * as React from 'react'")
    expect(icon1Content).toContain("const SvgIcon1 =")

    const icon2Content = fs.readFileSync(path.join(outDir, "Icon2.tsx"), "utf8")
    expect(icon2Content).toContain("import * as React from 'react'")
    expect(icon2Content).toContain("const SvgIcon2 =")
  })
})
