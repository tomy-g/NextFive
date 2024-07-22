'use client'

import SearchMovies from '@/components/SearchMovies'
import Recommendations from '@/components/Recommendations'
import { useSearchMovies } from './hooks/useSearchMovies'
import { useGetMovies } from './hooks/useGetMovies'
import { useDebouncedCallback } from 'use-debounce'

export default function Home () {
  const debounced = useDebouncedCallback(async search => {
    try {
      await getMovies({ search })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }, 300)
  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    errorSearch,
    isFirstInput
  } = useSearchMovies()
  const {
    suggestedMovies,
    getMovies,
    errorGet,
    selectedMovies,
    setSelectedMovies,
    selectMovie,
    deselectMovie
  } = useGetMovies({ searchTerm, setSearchTerm, debounced })

  return (
    <main >
      <SearchMovies
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        errorSearch={errorSearch}
        errorGet={errorGet}
        suggestedMovies={suggestedMovies}
        getMovies={getMovies}
        selectedMovies={selectedMovies}
        setSelectedMovies={setSelectedMovies}
        selectMovie={selectMovie}
        isFirstInput={isFirstInput}
        debounced={debounced}
        deselectMovie={deselectMovie}
      />
      <Recommendations selectedMovies={selectedMovies} />
    </main>
  )
}
