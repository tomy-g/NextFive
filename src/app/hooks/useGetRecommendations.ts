import { experimental_useObject as useObject } from 'ai/react'
import { moviesSchema, recommendedMoviesSchema } from '../schemas/movie'
import { type Movie } from '../schemas/movie'
import emptyMovies from '../constants/emptyMovies.json'
import { useEffect, useRef, useState } from 'react'
import { getCompleteMovie } from '../services/completeMovie'
import { useLocalStorage } from './useLocalStorage'

export function useGetRecommendations () {
  const { object, submit, isLoading, stop } = useObject({
    api: '/api/completion',
    schema: moviesSchema
  })
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([
    ...emptyMovies
  ])
  const [recommendedMoviesDB, setRecommendedMoviesDB] = useLocalStorage('recommendedMovies', [...emptyMovies])

  const auxFinalMovies = useRef([...emptyMovies])

  function resetRecommendedMovies () {
    setRecommendedMovies([...emptyMovies])
  }

  function resetAuxFinalMovies () {
    auxFinalMovies.current = [...emptyMovies]
  }

  useEffect(() => {
    setRecommendedMovies(recommendedMoviesDB)
    auxFinalMovies.current = [...recommendedMoviesDB]
  }, [])

  useEffect(() => {
    setRecommendedMoviesDB(recommendedMovies)
  }, [recommendedMovies])

  useEffect(() => {
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
            throw new Error(completeMovie.message)
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
                finalMovie.imdbID === newMovie?.imdbID + 'error' ||
                finalMovie.Title === newMovie?.Title
            )
        )
        for (const movie of allNew ?? []) {
          const index = [...auxFinalMovies.current].findIndex(
            finalMovie => finalMovie.imdbID.length === 1
          )
          await pushLastModified(movie, index)
        }
      }
    }
    void trackChanges()
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
