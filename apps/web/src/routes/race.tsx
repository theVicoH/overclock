import { useFetch } from '@/hooks/useFetch'
import { RaceDetails } from '@/types/race'
import { createFileRoute } from '@tanstack/react-router'
import { HttpMethod } from 'common/services'

export const Route = createFileRoute('/race')({
  validateSearch: (race: Record<string, unknown>) => {
    return {
      id: (race?.id as string) || ""
    }
  },
  component: Race
})

export default function Race() {
  const { id } = Route.useSearch()
  const state = useFetch<RaceDetails>(`race/${id}`, HttpMethod.GET)

  function handleDelete() {
    if (confirm('Are you sure you want to delete this course?')) {
      useFetch(`race/${id}`, HttpMethod.DELETE)
    }
  }

  if (state.status === 'loading') return <div>Loading...</div>
  if (state.status === 'error') return <div>{state.error}</div>
  if (state.status === 'success') {
    console.log(state.data)

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Race Details</h1>
        <div className="flex justify-between items-center mb-4">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6 mb-4">
          <h2 className="text-xl font-semibold">{state.data?.race_data.name}</h2>
          <p>Vehicle: {state.data?.race_data.vehicle_name}</p>
          <p>Date: {new Date(state.data?.race_data.date ?? "").toLocaleString()}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold">Stats</h3>
          <p>Distance: {state.data?.stats.Distance} km</p>
          <p>Max Speed: {state.data?.stats.SpeedMax} km/h</p>
          <p>Average Speed: {state.data?.stats.SpeedAverage} km/h</p>
          <p>Battery Max: {state.data?.stats.BatteryMax}%</p>
          <p>Battery Min: {state.data?.stats.BatteryMin}%</p>
          <p>Time: {state.data?.stats.Time} ms</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Sensor Data</h3>
          <div>
            <h4 className="font-semibold">Distance:</h4>
            <ul>
              {state.data?.sensor.distance.map((d, i) => (
                <li key={i}>{d} km</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Speed:</h4>
            <ul>
              {state.data?.sensor.speed.map((s, i) => (
                <li key={i}>{s} km/h</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Battery:</h4>
            <ul>
              {state.data?.sensor.battery.map((b, i) => (
                <li key={i}>{b}%</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Track:</h4>
            <ul>
              {state.data?.sensor.track.map((t, i) => (
                <li key={i}>Track {t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Dates:</h4>
            <ul>
              {state.data?.sensor.date.map((date, i) => (
                <li key={i}>{new Date(date).toLocaleString()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
