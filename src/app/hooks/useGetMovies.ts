import { useRef, useState } from 'react'
import { getSuggestedMovies } from '../services/suggestedMovies'
import { getCompleteMovie } from '../services/completeMovie'
import { type Movie } from '../schemas/movie'
import emptyMovies from '../constants/emptyMovies.json'

export function useGetMovies ({ search }: { search: string }) {
  const [suggestedMovies, setSuggestedMovies] = useState<Movie[]>([])
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
    getSuggestedMovies(search)
      .then(data => {
        if (data === null) {
          setError('No movies found')
          setSuggestedMovies([])
          setIsLoading(false)
        } else {
          setSuggestedMovies(data)
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
    const newMovie = await getCompleteMovie({ id: movie.imdbID })
    const index = selectedMovies.findIndex(movie => movie.imdbID.length === 1)
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
