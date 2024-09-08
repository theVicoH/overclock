import React, { type SVGProps } from "react"
const SvgChevronLeft: React.FC = ({
  width = 16,
  height = 16,
  fill = "none",
  stroke = "#100F0F",
  strokeWidth = 1.8,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <path stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M10 4 6 8l4 4" />
  </svg>
)
export default SvgChevronLeft
