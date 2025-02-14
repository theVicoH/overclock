import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgMail = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.6, ...props }: SvgProps) => (
  <Svg width={width} height={height} fill={fill} {...props}>
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M13.333 2.667H2.666c-.736 0-1.333.597-1.333 1.333v8c0 .737.597 1.334 1.333 1.334h10.667c.736 0 1.333-.597 1.333-1.334V4c0-.736-.597-1.333-1.333-1.333"
    />
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m14.666 4.667-5.98 3.8a1.29 1.29 0 0 1-1.373 0l-5.98-3.8"
    />
  </Svg>
)
export default SvgMail
