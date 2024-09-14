import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface VehicleCardProps {
  id: string;
  name: string;
}

export default function VehicleCard({ id, name }: VehicleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">{name}</CardTitle>
        <CardDescription>
          <p>ID du Véhicule: {id}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Nom du véhicule: {name}</p>
        <div className="flex space-x-4 mt-4">
          <Link to="/vehicleWithStats" search={{ id }}>
            <Button variant="outline">Voir les Statistiques</Button>
          </Link>
          <Link to="/vehicleWithRaces" search={{ id }}>
            <Button variant="outline">Voir les Courses</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
