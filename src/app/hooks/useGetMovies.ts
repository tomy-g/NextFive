import { useRef, useState } from 'react'
import { getSuggesteMovies } from '../services/suggestedMovies'
import { getCompleteMovie } from '../services/completeMovie'
import { type Movie } from '../schemas/movie'
import emptyMovies from '../constants/emptyMovies.json'

export function useGetMovies ({ search }: { search: string }) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const previusSearch = useRef(search)
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([...emptyMovies])
  const auxSelectedMovies = [...emptyMovies]

  const getMovies = async ({ search }: { search: string }) => {
    if (previusSearch.current === search) return
    setIsLoading(true)
    setError(null)
    previusSearch.current = search
    getSuggesteMovies(search)
      .then(data => {
        if (data === null) {
          setError('No movies found')
          setMovies([])
          setIsLoading(false)
        } else {
          setMovies(data)
          setIsLoading(false)
        }
      })
      .catch(error => {
        setError(error.message)
        setMovies([])
        setIsLoading(false)
      })
  }

  const selectMovie = async (movie: Movie) => {
    const newMovie = await getCompleteMovie(movie.imdbID)
    const index = selectedMovies.findIndex(movie => movie.imdbID.length === 1)
    auxSelectedMovies[index] = newMovie
    setSelectedMovies(prevMovies => {
      const updatedMovies = [...prevMovies]
      updatedMovies[index] = newMovie
      return updatedMovies
    })
    console.log('selectedMovies', auxSelectedMovies)
    console.log('emptyMovies', emptyMovies)
  }

  return {
    movies,
    isLoading,
    errorGet: error,
    getMovies,
    selectedMovies,
    selectMovie
  }
}
