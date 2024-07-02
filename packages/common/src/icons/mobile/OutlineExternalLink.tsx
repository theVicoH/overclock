import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgOutlineExternalLink = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="#100F0F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M6.667 4H4a1.333 1.333 0 0 0-1.333 1.334V12A1.333 1.333 0 0 0 4 13.334h6.667A1.333 1.333 0 0 0 12 12V9.334M9.334 2.667h4m0 0v4m0-4L6.667 9.334"
    />
  </Svg>
);
export default SvgOutlineExternalLink;
