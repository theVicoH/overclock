import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgClose = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.6, ...props }: SvgProps) => (
  <Svg width={width} height={height} fill={fill} {...props}>
    <Path stroke={stroke} strokeLinecap="round" strokeWidth={strokeWidth} d="m3 3 10 10M3 13 13 3" />
  </Svg>
)
export default SvgClose
