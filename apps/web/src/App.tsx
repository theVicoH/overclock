import { useState } from "react"
import viteLogo from "/vite.svg"

// import { fetchData } from "common/services"
import { Close } from "common/icons/web"
import { useFetchRaces } from "./hooks/useFetchRaces"

export default function App() {
  const [count, setCount] = useState(0)
  const { races, loading, error } = useFetchRaces()

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

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

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
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>
      <ul>
        {races?.map((race) => (
          <li key={race.id}>test race {race.name}</li>
        ))}
      </ul>
    </>
  )
}
