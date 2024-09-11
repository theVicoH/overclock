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
    distance: number;
    speedMax: number;
    speedAverage: number;
    batteryMax: number;
    batteryMin: number;
    time: number;
  }

export interface VehicleWithRaces {
    id: string;
    name: string;
    races: Race[];
  }
export interface Race {
    id: string;
    raceName: string;
    date: string;
    position: number;
}
