import * as React from "react"
import type { SVGProps } from "react"
const SvgFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M2.376 9.855s.826-.407 2.705.183 2.73 2.191 4.61 2.781c1.878.59 2.705.183 2.705.183L14.8 5.75s-.826.407-2.705-.183-2.73-2.191-4.61-2.781c-1.878-.59-2.704-.183-2.704-.183zM1 14l1.393-4.2"
    />
  </svg>
)
export default SvgFlag
