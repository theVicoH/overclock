import { useFetch } from "@/hooks/useFetch";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";
import VehicleWithRacesCard from "../components/VehicleWithRacesCard";
import { VehicleWithRaces } from "@/types/vehicle";
import Header from "@/components/Header";

export const Route = createFileRoute("/vehicleWithRaces")({
  validateSearch: (vehicleId: Record<string, unknown>) => ({
    id: (vehicleId?.id as string) || "",
  }),
  component: VehicleWithRacesPage,
});

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
      <div className="grid grid-cols-1 gap-6">
        <Header />
        <h1 className="text-2xl">Détails du Véhicule: {vehicle.name}</h1>
        <div className="vehicle-list">
          <VehicleWithRacesCard key={vehicle.id} vehicle={vehicle} />
        </div>
      </div>
    );
  }

  return <div>Idle state or no data available</div>;
}
