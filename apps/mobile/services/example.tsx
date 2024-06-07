export async function getPosts() {
  try {
    const response = await fetch(`${process.env.API_URL}`)
    return response.json()
  } catch (error) {
    return error
  }
}
