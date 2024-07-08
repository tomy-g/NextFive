import { z } from 'zod'

const moviesSchema = z.object({
  movies: z.array(
    z.object({
      imdb_id: z.string().regex(/^tt\d{7,8}$/), // IMDb IDs typically start with 'tt' followed by 7 or 8 digits
      title: z.string().min(1), // Title should be a non-empty string
      year: z.number().int().min(1888), // Year should be an integer and movies started appearing around 1888
      director: z.string().min(1) // Director should be a non-empty string})
    })
  ).length(5)
})

export { moviesSchema }
