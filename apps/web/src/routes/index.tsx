import { createFileRoute } from "@tanstack/react-router"

// import { fetchData } from "common/services"
import { useFetch } from "../hooks/useFetch"
import { Races } from "@/types/race"
import { HttpMethod } from "common/services"
import RaceCard from "@/components/RaceCard"
import Header from "@/components/Header"
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({
  component: Index
})

export default function Index() {
  const state = useFetch<Races[]>("race", HttpMethod.GET)

  // useEffect(() => {
  //   const fetchDataFromAPI = async () => {
  //     try {
  //       const result = await fetchData()
  //       console.log(result)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   fetchDataFromAPI()
  // }, [])

  if (state.status === "loading") return <div>Loading...</div>
  if (state.status === "error") return <div>{state.error}</div>

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <Header />
        <p className="text-2xl">Tableau de bord</p>
        <Link to="/vehicle">
          <Button variant="outline">Voir les véhicules</Button>
        </Link>
        <Link to="/vehiclesBySpeed">
          <Button variant="outline">Voir le classement des véhicules par vitesse</Button>
        </Link>
        <Link to="/vehiclesWithStats">
          <Button variant="outline">Voir les vehicules avec les meilleurs Statistiques</Button>
        </Link>
        <Link to="/vehiclesWithRaces">
          <Button variant="outline">Voir les véhicule avec Courses</Button>
        </Link>
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
