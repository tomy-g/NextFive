import { type Movie } from '@/schemas/movie'

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

export function mapImportantData (movies: Movie[]): Movie[] {
  return [...movies].map(movie => {
    return {
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Director: movie.Director,
      Genre: movie.Genre,
      Plot: movie.Plot,
      // Writer: movie.Writer,
      // Runtime: movie.Runtime,
      // Actors: movie.Actors,
      // Language: movie.Language,
      // Country: movie.Country,
      // Type: movie.Type,
      // BoxOffice: movie.BoxOffice
    }
  })
}

export function createPrompt (
  selectedMovies: Movie[],
  type: string,
  prevRecommended: Movie[]
): string {
  let mediaType = 'movies and TV shows'
  if (type !== 'both') {
    if (type === 'movies') {
      mediaType = 'movies'
    } else {
      mediaType = 'TV shows'
    }
  }
  const prompt = `
  This is a list of movies/TV shows I like:

  User's liked Movies/Shows: ${JSON.stringify(
    selectedMovies
  )}.

Please analyze this list and give me 5 recommendations of ${mediaType} that are the most similar to the ones I like.
Analyze it's genre, plot, atmosphere...  etc. To give the most original, accurate and personalized recommendations of ${mediaType}.
I only want recommendations of ${mediaType}. No other type of media.
Return only imdbID, Title, Year and Directot.
All 5 ${mediaType} recommendations MUST be different from the ones I've passed you before (This is mandatory!), and different beteween them.
`
  return prompt
}

export function mapTitleYear (movies: Movie[]) {
  return movies.map(movie => `${movie.Title} (${movie.Year})`)
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
