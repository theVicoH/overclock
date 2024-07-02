import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDatabase = (props: SvgProps) => (
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
      d="M8 5.334c3.314 0 6-.896 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2"
    />
    <Path
      stroke="#100F0F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M2 3.334v9.333c0 .53.632 1.039 1.757 1.414s2.652.586 4.243.586 3.117-.21 4.243-.586c1.125-.375 1.757-.884 1.757-1.414V3.334"
    />
    <Path
      stroke="#100F0F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M2 8c0 .53.632 1.04 1.757 1.414C4.883 9.79 6.41 10 8 10s3.117-.21 4.243-.586C13.368 9.04 14 8.53 14 8"
    />
  </Svg>
);
export default SvgDatabase;
