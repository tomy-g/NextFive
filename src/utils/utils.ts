import { type Movie } from '@/schemas/movie'
import { PROMPT } from '@/constants/prompt'

export function countFilledMovies (movies: Movie[]): number {
  return movies.filter(movie => movie?.imdbID?.length > 1).length
}

export function getFilledMovies (movies: Movie[]): Movie[] {
  return movies.filter(movie => movie?.imdbID?.length > 1)
}

export function isFilled (movie: Movie) {
  return movie.imdbID?.length > 1
}

export function simplifyMovies (movies: Movie[]): Movie[] {
  const parametersToDelete = ['Poster', 'DVD', 'Website', 'Response']
  const moviesCopy = [...movies]
  const SimplifiedMovies = moviesCopy.map(movie => {
    const simplifiedMovie = { ...movie }
    parametersToDelete.forEach(parameter => {
      delete (simplifiedMovie as Record<string, any>)[parameter]
    })
    return simplifiedMovie
  })
  return SimplifiedMovies
}

export function buildPrompt (selectedMovies: Movie[], type: string): string {
  const promptPart1 = PROMPT[0]
  const promptPart2 = PROMPT[1]
  const promptPart3 = PROMPT[2]
  const filledMovies = getFilledMovies(selectedMovies)
  let prompt = `${promptPart1} ${JSON.stringify(filledMovies)} ${promptPart2}`
  if (type === 'tv') {
    prompt = prompt + ' ' + promptPart3 + ' TV Shows.'
  } else if (type === 'movies') {
    prompt = prompt + ' ' + promptPart3 + ' Movies.'
  }
  return prompt
}

export function cleanIndexes (movies: Movie[]): void {
  movies.forEach((movie, index) => {
    if (movie.imdbID.length < 2) {
      movie.imdbID = index.toString()
    }
  })
}

export function halfString (string: string): string {
  let middle = Math.floor(string.length / 2)
  const before = string.lastIndexOf(' ', middle)
  const after = string.indexOf(' ', middle + 1)
  if (middle - before < after - middle) {
    middle = before
  } else {
    middle = after
  }
  const s1 = string.substr(0, middle)
  return s1
}
