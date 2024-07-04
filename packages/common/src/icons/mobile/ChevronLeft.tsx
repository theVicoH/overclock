import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgChevronLeft = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.8, ...props }: SvgProps) => (
  <Svg width={width} height={height} fill={fill} {...props}>
    <Path stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M10 4 6 8l4 4" />
  </Svg>
)
export default SvgChevronLeft
