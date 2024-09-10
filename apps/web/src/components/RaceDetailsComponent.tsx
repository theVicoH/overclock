interface RaceDetailsComponentProps {
  name: string
  vehicleName: string
  date: string
}

export default function RaceDetailsComponent({ name, vehicleName, date }: RaceDetailsComponentProps) {
  return (
    <div className="bg-card text-card-foreground shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-primary">{name}</h2>
      <p className="mt-2">Vehicle: {vehicleName}</p>
      <p className="mt-1">Date: {new Date(date).toLocaleString()}</p>
    </div>
  )
}
