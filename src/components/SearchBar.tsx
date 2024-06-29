'use client'
import React from 'react'
import { Input } from '@nextui-org/input'

const SearchBar = () => {
  return (
    <>
      <Input
        label='Search'
        placeholder='Type to search...'
        classNames={{
          label: 'text-c-text',
          input: [
            'bg-transparent',
            'text-c-text',
            'placeholder:text-c-secondary-200',
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'bg-c-secondary-900',
            'dark:hover:bg-c-secondary',
            'dark:focus-within:!bg-c-secondary-900',
            '!cursor-text',
          ],
        }}
      />
    </>

  )
}

export default SearchBar
