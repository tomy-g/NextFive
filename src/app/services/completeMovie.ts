export async function getCompleteMovie (id: string) {
  try {
    const response = await fetch('/api/movie?i=' + id)
    const json = await response.json()
    if (json.Response === 'False') throw new Error(json.Error)
    return json
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
