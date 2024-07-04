import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgChevronRight = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.8, ...props }: SvgProps) => (
  <Svg width={width} height={height} fill={fill} {...props}>
    <G clipPath="url(#chevron-right_svg__a)">
      <Path stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="m6 12 4-4-4-4" />
    </G>
    <Defs>
      <ClipPath id="chevron-right_svg__a">
        <Path fill={fill} d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgChevronRight
