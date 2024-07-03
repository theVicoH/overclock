import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgHome = (props: SvgProps) => (
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
      clipPath="url(#home_svg__a)"
    >
      <Path d="M2.944 8H1.5L8 1.5 14.5 8h-1.444M2.945 8v5.056A1.444 1.444 0 0 0 4.389 14.5h7.222a1.444 1.444 0 0 0 1.445-1.444V8" />
      <Path d="M5.834 14.5v-4.333a1.444 1.444 0 0 1 1.444-1.445h1.444a1.444 1.444 0 0 1 1.445 1.445V14.5" />
    </G>
    <Defs>
      <ClipPath id="home_svg__a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgHome;
