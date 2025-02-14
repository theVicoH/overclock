
import type { SVGProps } from "react"
const SvgSettings = ({
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
      d="M8.147 1.333h-.294A1.333 1.333 0 0 0 6.52 2.666v.12a1.33 1.33 0 0 1-.667 1.154l-.286.166a1.33 1.33 0 0 1-1.334 0l-.1-.053a1.333 1.333 0 0 0-1.82.487l-.146.253a1.333 1.333 0 0 0 .486 1.82l.1.067a1.33 1.33 0 0 1 .667 1.146v.34a1.33 1.33 0 0 1-.667 1.16l-.1.06a1.333 1.333 0 0 0-.486 1.82l.146.254a1.334 1.334 0 0 0 1.82.486l.1-.053a1.33 1.33 0 0 1 1.334 0l.286.167a1.33 1.33 0 0 1 .667 1.153v.12a1.333 1.333 0 0 0 1.333 1.333h.294a1.333 1.333 0 0 0 1.333-1.333v-.12a1.33 1.33 0 0 1 .667-1.153l.286-.167a1.33 1.33 0 0 1 1.334 0l.1.053a1.333 1.333 0 0 0 1.82-.486l.146-.26a1.334 1.334 0 0 0-.486-1.82l-.1-.054a1.33 1.33 0 0 1-.667-1.16v-.333a1.33 1.33 0 0 1 .667-1.16l.1-.06a1.334 1.334 0 0 0 .486-1.82l-.146-.253a1.333 1.333 0 0 0-1.82-.487l-.1.053a1.33 1.33 0 0 1-1.334 0l-.286-.166a1.33 1.33 0 0 1-.667-1.154v-.12a1.333 1.333 0 0 0-1.333-1.333"
    />
    <path stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
  </svg>
)
export default SvgSettings
