import { Link } from "@tanstack/react-router"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface RaceCardProps {
  id: string,
  name: string,
  vehicle_name: string,
  date: string,
  distance: number | undefined,
  speed_average: number | undefined,
  time: number | undefined,
  is_finish: boolean
}

const RaceCard:React.FC<RaceCardProps> = ({ id, name, vehicle_name, date, distance, speed_average, time, is_finish }) => {
  return <Link key={id} to="/race" search={{ id: id }}>
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">{name}</CardTitle>
        <CardDescription>
          <p>Vehicle: {vehicle_name}</p>
          <p>Date: {new Date(date).toLocaleDateString()}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Distance Total: {distance || "-"} km</p>
        <p>Vitesse moyenne: {speed_average || "-"} km/h</p>
        <p>Temps Total: {time || "-"} ms</p>
        {!is_finish && (
          <div className="mt-4 text-red-600">
            <p>Course en cour</p>
          </div>
        )}
      </CardContent>
    </Card>
  </Link>
}

export default RaceCard
