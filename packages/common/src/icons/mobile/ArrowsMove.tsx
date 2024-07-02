import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgArrowsMove = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      stroke="#D5A423"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m30 15 5 5-5 5M25 20h10M10 15l-5 5 5 5M5 20h10M15 30l5 5 5-5M20 25v10M25 10l-5-5-5 5M20 5v10"
    />
  </Svg>
)
export default SvgArrowsMove
