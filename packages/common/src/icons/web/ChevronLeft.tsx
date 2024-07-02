import * as React from "react"
import type { SVGProps } from "react"
const SvgChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 4 6 8l4 4" />
  </svg>
)
export default SvgChevronLeft
