import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { VehicleStats } from "@/types/vehicle";
import { createFileRoute } from "@tanstack/react-router";
import { HttpMethod } from "common/services";
import VehicleStatsCard from "../components/VehicleStatsCard";

const VehiclesWithStats: React.FC = () => {
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
        <div className="vehicle-list">
          {state.data.map((vehicle: VehicleStats) => (
            <VehicleStatsCard
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

export const Route = createFileRoute("/vehiclesWithStats")({
  component: VehiclesWithStats,
});

export default VehiclesWithStats;
