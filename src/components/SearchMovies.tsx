'use client'
import React, { useEffect } from 'react'
import type { Key } from 'react'
import {
  Chip,
  Input,
  Listbox,
  ListboxItem,
  Image,
  Skeleton
} from '@nextui-org/react'
import { ListboxWrapper } from './ListboxWrapper'
import { Search } from 'lucide-react'
import { useSearchMovies } from '@/app/hooks/useSearchMovies'
import { useGetMovies } from '@/app/hooks/useGetMovies'
import { useDebouncedCallback } from 'use-debounce'
import placeholder from '@/app/assets/placeholder-min.png'
import NextImage from 'next/image'

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

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const newSearch = event.target.value
    setSearchTerm(newSearch)
    void debounced(newSearch)
  }

  function handleClick (key: Key) {
    const movie = movies.find(movie => movie.imdbID === key)
    if (movie !== undefined) {
      void selectMovie(movie)
    }
  }

  useEffect(() => {
    console.log('selectedMovies ha cambiado', selectedMovies[0])
  }, [selectedMovies])

  return (
    <section id='search-movies'>
      <search className='flex gap-5 items-center'>
        <Chip size='lg'>ADD A MOVIE</Chip>
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
      <ul className='flex gap-2 mt-5 list-none h-96'>
        {selectedMovies.map(movie => (
          <li className='list-none flex-1' key={movie.imdbID}>
            <Skeleton isLoaded={placeholder.src.length > 0}>
              <Image
                as={NextImage}
                priority
                className='rounded-md aspect-[0.675/1]'
                width={300}
                height={448}
                src={
                  movie.Poster !== undefined && movie.Poster.length > 0
                    ? movie.Poster
                    : placeholder.src
                }
              />
            </Skeleton>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SearchMovies
