import { createFileRoute } from '@tanstack/react-router'

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
  return (
    <div>{id}</div>
  )
}
