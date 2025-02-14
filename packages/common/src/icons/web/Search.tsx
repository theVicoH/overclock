
import type { SVGProps } from "react"
const SvgSearch = ({ width = 16, height = 16, fill = "none", stroke = "#000", strokeWidth = 1.6, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667M14 14l-2.867-2.867"
    />
  </svg>
)
export default SvgSearch
