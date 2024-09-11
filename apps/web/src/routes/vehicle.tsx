import { useFetch } from "@/hooks/useFetch";
import { Vehicle } from "@/types/vehicle";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";

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
      <div>
        <h1>Liste des Véhicules</h1>
        {state.data.map((vehicle: Vehicle) => (
          <div key={vehicle.id}>{vehicle.name}</div>
        ))}
      </div>
    );
  }

  return <div>Idle state or no data available</div>;
}

export const Route = createFileRoute("/vehicle")({
  component: Vehicles,
});

export default Vehicles;
