import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPower = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.8, ...props }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill={fill}
    {...props}
  >
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M12.24 4.427a6 6 0 1 1-8.487 0M8 1.334V8"
    />
  </Svg>
);
export default SvgPower;
