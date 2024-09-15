import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { VehicleWithRaces } from "@/types/vehicle";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";
import VehicleWithRacesCard from "../components/VehicleWithRacesCard";
import Header from "@/components/Header";

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
      <div className="grid grid-cols-1 gap-6">
        <Header />
        <h1 className="text-2xl">Détails des Véhicules avec Courses</h1>
        <div className="grid grid-cols-4 gap-6">
          {state.data.map((vehicle) => (
            <VehicleWithRacesCard key={vehicle.id} vehicle={vehicle} />
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
