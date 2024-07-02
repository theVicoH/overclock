import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgChevronLeft = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 4 6 8l4 4" />
  </Svg>
)
export default SvgChevronLeft
