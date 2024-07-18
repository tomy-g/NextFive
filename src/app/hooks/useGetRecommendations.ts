import { experimental_useObject as useObject } from 'ai/react'
import { moviesSchema, recommendedMoviesSchema } from '../schemas/movie'
import { type Movie } from '../schemas/movie'
import emptyMovies from '../constants/emptyMovies.json'
import { useEffect, useState } from 'react'
import { getCompleteMovie } from '../services/completeMovie'

export function useGetRecommendations () {
  const { object, submit, isLoading, stop } = useObject({
    api: '/api/completion',
    schema: moviesSchema
  })
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([...emptyMovies])
  const auxFinalMovies: Movie[] = [...emptyMovies]
  const [isReady, setIsReady] = useState(true)

  function resetRecommendedMovies () {
    setRecommendedMovies([...emptyMovies])
  }

  useEffect(() => {
    if (!isReady) return
    setIsReady(false)

    const pushLastModified = async (movie: any, index: number) => {
      if (index !== -1) {
        const completeMovie: any = await getCompleteMovie({
          title: movie.Title,
          year: movie.Year
        })
        auxFinalMovies[index] = completeMovie
        setRecommendedMovies(prevMovies => {
          const updatedMovies = [...prevMovies]
          updatedMovies[index] = completeMovie
          return updatedMovies
        })
      }
    }

    const trackChanges = async () => {
      if (recommendedMoviesSchema.safeParse(object).success) {
        const allNew = object?.movies?.filter(
          movie =>
            auxFinalMovies.filter(
              finalMovie => finalMovie.imdbID === movie?.imdbID
            ).length === 0 && (movie?.imdbID?.length ?? 0) > 1
        )
        for (const movie of allNew ?? []) {
          const index = auxFinalMovies.findIndex(
            movie => movie.imdbID.length === 1
          )
          await pushLastModified(movie, index).catch(error => {
            console.error(error)
          })
        }
      }
      setIsReady(true)
    }
    trackChanges().catch(error => {
      console.error(error)
    })
  }, [object])

  return {
    submit,
    isLoading,
    recommendedMovies,
    stop,
    resetRecommendedMovies
  }
}
