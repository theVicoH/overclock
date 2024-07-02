import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgClose = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path stroke="#100F0F" strokeLinecap="round" strokeWidth={1.6} d="m3 3 10 10M3 13 13 3" />
  </Svg>
)
export default SvgClose
