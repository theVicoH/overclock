const BASE_URL = "https://api.clementpnn.com"

interface ApiResponse<T> {
  data?: T
  message?: string
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
    signal,
  }

  if (method !== "GET" && data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, options)
    const responseData: ApiResponse<T> = await response.json()
    return responseData
  } catch (error) {
    throw error
  }
}
