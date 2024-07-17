'use client'
import React from 'react'
import { useSearchMovies } from '@/app/hooks/useSearchMovies'
import { useGetMovies } from '@/app/hooks/useGetMovies'
import { useDebouncedCallback } from 'use-debounce'
import SelectedMovie from './SelectedMovie'
import SearchBar from './SearchBar'

const SearchMovies = () => {
  const { isOpen, setIsOpen, searchTerm, setSearchTerm, errorSearch } =
    useSearchMovies()
  const { movies, getMovies, errorGet, selectedMovies, selectMovie } =
    useGetMovies({ search: searchTerm })
  const debounced = useDebouncedCallback(async search => {
    try {
      await getMovies({ search })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }, 300)

  return (
    <section id='search-movies' className='mt-20'>
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
