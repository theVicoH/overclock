import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgChevronRight = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#chevron-right_svg__a)">
      <Path
        stroke="#100F0F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="m6 12 4-4-4-4"
      />
    </G>
    <Defs>
      <ClipPath id="chevron-right_svg__a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgChevronRight;
