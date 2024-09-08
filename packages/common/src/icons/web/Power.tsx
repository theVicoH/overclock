import React, { type SVGProps } from "react"
const SvgPower: React.FC = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.8, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M12.24 4.427a6 6 0 1 1-8.487 0M8 1.334V8"
    />
  </svg>
)
export default SvgPower
