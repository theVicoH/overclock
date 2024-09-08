import React, { type SVGProps } from "react"
const SvgClose: React.FC = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.6, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <path stroke={stroke} strokeLinecap="round" strokeWidth={strokeWidth} d="m3 3 10 10M3 13 13 3" />
  </svg>
)
export default SvgClose
