import { type Movie } from '../schemas/movie'

export async function getSuggesteMovies (search: string) {
  if (search === '') return null
  try {
    const response = await fetch('/api/search?s=' + search)
    const json = await response.json()
    if (json.Response === 'False') throw new Error(json.Error)
    const movies: Movie[] = json.Search.filter((movie: Movie) => movie.Type === 'movie' || movie.Type === 'series')
    return movies
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
