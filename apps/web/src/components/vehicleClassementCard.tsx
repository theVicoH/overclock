import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VehicleClassement } from "@/types/vehicle";

interface VehicleClassementCardProps extends VehicleClassement {}

const VehicleClassementCard: React.FC<VehicleClassementCardProps> = ({ id, name, max_speed }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-primary">{name}</CardTitle>
      <CardDescription>
        <p>ID: {id}</p>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>Max Speed: {max_speed} km/h</p>
    </CardContent>
  </Card>
);

export default VehicleClassementCard;
