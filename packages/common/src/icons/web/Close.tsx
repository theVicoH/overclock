import * as React from "react";
import type { SVGProps } from "react";
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#100F0F"
      strokeLinecap="round"
      strokeWidth={1.6}
      d="m3 3 10 10M3 13 13 3"
    />
  </svg>
);
export default SvgClose;
