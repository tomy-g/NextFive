import { type Movie } from '@/app/schemas/movie'
import React from 'react'
import type { Key, MutableRefObject } from 'react'
import { Input, Listbox, ListboxItem } from '@nextui-org/react'
import { ListboxWrapper } from './ListboxWrapper'
import { Search } from 'lucide-react'
import { type DebouncedState } from 'use-debounce'

interface Props {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectMovie: (movie: Movie) => Promise<void>
  errorSearch: string | null
  errorGet: string | null
  suggestedMovies: Movie[]
  debounced: DebouncedState<(search: any) => Promise<void>>
  isFirstInput: MutableRefObject<boolean>
}

export default function SearchBar ({
  searchTerm,
  setSearchTerm,
  isOpen,
  setIsOpen,
  selectMovie,
  errorSearch,
  errorGet,
  suggestedMovies,
  debounced,
  isFirstInput
}: Props) {
  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const newSearch = event.target.value
    setSearchTerm(newSearch)
    void debounced(newSearch)
  }

  function handleClick (key: Key) {
    const movie = [...suggestedMovies].find(movie => movie.imdbID === key)
    if (movie !== undefined) {
      void selectMovie({ ...movie })
    }
  }

  return (
    <search>
      <div id='input-movies' className='relative w-full'>
        <Input
          value={searchTerm}
          isClearable
          label='Search for a movie:'
          labelPlacement='outside-left'
          onChange={handleChange}
          onFocus={() => {
            setIsOpen(true)
          }}
          onBlur={() => {
            setIsOpen(false)
          }}
          onClear={() => {
            isFirstInput.current = true
            setSearchTerm('')
            void debounced('')
          }}
          placeholder='The Godfather, Pulp Fiction, Se7en...'
          startContent={
            <Search
              className='text-foreground-200'
              strokeWidth={2.5}
              size={20}
            />
          }
          className='text-foreground static w-full'
          classNames={{
            input: 'ml-1',
            inputWrapper: 'h-[3rem]',
            mainWrapper: 'w-full',
            base: 'justify-between items-center',
            label: 'w-[20%] text-foreground text-md lg:block hidden',
          }}
          radius='full'
          variant='bordered'
        ></Input>
        <ListboxWrapper isOpen={isOpen}>
          <Listbox
            emptyContent={errorSearch ?? errorGet}
            items={suggestedMovies}
            aria-label='Suggested movies'
            onAction={handleClick}
          >
            {item => (
              <ListboxItem key={item.imdbID} textValue='{item.Title}'>
                <span>{item.Title}</span>
                <span className='ml-1.5 opacity-70 text-tiny'>
                  {'(' + item.Year + ')'}
                </span>
              </ListboxItem>
            )}
          </Listbox>
        </ListboxWrapper>
      </div>
    </search>
  )
}
