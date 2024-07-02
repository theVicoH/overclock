import * as React from "react"
import type { SVGProps } from "react"
const SvgCameraOff = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} clipPath="url(#camera-off_svg__a)">
      <path d="m1.333 1.333 13.333 13.333M4.666 4.667h-2A1.333 1.333 0 0 0 1.333 6v6a1.333 1.333 0 0 0 1.333 1.334h10.667M6.333 2.667h3.333l1.667 2h2A1.333 1.333 0 0 1 14.666 6v5" />
      <path d="M9.414 10.08a2 2 0 1 1-2.827-2.827" />
    </g>
    <defs>
      <clipPath id="camera-off_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgCameraOff
