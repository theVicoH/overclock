import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { VehicleClassement } from "@/types/vehicle";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";
import VehicleClassementCard from "../components/vehicleClassementCard";

const VehiclesBySpeed: React.FC = () => {
  const state = useFetch<VehicleClassement[]>("vehicle/sort", HttpMethod.GET);

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error}</div>;
  }

  if (state.status === "success" && state.data) {
    return (
      <div>
        <h1>Véhicules Classés par Vitesse Maximale</h1>
        <div className="vehicle-list">
          {state.data.map((vehicle) => (
            <VehicleClassementCard
              key={vehicle.id}
              id={vehicle.id}
              name={vehicle.name}
              max_speed={vehicle.max_speed}
            />
          ))}
        </div>
      </div>
    );
  }

  return <div>Idle state or no data available</div>;
};

export const Route = createFileRoute("/vehiclesBySpeed")({
  component: VehiclesBySpeed,
});

export default VehiclesBySpeed;
