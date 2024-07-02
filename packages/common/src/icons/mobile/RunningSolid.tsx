import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SvgRunningSolid = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#100F0F"
      fillRule="evenodd"
      d="M10 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M3.895 6.336l.547.436.005-.006.017-.021a14 14 0 0 1 .318-.381c.211-.247.496-.568.797-.874.306-.313.605-.584.845-.75q.07-.048.119-.076l.875.55c-.148.19-.317.41-.49.636-.247.325-.502.67-.707.96a9 9 0 0 0-.27.404c-.061.1-.15.248-.195.39-.111.34-.018.652.077.858.098.212.244.409.39.58.292.342.693.7 1.063 1.02l.32.274c.263.225.5.428.695.612q.134.129.212.214a5 5 0 0 1-.203.386c-.194.34-.46.75-.732 1.153a46 46 0 0 1-.995 1.409l-.068.093-.018.024-.005.006v.001l.56.418.562.418.002-.002.005-.007.02-.026.071-.097a51 51 0 0 0 1.026-1.453c.28-.413.567-.857.787-1.242.11-.19.21-.38.284-.55.062-.14.154-.37.154-.605a1 1 0 0 0-.105-.432 1.6 1.6 0 0 0-.173-.273 4 4 0 0 0-.422-.452c-.223-.21-.502-.45-.775-.683L8.2 9.003c-.373-.322-.699-.619-.914-.871a2 2 0 0 1-.142-.185q.083-.133.223-.333a31 31 0 0 1 .675-.917c.203-.267.403-.525.568-.736l.52.326.04.05q.068.087.164.22l.132.183c.096.134.203.284.307.423.156.21.335.436.513.617.089.09.196.186.316.265.107.07.304.179.555.179H14v-1.4h-2.688l-.03-.029a5 5 0 0 1-.386-.47q-.143-.193-.278-.383l-.15-.207a4 4 0 0 0-.41-.503l-.05-.047-.057-.036-.92-.577-.166-.104-.033-.021-.008-.005h-.001l-.001-.001-.372.593.372-.593-.372.593.372-.593-.003-.002-.01-.006-.035-.022-.13-.082-.442-.277-1.093-.685c-.33-.207-.677-.152-.885-.087a2.3 2.3 0 0 0-.595.308c-.352.242-.725.59-1.05.92a19 19 0 0 0-1.204 1.357l-.02.025-.005.006-.002.002V5.9zm2.753-1.721h-.003zm.448 3.242.002.004zm-.675 2.34-.48-.51-.005.005-.025.023-.1.087c-.088.074-.21.172-.346.269-.139.098-.28.184-.408.245q-.095.044-.156.06c-.039.011-.057.012-.059.012H2v1.4h2.842c.307 0 .594-.104.811-.206.228-.107.442-.242.619-.367a7 7 0 0 0 .612-.493l.011-.01.004-.003v-.001H6.9z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgRunningSolid
