import * as React from "react";
import type { SVGProps } from "react";
const SvgPower = (props: SVGProps<SVGSVGElement>) => (
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
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12.24 4.427a6 6 0 1 1-8.487 0M8 1.334V8"
    />
  </svg>
);
export default SvgPower;
