import { experimental_useObject as useObject } from 'ai/react'
import { moviesSchema, recommendedMoviesSchema } from '../schemas/movie'
import { type Movie } from '../schemas/movie'
import emptyMovies from '../constants/emptyMovies.json'
import { useEffect, useRef, useState } from 'react'
import { getCompleteMovie } from '../services/completeMovie'

export function useGetRecommendations () {
  const { object, submit, isLoading, stop } = useObject({
    api: '/api/completion',
    schema: moviesSchema
  })
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([
    ...emptyMovies
  ])
  const auxFinalMovies = useRef([...emptyMovies])
  // const [isReady, setIsReady] = useState(true)

  function resetRecommendedMovies () {
    setRecommendedMovies([...emptyMovies])
  }

  function resetAuxFinalMovies () {
    auxFinalMovies.current = [...emptyMovies]
  }

  useEffect(() => {
    // if (!isReady) return
    // setIsReady(false)

    const pushLastModified = async (movie: any, index: number) => {
      if (index !== -1) {
        auxFinalMovies.current[index] = { ...movie }
        setRecommendedMovies(prevMovies => {
          const updatedMovies = [...prevMovies]
          updatedMovies[index] = movie
          return updatedMovies
        })
        try {
          const completeMovie: any = await getCompleteMovie({
            title: movie.Title,
            year: movie.Year
          })
          if (completeMovie.error === true) {
            const errorData = await completeMovie.json()
            throw new Error(errorData.error)
          }
          auxFinalMovies.current[index] = completeMovie
          setRecommendedMovies(prevMovies => {
            const updatedMovies = [...prevMovies]
            updatedMovies[index] = completeMovie
            return updatedMovies
          })
        } catch (error) {
          const errorMovie = { ...movie }
          errorMovie.imdbID += 'error'
          errorMovie.Title = '...error...'
          auxFinalMovies.current[index] = errorMovie
          setRecommendedMovies(prevMovies => {
            const updatedMovies = [...prevMovies]
            updatedMovies[index] = errorMovie
            return updatedMovies
          })
        }
      }
    }

    const trackChanges = async () => {
      if (recommendedMoviesSchema.safeParse(object).success) {
        const allNew = object?.movies?.filter(
          newMovie =>
            ![...auxFinalMovies.current].some(
              finalMovie =>
                finalMovie.imdbID === newMovie?.imdbID ||
                finalMovie.Title === newMovie?.Title
            )
        )
        for (const movie of allNew ?? []) {
          const index = [...auxFinalMovies.current].findIndex(
            finalMovie => finalMovie.imdbID.length === 1
          )
          await pushLastModified(movie, index).catch(error => {
            console.error(error)
          })
        }
      }
      // setIsReady(() => {
      //   console.log('se cambia a true', object?.movies)
      //   return true
      // })
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
    resetRecommendedMovies,
    resetAuxFinalMovies
  }
}
