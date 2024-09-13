import { createFileRoute } from "@tanstack/react-router"

import { useFetch } from "../hooks/useFetch"
import { Races } from "@/types/race"
import { HttpMethod } from "common/services"
import RaceCard from "@/components/RaceCard"
import Header from "@/components/Header"

export const Route = createFileRoute("/")({
  component: Index
})

export default function Index() {
  const state = useFetch<Races[]>("race", HttpMethod.GET)

  if (state.status === "loading") return <div>Loading...</div>
  if (state.status === "error") return <div>{state.error}</div>

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <Header />
        <p className="text-2xl">Tableau de bord</p>
        <div className="grid grid-cols-4 gap-6">
          {state.status === "success" && state.data?.map((race) => (
            <RaceCard
              id={race.id}
              name={race.name}
              date={race.date}
              vehicle_name={race.vehicle_name}
              is_finish={race.is_finish}
              time={race.time}
              speed_average={race.speed_average}
              distance={race.distance}
            />
          ))}
        </div>
      </div>
    </>
  )
}
