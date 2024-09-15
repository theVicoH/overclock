import { useFetch } from "@/hooks/useFetch";
import { Vehicle } from "@/types/vehicle";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";
import VehicleCard from "../components/VehicleCard"; // Import du composant VehicleCard
import Header from "@/components/Header";

function Vehicles() {
  const state = useFetch<Vehicle[]>("vehicle", HttpMethod.GET);

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error}</div>;
  }

  if (state.status === "success" && state.data) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Header />
        <h1 className="text-2xl">Liste des Véhicules</h1>
        <div className="grid grid-cols-4 gap-6">
          {state.data.map((vehicle: Vehicle) => (
            <VehicleCard
              key={vehicle.id}
              id={vehicle.id}
              name={vehicle.name}
            />
          ))}
        </div>
      </div>
    );
  }

  return <div>Idle state or no data available</div>;
}

export const Route = createFileRoute("/vehicle")({
  component: Vehicles,
});

export default Vehicles;
