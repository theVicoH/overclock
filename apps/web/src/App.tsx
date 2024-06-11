import { useEffect, useState } from "react"
import viteLogo from "/vite.svg"
import { fetchData } from "common"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData()
        console.log(result)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDataFromAPI()
  }, [])
  return (
    <>
      <div>
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
    </>
  )
}

export default App
