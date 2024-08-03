import { experimental_useObject as useObject } from 'ai/react'
import { moviesSchema, recommendedMoviesSchema } from '@/schemas/movie'
import { type Movie } from '@/schemas/movie'
import emptyMoviesObject from '@/constants/emptyMovies.json'
import { useEffect, useRef, useState, useContext } from 'react'
import { getCompleteMovie } from '@/services/completeMovie'
import { useLocalStorage } from './useLocalStorage'
import { ApiKeyContext } from '@/contexts/ApiKeyContext'
import { ModelContext } from '@/contexts/ModelContext'
import { halfString } from '@/utils/utils'
import stringSimilarity from 'string-similarity-js'

const emptyMovies: Movie[] = [...emptyMoviesObject]

export function useGetRecommendations () {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('')

  const apiKeyContext = useContext(ApiKeyContext)
  const modelContext = useContext(ModelContext)

  useEffect(() => {
    setApiKey(apiKeyContext)
  }, [apiKeyContext])

  useEffect(() => {
    setModel(modelContext)
  }, [modelContext])

  useEffect(() => {
    setApiKey(apiKeyContext)
    setModel(modelContext)
  }, [])

  const { object, submit, isLoading, stop, error } = useObject({
    api: `/api/completion${model !== '' ? `?model=${model}` : ''}${
      apiKey !== '' ? `&api_key=${apiKey}` : ''
    }`,
    schema: moviesSchema,
    onError: () => {
      stop()
    }
  })
  useEffect(() => {
    if (!isLoading) {
      setRecommendedMovies(([...oldMovies]) => oldMovies.map(({ ...movie }) => {
        if ((movie.State === undefined || movie.State === null) && movie.Title === '') {
          return {
            ...movie,
            State: 'error'
          }
        }
        return movie
      }))
      auxRecommendedMovies.current = [...auxRecommendedMovies.current].map(({ ...movie }) => {
        if ((movie.State === undefined || movie.State === null) && movie.Title === '') {
          return {
            ...movie,
            State: 'error'
          }
        }
        return movie
      })
    }
  }, [isLoading])

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
        let isFound = false
        auxRecommendedMovies.current.forEach((cMovie, cIndex) => {
          if (cMovie.OriginalID === movie.imdbID && cIndex !== index) {
            isFound = true
          }
        })
        if (isFound) {
          return
        }
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
          auxRecommendedMovies.current[index].OriginalID = movie.OriginalID
          setRecommendedMovies(prevMovies => {
            const updatedMovies = [...prevMovies]
            updatedMovies[index] = completeMovie
            updatedMovies[index].State = 'ok'
            updatedMovies[index].OriginalID = movie.OriginalID
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
          try {
            const completeMovie: any = await getCompleteMovie({
              title: halfString(movie.Title),
              year: movie.Year
            })
            if (completeMovie.error === true) {
              throw new Error(completeMovie.message)
            }
            auxRecommendedMovies.current[index] = completeMovie
            auxRecommendedMovies.current[index].OriginalID = movie.OriginalID
            setRecommendedMovies(prevMovies => {
              const updatedMovies = [...prevMovies]
              updatedMovies[index] = completeMovie
              updatedMovies[index].State = 'ok'
              updatedMovies[index].OriginalID = movie.OriginalID
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
          } catch (e) {
            const errorMovie = { ...movie }
            errorMovie.State = 'error'
            auxRecommendedMovies.current[index] = errorMovie
            setRecommendedMovies(prevMovies => {
              const updatedMovies = [...prevMovies]
              updatedMovies[index] = errorMovie
              updatedMovies[index].OriginalID = movie.OriginalID
              return updatedMovies
            })
          }
        }
      }
    }

    const trackChanges = async () => {
      if (recommendedMoviesSchema.safeParse(object).success) {
        const allNew = object?.movies?.filter(
          newMovie =>
            !auxRecommendedMovies.current.some(
              finalMovie =>
                finalMovie.OriginalID === newMovie?.imdbID &&
                ((newMovie?.Title) !== null) &&
                ((newMovie?.Title) !== undefined) &&
                stringSimilarity(finalMovie.Title, newMovie.Title) > 0.8
            )
        )
        for (const movie of allNew ?? []) {
          const current = { ...movie }
          if (current !== undefined) {
            current.OriginalID = current.imdbID
          }
          const index = [...auxRecommendedMovies.current].findIndex(
            finalMovie => finalMovie.imdbID.length === 1
          )
          await pushLastModified(current, index)
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
    error,
    prevRecommendedMovies
  }
}
