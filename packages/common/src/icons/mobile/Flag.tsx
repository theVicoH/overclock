import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgFlag = ({ width = 16, height = 16, fill = "none", stroke = "#000", strokeWidth = 1.6, ...props }: SvgProps) => (
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
      d="M2.376 9.855s.826-.407 2.705.183 2.73 2.191 4.61 2.781c1.878.59 2.705.183 2.705.183L14.8 5.75s-.826.407-2.705-.183-2.73-2.191-4.61-2.781c-1.878-.59-2.704-.183-2.704-.183zM1 14l1.393-4.2"
    />
  </Svg>
);
export default SvgFlag;
