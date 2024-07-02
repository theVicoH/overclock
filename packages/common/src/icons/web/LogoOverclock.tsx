import * as React from "react";
import type { SVGProps } from "react";
const SvgLogoOverclock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#100F0F"
      strokeWidth={1.8}
      d="M3.816 11.337V5.19a2.6 2.6 0 0 1 2.6-2.6h7.168a2.6 2.6 0 0 1 2.6 2.6v9.62a2.6 2.6 0 0 1-2.6 2.6h-3.573s-.87-2.262-2.5-3.892-3.695-2.18-3.695-2.18Z"
    />
    <path
      fill="#100F0F"
      stroke="#100F0F"
      strokeWidth={1.8}
      d="M7.252 7.818a.78.78 0 0 1 .559-.2c.234 0 .364.064.447.128q.04.03.08.072zM11.821 7.798a.8.8 0 0 1 .54-.18c.237 0 .368.064.452.128q.03.023.06.052z"
    />
  </svg>
);
export default SvgLogoOverclock;
