import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g clipPath="url(#chevron-right_svg__a)">
      <path
        stroke="#100F0F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="m6 12 4-4-4-4"
      />
    </g>
    <defs>
      <clipPath id="chevron-right_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgChevronRight;
