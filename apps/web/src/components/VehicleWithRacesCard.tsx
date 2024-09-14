import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VehicleWithRaces, Race } from "@/types/vehicle";

const RaceCard: React.FC<{ race: Race }> = ({ race }) => (
  <div className="p-4 border border-gray-300 rounded mb-2">
    <h3 className="text-lg font-semibold">{race.name}</h3>
    <p>Date: {new Date(race.date).toLocaleDateString()}</p>
    <p>Distance: {race.distance} km</p>
    <p>Speed Average: {race.speed_average} km/h</p>
    <p>Time: {race.time} ms</p>
  </div>
);

interface VehicleDetailsCardProps {
  vehicle: VehicleWithRaces;
}

const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ vehicle }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-primary">{vehicle.name}</CardTitle>
      <CardDescription>
        <p>ID: {vehicle.id}</p>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <h2 className="text-xl font-semibold">Courses</h2>
      {vehicle.races.map((race) => (
        <RaceCard key={race.id} race={race} /> 
      ))}
    </CardContent>
  </Card>
);

export default VehicleDetailsCard;
