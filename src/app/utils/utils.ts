import { type Movie } from '../schemas/movie'

/**
 * Counts the number of recommended movies.
 * @param movies - An array of movie objects.
 * @returns The count of recommended movies.
 */
export function countFilledMovies (movies: Movie[]): number {
  return movies.filter(movie => movie.imdbID.length > 1).length
}
