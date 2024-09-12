import { Link } from "@tanstack/react-router";
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
              <button className="btn btn-primary">Voir les Statistiques</button>
            </Link>
            <Link to="/vehicleWithRaces" search={{ id }}>
              <button className="btn btn-secondary">Voir les Courses</button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }
