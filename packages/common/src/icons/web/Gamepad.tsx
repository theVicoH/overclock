import React, { type SVGProps } from "react"
const SvgGamepad: React.FC = ({
  width = 16,
  height = 16,
  fill = "none",
  stroke = "#100F0F",
  strokeWidth = 1.6,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} {...props}>
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M4 8h2.667M5.333 6.667v2.667M10 8.667h.007M12 7.333h.007M13.333 4H2.666c-.736 0-1.333.597-1.333 1.333v5.334c0 .736.597 1.333 1.333 1.333h10.667c.736 0 1.333-.597 1.333-1.333V5.333c0-.736-.597-1.333-1.333-1.333"
    />
  </svg>
)
export default SvgGamepad
