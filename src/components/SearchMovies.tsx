'use client'
import React, { useState } from 'react'
import { Chip, Input, Listbox, ListboxItem } from '@nextui-org/react'
import { ListboxWrapper } from './ListboxWrapper'
import { Search } from 'lucide-react'
import moviesInput from '../app/constants/moviesInput.json'

const SearchMovies = () => {
  const [isOpen, setIsOpen] = useState(false)
  const suggestedMovies = moviesInput.map(movie => ({
    title: movie.Title,
    key: movie.imdbID
  }))

  return (
    <section className='flex gap-5 items-center'>
      <Chip size='lg' >ADD A MOVIE</Chip>
      <div id='input-movies' className='relative w-full'>
        <Input
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
            items={suggestedMovies}
            aria-label='Dynamic Actions'
            onAction={key => {
              alert(key)
            }}
          >
            {item => (
              <ListboxItem
                key={item.key}
                color={item.key === 'delete' ? 'danger' : 'default'}
                className={item.key === 'delete' ? 'text-danger' : ''}
              >
                {item.title}
              </ListboxItem>
            )}
          </Listbox>
        </ListboxWrapper>
      </div>
    </section>
  )
}

export default SearchMovies
