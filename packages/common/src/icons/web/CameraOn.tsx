import * as React from "react"
import type { SVGProps } from "react"
const SvgCameraOn = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      stroke="#100F0F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M9.666 2.667H6.333l-1.667 2h-2A1.333 1.333 0 0 0 1.333 6v6a1.333 1.333 0 0 0 1.333 1.334h10.667A1.333 1.333 0 0 0 14.666 12V6a1.333 1.333 0 0 0-1.333-1.333h-2z"
    />
    <path stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 10.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
  </svg>
)
export default SvgCameraOn
