import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VehicleStats } from "@/types/vehicle";

interface VehicleStatsCardProps extends VehicleStats {
  id: string;
  name: string;
  max_speed: number;
  max_distance: number;
  min_time: number;
}

export default function VehicleStatsCard({
  id,
  name,
  max_speed,
  max_distance,
  min_time,
}: VehicleStatsCardProps) {
  return (
    <Link key={id} to="/vehicle" search={{ id: id }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">{name}</CardTitle>
          <CardDescription>
            <p>ID du Véhicule: {id}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Vitesse Max: {max_speed} km/h</p>
          <p>Distance Max: {max_distance} km</p>
          <p>Temps Minimum: {min_time} s</p>
        </CardContent>
      </Card>
    </Link>
  );
}
