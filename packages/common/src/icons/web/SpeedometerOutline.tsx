import * as React from "react"
import { type SVGProps } from "react"

const SvgSpeedometerOutline: React.FC = ({
  width = 16,
  height = 16,
  fill = "none",
  stroke = "#100F0F",
  strokeWidth = 1.6,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <path
      fill={fill}
      d="m10.19 7.247-1.484 2.36a1 1 0 0 1-.218.218.941.941 0 0 1-1.094-1.531l2.36-1.485a.32.32 0 0 1 .365 0 .314.314 0 0 1 .072.438"
    />
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M8 2a6.998 6.998 0 0 0-5.24 11.638q.05.057.1.109a.787.787 0 0 0 1.159-.003 5.41 5.41 0 0 1 7.962 0 .786.786 0 0 0 1.16.003l.1-.11A6.998 6.998 0 0 0 8 2"
    />
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
      d="M8 4v1m5 4h-1M4 9H3m2.172-2.828-.708-.708m6.364.708.708-.708"
    />
  </svg>
)
export default SvgSpeedometerOutline
