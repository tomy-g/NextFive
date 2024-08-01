import { z } from 'zod'

const movieSchema = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Year: z.string(),
  Director: z.string(),
  Poster: z.string().optional(),
  State: z.string().refine(value => value === 'error' || value === 'ok' || value === 'loading', {
    message: "State must be 'error', 'ok', or 'waiting'"
  }).optional(),
  Rated: z.string().optional(),
  Released: z.string().optional(),
  Runtime: z.string().optional(),
  Genre: z.string().optional(),
  Writer: z.string().optional(),
  Actors: z.string().optional(),
  Plot: z.string().optional(),
  Language: z.string().optional(),
  Country: z.string().optional(),
  Awards: z.string().optional(),
  Ratings: z.array(z.object({
    Source: z.string(),
    Value: z.string()
  })).optional(),
  Metascore: z.string().optional(),
  imdbRating: z.string().optional(),
  imdbVotes: z.string().optional(),
  Type: z.string().optional(),
  DVD: z.string().optional(),
  BoxOffice: z.string().optional(),
  Production: z.string().optional(),
  Website: z.string().optional(),
  Response: z.string().optional(),
  OriginalID: z.string().optional(),
})

const moviesSchema = z.object({
  movies: z.array(movieSchema).length(5)
})

const recommendedMoviesSchema = z.object({
  movies: z.array(movieSchema).max(5)
})

type Movie = z.infer<typeof movieSchema>

export { movieSchema, moviesSchema, recommendedMoviesSchema }
export type { Movie }
