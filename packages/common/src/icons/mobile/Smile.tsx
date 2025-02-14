import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgSmile = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.6, ...props }: SvgProps) => (
  <Svg width={width} height={height} fill={fill} {...props}>
    <G stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} clipPath="url(#smile_svg__a)">
      <Path d="M8 14.666A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.333" />
      <Path d="M5.333 9.333s1 1.333 2.667 1.333 2.666-1.333 2.666-1.333M6 6h.006M10 6h.006" />
    </G>
    <Defs>
      <ClipPath id="smile_svg__a">
        <Path fill={fill} d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgSmile
