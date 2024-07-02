import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgMegaphone = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <G clipPath="url(#megaphone_svg__a)">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M7.243 10.561c2.801-.926 7.453-1.23 7.453-1.23l-5-8.661S7.24 4.736 5.1 6.849c-1.387 1.37-3.88 3.14-3.88 3.14l1.5 2.599s.75-.397 1.73-.86m2.793-1.167c-.866.287-1.92.753-2.794 1.167m2.794-1.167 1.33 2.304-2.6 1.502-1.524-2.64"
      />
    </G>
    <Defs>
      <ClipPath id="megaphone_svg__a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgMegaphone
