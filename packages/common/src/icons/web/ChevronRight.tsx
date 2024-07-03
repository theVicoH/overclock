import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronRight = ({ width = 16, height = 16, fill = "none", stroke = "#100F0F", strokeWidth = 1.8, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    {...props}
  >
    <g clipPath="url(#chevron-right_svg__a)">
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m6 12 4-4-4-4"
      />
    </g>
    <defs>
      <clipPath id="chevron-right_svg__a">
        <path fill={fill} d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgChevronRight;
