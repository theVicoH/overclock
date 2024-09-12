import { useReducer, useEffect } from "react"
import { http, HttpMethod } from "common/services"

function fetchReducer<T>(state: FetchState<T>, event: FetchEvent<T>): FetchState<T> {
  switch (event.type) {
    case "FETCH":
      return { status: "loading" }
    case "RESOLVE":
      return { status: "success", data: event.data }
    case "REJECT":
      return { status: "error", error: event.error }
    default:
      return state
  }
}

export function useFetch<T>(endpoint: string, method: HttpMethod) {
  const [state, dispatch] = useReducer(fetchReducer<T>, { status: "idle" })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      dispatch({ type: "FETCH" })

      try {
        const response = await http<T>(endpoint, method, { signal })
        dispatch({ type: "RESOLVE", data: response.data })
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          dispatch({ type: "REJECT", error: err.message || "Failed to retrieve data" })
        } else {
          dispatch({ type: "REJECT", error: "Unknown error occurred" })
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [endpoint, method])

  return state
}
