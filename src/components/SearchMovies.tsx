'use client'
import React, { type MutableRefObject } from 'react'
import { type DebouncedState } from 'use-debounce'
import SelectedMovie from './SelectedMovie'
import SearchBar from './SearchBar'
import type { Movie } from '@/app/schemas/movie'
import { Chip, Divider } from '@nextui-org/react'
interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  errorSearch: string | null
  errorGet: string | null
  suggestedMovies: Movie[]
  getMovies: ({ search }: { search: string }) => Promise<void>
  selectedMovies: Movie[]
  setSelectedMovies: React.Dispatch<React.SetStateAction<Movie[]>>
  selectMovie: (movie: Movie) => Promise<void>
  isFirstInput: MutableRefObject<boolean>
  debounced: DebouncedState<(search: any) => Promise<void>>
  deselectMovie: (movie: Movie) => void
}

const SearchMovies = ({
  isOpen,
  setIsOpen,
  searchTerm,
  setSearchTerm,
  errorSearch,
  errorGet,
  suggestedMovies,
  getMovies,
  selectedMovies,
  setSelectedMovies,
  selectMovie,
  isFirstInput,
  debounced,
  deselectMovie
}: Props) => {
  return (
    <section id='search-movies' className='mt-8'>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectMovie={selectMovie}
        errorSearch={errorSearch}
        errorGet={errorGet}
        suggestedMovies={suggestedMovies}
        debounced={debounced}
        isFirstInput={isFirstInput}
      />
      <span className='flex items-center gap-4 mt-4'>
        <h2 className='text-lg text-secondary-500'>MOVIES YOU LIKE</h2>
        <Chip onClose={() => {}} variant='bordered' isDisabled size='sm' className='pb-0 text-secondary-700'>Clear all</Chip>
      </span>
      <Divider className='mt-1 bg-secondary-500 mb-2'/>
      <ul className='flex gap-2 list-none'>
        {selectedMovies.length > 0 && selectedMovies?.map(movie => (
          <SelectedMovie
            movie={movie}
            key={movie.imdbID}
            deselectMovie={deselectMovie}
          />
        ))}
      </ul>
    </section>
  )
}

export default SearchMovies
