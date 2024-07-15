'use client'
import React from 'react'
import { Chip, Input, Listbox, ListboxItem } from '@nextui-org/react'
import { ListboxWrapper } from './ListboxWrapper'
import { Search } from 'lucide-react'
import { useSearchMovies } from '@/app/hooks/useSearchMovies'
import { useGetMovies } from '@/app/hooks/useGetMovies'
import { useDebouncedCallback } from 'use-debounce'

const SearchMovies = () => {
  const { isOpen, setIsOpen, searchTerm, setSearchTerm, errorSearch } = useSearchMovies()
  const { movies, getMovies, errorGet } = useGetMovies({ search: searchTerm })
  const debounced = useDebouncedCallback(async (search) => {
    try {
      await getMovies({ search })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }, 300)

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const newSearch = event.target.value
    setSearchTerm(newSearch)
    void debounced(newSearch)
  }

  return (
    <section className='flex gap-5 items-center'>
      <Chip size='lg' >ADD A MOVIE</Chip>
      <div id='input-movies' className='relative w-full'>
        <Input
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => {
            setIsOpen(true)
          }}
          onBlur={() => {
            setIsOpen(false)
          }}
          placeholder='The Godfather, Pulp Fiction, Se7en...'
          startContent={
            <Search
              className='text-foreground-200'
              strokeWidth={2.5}
              size={20}
            />
          }
          className='text-foreground static'
          classNames={{
            input: 'ml-1',
            inputWrapper: 'h-[3rem]'
          }}
          radius='full'
          variant='bordered'
        ></Input>
        <ListboxWrapper isOpen={isOpen}>
          <Listbox
            emptyContent={errorSearch ?? errorGet}
            items={movies}
            aria-label='Suggested movies'
            onAction={key => {
              alert(key)
            }}
          >
            {item => (
              <ListboxItem
                key={item.imdbID}
                textValue='{item.Title}'
              >
                <span>{item.Title}</span>
                <span className='ml-1.5 opacity-70 text-tiny'>{'(' + item.Year + ')'}</span>
              </ListboxItem>
            )}
          </Listbox>
        </ListboxWrapper>
      </div>
    </section>
  )
}

export default SearchMovies
