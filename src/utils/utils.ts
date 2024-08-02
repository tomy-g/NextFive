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
      Writer: movie.Writer,
      Runtime: movie.Runtime,
      Genre: movie.Genre,
      Actors: movie.Actors,
      Plot: movie.Plot,
      Language: movie.Language,
      Country: movie.Country,
      Type: movie.Type,
      BoxOffice: movie.BoxOffice
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
      mediaType = 'Movies'
    } else {
      mediaType = 'TV shows'
    }
  }
  const prompt = `
  You are a movies and TV shows recommendation system. 
  The user will provide a lists of movies/shows he likes.
  Your task is to provide 5 unique recommendations based on this data.

  User's liked Movies/Shows: ${JSON.stringify(
    selectedMovies
  )}.

Please recommend 5 unique ${mediaType} based on the following criteria:

1. Exclude Duplicates: DO NOT include any titles from the user's liked movies/shows. This is VERY IMPORTANT!!
2. Analyze the Provided List: With the data provided (genre, plot, etc...) and your knowledge of movies and TV shows, analyze the list to determine the user's preferences e.g. genre, theme, etc.
3. Recommend Similar Titles: Based on your analysis, recommend exactly FIVE ${mediaType} that closely match the user's input in terms of genre and theme.
4. Unique Titles: Ensure each recommendation is unique.
5. Include Specific Data: For each recommendation, provide the "imdbID", "Title", "Year", and "Director" as per the OMDB API structure.
6. Variate your recommendations: Each time this prompt is called it should return different recommendations. So if the user calls the prompt multiple times, he doesn't get the same recommendations.
7. Recomend exactly 5 ${mediaType}. This is a hard requirement because will throw an error otherwise. VERY IMPORTANT!!
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
