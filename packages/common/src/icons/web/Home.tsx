
import type { SVGProps } from "react"
const SvgHome = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.6, ...props }: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <g stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} clipPath="url(#home_svg__a)">
      <path d="M2.944 8H1.5L8 1.5 14.5 8h-1.444M2.945 8v5.056A1.444 1.444 0 0 0 4.389 14.5h7.222a1.444 1.444 0 0 0 1.445-1.444V8" />
      <path d="M5.834 14.5v-4.333a1.444 1.444 0 0 1 1.444-1.445h1.444a1.444 1.444 0 0 1 1.445 1.445V14.5" />
    </g>
    <defs>
      <clipPath id="home_svg__a">
        <path fill={fill} d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgHome
