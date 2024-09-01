import { SensorData } from "./sensor"
import { StatsRaceData } from "./statsRace"

export interface Races {
  id: string
  vehicle_id: string
  name: string
  date: string
  time?: number
  speed_average?: number
  distance?: number
  vehicle_name: string
  is_finish: boolean
}

export interface Race {
  id: string
  name: string
  date: string
  vehicle_name: string
}

export interface RaceDetails {
  race_data: Race
  stats: StatsRaceData
  sensor: SensorData
}
