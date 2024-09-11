import { useFetch } from "@/hooks/useFetch";
import { VehicleStats } from "@/types/vehicle";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";

function VehiclesWithStats() {
  const state = useFetch<VehicleStats[]>("vehicle/stats", HttpMethod.GET);

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error}</div>;
  }

  if (state.status === "success" && state.data) {
    return (
      <div>
        <h1>Liste des Véhicules avec Statistiques</h1>
        {state.data.map((vehicle: VehicleStats) => (
          <div key={vehicle.id}>
            <h2>{vehicle.id}</h2>
            <p>Distance: {vehicle.distance}</p>
            <p>Max Speed: {vehicle.speedMax}</p>
            <p>Average Speed: {vehicle.speedAverage}</p>
            <p>Max Battery: {vehicle.batteryMax}</p>
            <p>Min Battery: {vehicle.batteryMin}</p>
            <p>Time: {vehicle.time}</p>
          </div>
        ))}
      </div>
    );
  }

  return <div>Idle state or no data available</div>;
}

export const Route = createFileRoute("/vehiclesWithStats")({
  component: VehiclesWithStats,
});

export default VehiclesWithStats;
