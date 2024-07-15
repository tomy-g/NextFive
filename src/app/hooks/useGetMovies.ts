import { useRef, useState } from 'react'
import { getSuggesteMovies } from '../services/suggestedMovies'
import { type Movie } from '../schemas/movie'

export function useGetMovies ({ search }: { search: string }) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const previusSearch = useRef(search)

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

  return {
    movies,
    isLoading,
    errorGet: error,
    getMovies
  }
}
