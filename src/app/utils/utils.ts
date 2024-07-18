import { type Movie } from '../schemas/movie'
import { PROMPT } from '@/app/constants/prompt'

export function countFilledMovies (movies: Movie[]): number {
  return movies.filter(movie => movie.imdbID.length > 1).length
}

export function getFilledMovies (movies: Movie[]): Movie[] {
  return movies.filter(movie => movie.imdbID.length > 1)
}

export function isFilled (movie: Movie) {
  return movie.imdbID.length > 1
}

export function simplifyMovies (movies: Movie[]): Movie[] {
  const parametersToDelete = ['DVD', 'Website', 'Response']
  const SimplifiedMovies = movies.map(movie => {
    const simplifiedMovie = movie
    parametersToDelete.forEach(parameter => {
      delete (simplifiedMovie as Record<string, any>)[parameter]
    })
    return simplifiedMovie
  })
  return SimplifiedMovies
}

export function buildPrompt (selectedMovies: Movie[]): string {
  const promptPart1 = PROMPT[0]
  const promptPart2 = PROMPT[1]
  const filledMovies = getFilledMovies(selectedMovies)
  const prompt = `${promptPart1} ${JSON.stringify(filledMovies)} ${promptPart2}`
  return prompt
}

export function cleanIndexes (movies: Movie[]): void {
  movies.forEach((movie, index) => {
    if (movie.imdbID.length < 2) {
      movie.imdbID = index.toString()
    }
  })
}
