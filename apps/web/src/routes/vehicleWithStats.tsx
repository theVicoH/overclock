import { useFetch } from "@/hooks/useFetch";
import { VehicleStats } from "@/types/vehicle";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";
import VehicleStatsCard from "../components/VehicleStatsCard";
import Header from "@/components/Header";

// Création de la route
export const Route = createFileRoute("/vehicleWithStats")({
  validateSearch: (race: Record<string, unknown>) => ({
    id: (race?.id as string) || "",
  }),
  component: VehicleWithStats,
});

export default function VehicleWithStats() {
  const { id } = Route.useSearch();
  const state = useFetch<VehicleStats[]>(`vehicle/stats/${id}`, HttpMethod.GET);

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
        <h1 className="text-2xl">Meilleurs Statistiques par véhicule</h1>
        <div className="vehicle-list">
          {state.data.map((vehicle: VehicleStats) => (
            <VehicleStatsCard
              key={vehicle.id}
              id={vehicle.id}
              name={vehicle.name}
              max_speed={vehicle.max_speed}
              max_distance={vehicle.max_distance}
              min_time={vehicle.min_time}
            />
          ))}
        </div>
      </div>
    );
  }

  return <div>Idle state or no data available</div>;
};
