const BASE_URL = process.env.BACKEND_URL || "http://localhost:3000"

interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
  code?: number
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export async function http<T>(
  endpoint: string,
  method: HttpMethod,
  data?: object,
  signal?: AbortSignal
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}/${endpoint}`
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
    signal,
  }

  try {
    const response = await fetch(url, options)

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`)
    // }

    const responseData: ApiResponse<T> = await response.json()
    return responseData
  } catch (error: any) {
    throw error
  }
}
