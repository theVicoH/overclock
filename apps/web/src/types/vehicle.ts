export interface Vehicle {
    id: string;
    name: string;
  }
export interface VehicleDetails {
    id: string;
    name: string;
    speed_max: number;
    speed_average: number;
    battery_max: number;
    battery_min: number;
    races_count: number;
  }
export interface VehicleStats {
    id: string;
    name: string;
    max_speed: number;
    max_distance: number;
    min_time: number;
  }

export interface VehicleWithRaces {
    id: string;
    name: string;
    races: Race[];
  }
  export interface Race {
    id: string;
    name: string;
    date: string;
    time: number;
    speed_average: number;
    distance: number;
  }
export interface VehicleClassement {
  id: string;
  name: string;
  max_speed: number;
}

