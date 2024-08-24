import { useState, useEffect } from 'react'
import { http, HttpMethod } from 'common/services'
import { Race } from '../types/race'

export function useFetchRaces() {
  const [races, setRaces] = useState<Race[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function fetchRaces() {
      try {
        const response = await http<Race[]>('race', HttpMethod.GET, { signal })
        setRaces(response.data || undefined)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to retrieve races')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRaces()

    return () => {
      controller.abort()
    }
  }, [])

  return { races, loading, error }
}
