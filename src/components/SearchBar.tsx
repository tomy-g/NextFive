import { type Movie } from '@/schemas/movie'
import React, { useState } from 'react'
import type { Key, MutableRefObject } from 'react'
import {
  Input,
  Listbox,
  ListboxItem,
  Select,
  SelectItem
} from '@nextui-org/react'
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
  changeType: (newType: string) => void
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
  isFirstInput,
  changeType
}: Props) {
  const [type, setType] = useState('both')

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

  const options = [
    { key: 'both', label: 'Movies & TV' },
    { key: 'movies', label: 'Movies' },
    { key: 'tv', label: 'TV Shows' }
  ]

  return (
    <search className='flex flex-col sm:flex-row items-center gap-4'>
      <div id='input-movies' className='relative w-full'>
        <Input
          value={searchTerm}
          isClearable
          label='Search Movie/TV show:'
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
          placeholder='The Godfather, Pulp Fiction, Star Wars...'
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
            label:
              'w-[33%] text-foreground text-md lg:block hidden sm:text-nowrap',
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
      <Select
        selectedKeys={[type]}
        onSelectionChange={(keys: 'all' | Set<Key>) => {
          if (keys === 'all' || keys.size === 0) {
            setType('both')
          } else {
            const selectedKey = Array.from(keys).join(', ')
            setType(selectedKey)
            changeType(selectedKey)
          }
        }}
        selectionMode='single'
        className='w-52'
        variant='bordered'
        label='I want to watch'
        classNames={{
          // value: 'text-[0.75rem] sm:text-[1rem]',
          // label: 'sm:block hidden',
          innerWrapper: [
            // 'group-data-[has-label=true]:pt-0',
            // 'group-data-[has-label=true]:sm:pt-4'
          ],
          popoverContent: 'bg-background',
        }}
      >
        {options.map(option => (
          <SelectItem key={option.key} value={option.key}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </search>
  )
}
