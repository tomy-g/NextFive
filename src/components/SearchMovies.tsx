'use client'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import SelectedMovie from './SelectedMovie'
import SearchBar from './SearchBar'
import type { Movie } from '@/app/schemas/movie'
interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  errorSearch: string | null
  errorGet: string | null
  movies: Movie[]
  getMovies: ({ search }: { search: string }) => Promise<void>
  selectedMovies: Movie[]
  selectMovie: (movie: Movie) => Promise<void>
}

const SearchMovies = ({
  isOpen,
  setIsOpen,
  searchTerm,
  setSearchTerm,
  errorSearch,
  errorGet,
  movies,
  getMovies,
  selectedMovies,
  selectMovie
}: Props) => {
  const debounced = useDebouncedCallback(async search => {
    try {
      await getMovies({ search })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }, 300)

  return (
    <section id='search-movies' className='mt-16'>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectMovie={selectMovie}
        errorSearch={errorSearch}
        errorGet={errorGet}
        movies={movies}
        debounced={debounced}
      />
      <ul className='flex gap-2 mt-5 list-none'>
        {selectedMovies.map(movie => (
          <SelectedMovie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </section>
  )
}

export default SearchMovies
