import * as React from "react"
import type { SVGProps } from "react"
const SvgArrowsMove = ({
  width = 40,
  height = 40,
  fill = "none",
  stroke = "#D5A423",
  strokeWidth = 3,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m30 15 5 5-5 5M25 20h10M10 15l-5 5 5 5M5 20h10M15 30l5 5 5-5M20 25v10M25 10l-5-5-5 5M20 5v10"
    />
  </svg>
)
export default SvgArrowsMove
