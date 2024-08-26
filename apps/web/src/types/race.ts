export interface Race {
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