import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgCameraOff = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G
      stroke="#100F0F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      clipPath="url(#camera-off_svg__a)"
    >
      <Path d="m1.333 1.333 13.333 13.333M4.666 4.667h-2A1.333 1.333 0 0 0 1.333 6v6a1.333 1.333 0 0 0 1.333 1.334h10.667M6.333 2.667h3.333l1.667 2h2A1.333 1.333 0 0 1 14.666 6v5" />
      <Path d="M9.414 10.08a2 2 0 1 1-2.827-2.827" />
    </G>
    <Defs>
      <ClipPath id="camera-off_svg__a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgCameraOff;
