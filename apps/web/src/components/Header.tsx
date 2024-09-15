import { LogoOverclock } from "common/icons/web"
import { colors } from "common/styles/colors"
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button"

export default function Header() {
  const location = useLocation()
  return <div className="sticky top-0 w-full bg-card px-[18px] py-2 rounded-lg border flex justify-between items-center">
    <LogoOverclock stroke={colors.neutral0} />
    <div className="gap-4">
      <Link to="/">
        <Button variant="link" className={`${location.pathname === "/" && "font-bold"}`}>Courses</Button>
      </Link>
      <Link to="/vehicle">
        <Button variant="link" className={`${location.pathname === "/vehicle" && "font-bold"}`}>Véhicules</Button>
      </Link>
      <Link to="/vehiclesBySpeed">
        <Button variant="link" className={`${location.pathname === "/vehiclesBySpeed" && "font-bold"}`}>Classement</Button>
      </Link>
      <Link to="/vehiclesWithStats">
        <Button variant="link" className={`${location.pathname === "/vehiclesWithStats" && "font-bold"}`}>Statistiques</Button>
      </Link>
      <Link to="/vehiclesWithRaces">
        <Button variant="link" className={`${location.pathname === "/vehiclesWithRaces" && "font-bold"}`}>Véhicules avec Courses</Button>
      </Link>
    </div>
  </div>
}
