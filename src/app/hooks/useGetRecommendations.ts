import { experimental_useObject as useObject } from 'ai/react'
import { moviesSchema, recommendedMoviesSchema } from '../schemas/movie'
import { type Movie } from '../schemas/movie'
import emptyMoviesObject from '../constants/emptyMovies.json'
import { useEffect, useRef, useState } from 'react'
import { getCompleteMovie } from '../services/completeMovie'
import { useLocalStorage } from './useLocalStorage'

const emptyMovies: Movie[] = [...emptyMoviesObject]

export function useGetRecommendations () {
  const { object, submit, isLoading, stop, error } = useObject({
    api: '/api/completion',
    schema: moviesSchema,
    onError: () => {
      stop()
    }
  })
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([
    ...emptyMovies
  ])
  const [recommendedMoviesDB, setRecommendedMoviesDB] = useLocalStorage(
    'recommendedMovies',
    [...emptyMovies]
  )

  const auxRecommendedMovies = useRef([...emptyMovies])

  const [prevRecommendedMovies, setPrevRecommendedMovies] = useState<Movie[]>(
    []
  )

  const [prevRecommendedMoviesDB, setPrevRecommendedMoviesDB] = useLocalStorage(
    'prevRecommendedMovies',
    []
  )

  function resetRecommendedMovies () {
    setRecommendedMovies([...emptyMovies])
  }

  function resetAuxFinalMovies () {
    auxRecommendedMovies.current = [...emptyMovies]
  }

  useEffect(() => {
    setRecommendedMovies(recommendedMoviesDB)
    auxRecommendedMovies.current = [...recommendedMoviesDB]
    setPrevRecommendedMovies([...prevRecommendedMoviesDB])
  }, [])

  useEffect(() => {
    if (recommendedMovies !== emptyMovies) {
      setRecommendedMoviesDB([...recommendedMovies])
    }
  }, [recommendedMovies])

  useEffect(() => {
    setPrevRecommendedMoviesDB([...prevRecommendedMovies])
  }, [prevRecommendedMovies])

  useEffect(() => {
    const pushLastModified = async (movie: any, index: number) => {
      if (index !== -1) {
        auxRecommendedMovies.current[index] = { ...movie }
        setRecommendedMovies(prevMovies => {
          const updatedMovies = [...prevMovies]
          updatedMovies[index] = movie
          updatedMovies[index].State = 'loading'
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
          auxRecommendedMovies.current[index] = completeMovie
          setRecommendedMovies(prevMovies => {
            const updatedMovies = [...prevMovies]
            updatedMovies[index] = completeMovie
            updatedMovies[index].State = 'ok'
            return updatedMovies
          })
          if (
            prevRecommendedMovies.find(
              ({ imdbID }) => imdbID === completeMovie.imdbID
            ) === undefined
          ) {
            setPrevRecommendedMovies(prevPrevMovies => {
              const newPrevMovies = [...prevPrevMovies, completeMovie]
              return newPrevMovies
            })
          }
        } catch (error) {
          const errorMovie = { ...movie }
          errorMovie.State = 'error'
          auxRecommendedMovies.current[index] = errorMovie
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
            !auxRecommendedMovies.current.some(
              finalMovie =>
                // finalMovie.imdbID === newMovie?.imdbID &&
                finalMovie.Title === newMovie?.Title &&
                finalMovie.Year === newMovie?.Year
            )
        )
        for (const movie of allNew ?? []) {
          const index = [...auxRecommendedMovies.current].findIndex(
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
    resetAuxFinalMovies,
    error
  }
}
