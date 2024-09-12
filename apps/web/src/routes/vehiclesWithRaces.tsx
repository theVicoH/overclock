import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { VehicleWithRaces } from "@/types/vehicle";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";
import VehicleDetailsCard from "../components/VehicleDetailsCard";

const VehiclesWithRaces: React.FC = () => {
  const state = useFetch<VehicleWithRaces[]>("vehicle/details", HttpMethod.GET);

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error}</div>;
  }

  if (state.status === "success" && state.data) {
    return (
      <div>
        <h1>Détails des Véhicules avec Courses</h1>
        <div className="vehicle-list">
          {state.data.map((vehicle) => (
            <VehicleDetailsCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    );
  }

  return <div>Idle state or no data available</div>;
};

export const Route = createFileRoute("/vehiclesWithRaces")({
  component: VehiclesWithRaces,
});

export default VehiclesWithRaces;
