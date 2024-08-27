import viteLogo from "/vite.svg"
import { createFileRoute, Link } from "@tanstack/react-router"

// import { fetchData } from "common/services"
import { Close } from "common/icons/web"
import { useFetch } from "../hooks/useFetch"
import { Races } from "@/types/race"
import { HttpMethod } from "common/services"

export const Route = createFileRoute("/")({
  component: Index
})

export default function Index() {
  const state = useFetch<Races[]>('race', HttpMethod.GET)

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

  if (state.status === 'loading') return <div>Loading...</div>
  if (state.status === 'error') return <div>{state.error}</div>

  return (
    <>
      <div>
        <Close />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1 className="font-notoSans font-thin text-lg bg-red-200">This is NotoSans Bold text.</h1>
      <h1 className="font-dsDigital text-lg">This is DS-Digital text.</h1>
      <div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
      <div>
        <div className="flex flex-col gap-4">
          {state.status === 'success' && state.data?.map((race) => (
            <Link key={race.id} to="/race" search={{ id: race.id }}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{race.name}</h2>
                  <p className="text-gray-600">Vehicle: {race.vehicle_name}</p>
                  <p className="text-gray-600">Date: {new Date(race.date).toLocaleDateString()}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-800">Distance Total: {race.distance || "-"} km</p>
                  <p className="text-gray-800">Vitesse moyenne: {race.speed_average || "-"} km/h</p>
                  <p className="text-gray-800">Temps Total: {race.time || "-"} ms</p>
                </div>

                {!race.is_finish && (
                  <div className="mt-4 text-red-600 font-bold">
                    <p>Course En Court</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
