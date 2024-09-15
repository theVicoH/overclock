
import type { SVGProps } from "react"
const SvgSmile = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.6, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <g stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} clipPath="url(#smile_svg__a)">
      <path d="M8 14.666A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.333" />
      <path d="M5.333 9.333s1 1.333 2.667 1.333 2.666-1.333 2.666-1.333M6 6h.006M10 6h.006" />
    </g>
    <defs>
      <clipPath id="smile_svg__a">
        <path fill={fill} d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgSmile
