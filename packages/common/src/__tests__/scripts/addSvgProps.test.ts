import { describe, it, expect, beforeEach, afterEach } from "vitest"
import fs from "fs"
import path from "path"
import mock from "mock-fs"
import addSvgProps from "../../scripts/addSvgProps"

const baseDir = path.join(__dirname, "../icons")

describe("addSvgProps", () => {
  beforeEach(() => {
    mock({
      [path.join(__dirname, "../icons/mobile")]: {
        "icon1.tsx": `
          import React from 'react';
          const SvgIcon1 = (props: SvgProps) => (
            <svg width={24} height={24} fill="none" stroke="#000" strokeWidth={2}>
              <path d="M12 2 L12 22"/>
            </svg>
          );
          export default SvgIcon1;
        `,
        "icon2.tsx": `
          import React from 'react';
          const SvgIcon2 = (props: SVGProps<SVGSVGElement>) => (
            <svg width={32} height={32} fill="red" stroke="#111" strokeWidth={3}>
              <circle cx={16} cy={16} r={14}/>
            </svg>
          );
          export default SvgIcon2;
        `,
      },
      [path.join(__dirname, "../icons/web")]: {
        "icon3.tsx": `
          import React from 'react';
          const SvgIcon3 = (props: SVGProps<SVGSVGElement>) => (
            <svg width={16} height={16} fill="blue" stroke="#222" strokeWidth={1.5}>
              <rect width={16} height={16}/>
            </svg>
          );
          export default SvgIcon3;
        `,
      }
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it("should update the SVG props correctly for mobile icons", async () => {
    addSvgProps(path.join(baseDir, "mobile"))

    const icon1Data = await fs.promises.readFile(path.join(baseDir, "mobile/icon1.tsx"), "utf8")
    expect(icon1Data).toContain("const SvgIcon1 = ({ width = 24, height = 24, fill = \"none\", stroke = \"#000\", strokeWidth = 2, ...props }: SvgProps) => (")
    expect(icon1Data).toContain("<svg width={width} height={height} fill={fill} stroke={stroke} strokeWidth={strokeWidth}>")

    const icon2Data = await fs.promises.readFile(path.join(baseDir, "mobile/icon2.tsx"), "utf8")
    expect(icon2Data).toContain("const SvgIcon2 = ({ width = 32, height = 32, fill = \"red\", stroke = \"#111\", strokeWidth = 3, ...props }: SVGProps<SVGSVGElement>) => (")
    expect(icon2Data).toContain("<svg width={width} height={height} fill={fill} stroke={stroke} strokeWidth={strokeWidth}>")
  })

  it("should update the SVG props correctly for web icons", async () => {
    addSvgProps(path.join(baseDir, "web"))

    const icon3Data = await fs.promises.readFile(path.join(baseDir, "web/icon3.tsx"), "utf8")
    expect(icon3Data).toContain("const SvgIcon3 = ({ width = 16, height = 16, fill = \"blue\", stroke = \"#222\", strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement>) => (")
    expect(icon3Data).toContain("<svg width={width} height={height} fill={fill} stroke={stroke} strokeWidth={strokeWidth}>")
  })
})
