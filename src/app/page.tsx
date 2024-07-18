'use client'

import SearchMovies from '@/components/SearchMovies'
// import { Textarea } from '@nextui-org/react'
import Recommendations from '@/components/Recommendations'
import Header from '@/components/Header'
import { useSearchMovies } from './hooks/useSearchMovies'
import { useGetMovies } from './hooks/useGetMovies'

export default function Home () {
  const { isOpen, setIsOpen, searchTerm, setSearchTerm, errorSearch } =
    useSearchMovies()
  const { suggestedMovies, getMovies, errorGet, selectedMovies, selectMovie } =
    useGetMovies({ search: searchTerm })
  return (
    <div className='w-96 lg:w-[60rem] '>
      <main>
        <Header />
        <SearchMovies
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          errorSearch={errorSearch}
          errorGet={errorGet}
          movies={suggestedMovies}
          getMovies={getMovies}
          selectedMovies={selectedMovies}
          selectMovie={selectMovie}
        />
        <Recommendations selectedMovies={selectedMovies}/>
      </main>
    </div>
  )
}
