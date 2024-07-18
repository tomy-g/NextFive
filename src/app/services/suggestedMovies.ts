import { type Movie } from '../schemas/movie'

export async function getSuggestedMovies (search: string, selectedMovies: Movie[]) {
  if (search === '') return null
  try {
    const response = await fetch('/api/search?s=' + search)
    const json = await response.json()
    if (json.Response === 'False') throw new Error(json.Error)
    const movies: Movie[] = json.Search.filter((movie: Movie) => movie.Type === 'movie' || movie.Type === 'series')
    const moviesNotRepeated = movies.filter((movie: Movie) => !selectedMovies.some(selectedMovie => selectedMovie.imdbID === movie.imdbID))
    return moviesNotRepeated
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
