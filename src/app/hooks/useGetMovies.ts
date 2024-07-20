import { useEffect, useRef, useState } from 'react'
import { getSuggestedMovies } from '../services/suggestedMovies'
import { getCompleteMovie } from '../services/completeMovie'
import { type Movie } from '../schemas/movie'
import emptyMovies from '../constants/emptyMovies.json'
import { type DebouncedState } from 'use-debounce'
import { useLocalStorage } from './useLocalStorage'

interface Props {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  debounced: DebouncedState<(search: any) => Promise<void>>
}

export function useGetMovies ({ searchTerm, setSearchTerm, debounced }: Props) {
  const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const previousSearch = useRef(searchTerm)
  const auxSelectedMovies = [...emptyMovies]
  const [selectedMoviesDB, setSelectedMoviesDB] = useLocalStorage('selectedMovies', [...emptyMovies])
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([...emptyMovies])

  // Initialize selectedMovies with the movies stored in the local storage
  useEffect(() => {
    setSelectedMovies(selectedMoviesDB)
  }, [])

  // Update selectedMoviesDB when selectedMovies changes
  useEffect(() => {
    setSelectedMoviesDB(selectedMovies)
  }, [selectedMovies])

  const getMovies = async ({ search }: { search: string }) => {
    if (previousSearch.current === search) return
    setIsLoading(true)
    setError(null)
    previousSearch.current = search
    getSuggestedMovies(search, [...selectedMovies])
      .then(data => {
        if (data === null) {
          setError('No movies found')
          setSuggestedMovies([])
          setIsLoading(false)
        } else {
          setSuggestedMovies([...data])
          setIsLoading(false)
        }
      })
      .catch(error => {
        setError(error.message)
        setSuggestedMovies([])
        setIsLoading(false)
      })
  }

  const selectMovie = async (movie: Movie) => {
    setSearchTerm('')
    void debounced('')
    const index = selectedMovies.findIndex(movie => movie.imdbID?.length === 1)
    if (index === -1) return
    auxSelectedMovies[index].Title = '...loading...'
    setSelectedMovies(prevMovies => {
      const updatedMovies = [...prevMovies]
      updatedMovies[index].Title = '...loading...'
      return updatedMovies
    })
    const newMovie = await getCompleteMovie({ id: movie.imdbID })
    auxSelectedMovies[index] = newMovie
    setSelectedMovies(prevMovies => {
      const updatedMovies = [...prevMovies]
      updatedMovies[index] = newMovie
      return updatedMovies
    })
  }

  return {
    suggestedMovies,
    isLoading,
    errorGet: error,
    getMovies,
    selectedMovies,
    setSelectedMovies,
    selectMovie
  }
}
