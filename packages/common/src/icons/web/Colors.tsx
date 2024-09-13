import * as React from "react"
import type { SVGProps } from "react"
const SvgColors = ({
  width = 16,
  height = 16,
  fill = "none",
  stroke = "#100F0F",
  strokeWidth = 1.6,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <g fill={fill} clipPath="url(#colors_svg__a)">
      <path d="M8 16c-4.408 0-8-3.592-8-8s3.592-8 8-8 8 3.232 8 7.2c0 2.648-2.152 4.8-4.8 4.8H9.784c-.224 0-.4.176-.4.4 0 .096.04.184.104.264.328.376.512.848.512 1.336a2 2 0 0 1-2 2M8 1.6A6.41 6.41 0 0 0 1.6 8c0 3.528 2.872 6.4 6.4 6.4.224 0 .4-.176.4-.4a.43.43 0 0 0-.112-.28 2 2 0 0 1-.504-1.32 2 2 0 0 1 2-2H11.2a3.2 3.2 0 0 0 3.2-3.2c0-3.088-2.872-5.6-6.4-5.6" />
      <path d="M3.6 8.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4M6 5.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4M10 5.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4M12.4 8.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4" />
    </g>
    <defs>
      <clipPath id="colors_svg__a">
        <path fill={fill} d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgColors
