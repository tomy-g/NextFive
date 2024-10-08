'use client'

import SearchMovies from '@/components/SearchMovies'
import Recommendations from '@/components/Recommendations'
import { useSearchMovies } from '@/hooks/useSearchMovies'
import { useGetMovies } from '@/hooks/useGetMovies'
import { useDebouncedCallback } from 'use-debounce'
import { useState } from 'react'
import Tutorial from '@/components/Tutorial'
import { useLocalStorage } from '@/hooks/useLocalStorage'

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

  const [type, setType] = useState('both')

  const [isFirstVisit, setIsFirstVisit] = useLocalStorage('isFirstVisit', true)

  function changeType (newType: string) {
    setType(newType)
  }

  return (
    <main >
      <Tutorial isModalOpen={isFirstVisit} setIsOpen={setIsFirstVisit} />
      <SearchMovies
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        errorSearch={errorSearch}
        errorGet={errorGet}
        suggestedMovies={suggestedMovies}
        selectedMovies={selectedMovies}
        setSelectedMovies={setSelectedMovies}
        selectMovie={selectMovie}
        isFirstInput={isFirstInput}
        debounced={debounced}
        deselectMovie={deselectMovie}
        changeType={changeType}
      />
      <Recommendations selectedMovies={selectedMovies} type={type}/>
    </main>
  )
}
