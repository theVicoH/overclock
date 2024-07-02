import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgPower = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12.24 4.427a6 6 0 1 1-8.487 0M8 1.334V8" />
  </Svg>
)
export default SvgPower
