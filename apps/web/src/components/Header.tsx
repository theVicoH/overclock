import { LogoOverclock } from "common/icons/web"
import { colors } from "common/styles/colors"

const Header = () => {
  return <div className="bg-card px-[18px] py-2 rounded-lg border">
    <LogoOverclock stroke={colors.neutral0} />
  </div>
}

export default Header
