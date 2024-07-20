'use client'
import React, { type MutableRefObject } from 'react'
import { type DebouncedState } from 'use-debounce'
import SelectedMovie from './SelectedMovie'
import SearchBar from './SearchBar'
import type { Movie } from '@/app/schemas/movie'
import { cleanIndexes } from '@/app/utils/utils'
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
  debounced
}: Props) => {
  function deselectMovie (movie: Movie) {
    const toDeselect = selectedMovies.find(selectedMovie => selectedMovie.imdbID === movie.imdbID)
    const toDeselectIndex = selectedMovies.findIndex(selectedMovie => selectedMovie.imdbID === movie.imdbID)
    if ((toDeselect !== undefined) && toDeselectIndex > -1) {
      const newMovie: Movie = {
        Title: '',
        Year: '',
        imdbID: toDeselectIndex.toString(),
        Director: '',
        Poster: '',
      }
      const newSelected = [...selectedMovies]
      newSelected.splice(toDeselectIndex, 1)
      newSelected.push(newMovie)
      cleanIndexes(newSelected)
      setSelectedMovies(newSelected)
    }
  }

  return (
    <section id='search-movies' className='mt-12'>
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
      <ul className='flex gap-2 mt-9 list-none'>
        {selectedMovies.map(movie => (
          <SelectedMovie movie={movie} key={movie.imdbID} deselectMovie={deselectMovie} />
        ))}
      </ul>
    </section>
  )
}

export default SearchMovies
