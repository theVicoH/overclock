import { useFetch } from "@/hooks/useFetch";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";
import VehicleDetailsCard from "../components/VehicleDetailsCard";
import { VehicleWithRaces } from "@/types/vehicle";

// Define the route
export const Route = createFileRoute("/vehicleWithRaces")({
  validateSearch: (vehicleId: Record<string, unknown>) => ({
    id: (vehicleId?.id as string) || "",
  }),
  component: VehicleWithRacesPage,
});

// Main component
export default function VehicleWithRacesPage() {
  const { id } = Route.useSearch();
  const state = useFetch<VehicleWithRaces>(`vehicle/details/${id}`, HttpMethod.GET);

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error}</div>;
  }

  if (state.status === "success" && state.data) {
    const vehicle = state.data;
    return (
      <div>
        <h1>Détails du Véhicule: {vehicle.name}</h1>
        <div className="vehicle-list">
          {/* Pass the entire vehicle object to VehicleDetailsCard */}
          <VehicleDetailsCard key={vehicle.id} vehicle={vehicle} />
        </div>
      </div>
    );
  }

  return <div>Idle state or no data available</div>;
}
