import { useEffect, useRef, useState } from 'react'

export function useSearchMovies () {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      setError('Type to search')
      isFirstInput.current = searchTerm === ''
      return
    }

    if (/^\s*$/.test(searchTerm)) {
      setError('Search term cannot be empty')
      return
    }

    if (searchTerm.length < 3) {
      setError('Search term must be at least 3 characters long')
      return
    }

    setIsLoading(true)
    setError(null)
  }, [searchTerm])

  return {
    searchTerm,
    setSearchTerm,
    errorSearch: error,
    isLoading,
    setIsLoading,
    isOpen,
    setIsOpen,
    isFirstInput
  }
}
