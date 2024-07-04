import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgArrowsMove = ({ width = 40, height = 40, fill = "none", stroke = "#D5A423", strokeWidth = 3, ...props }: SvgProps) => (
  <Svg width={width} height={height} fill={fill} {...props}>
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m30 15 5 5-5 5M25 20h10M10 15l-5 5 5 5M5 20h10M15 30l5 5 5-5M20 25v10M25 10l-5-5-5 5M20 5v10"
    />
  </Svg>
)
export default SvgArrowsMove
