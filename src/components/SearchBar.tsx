'use client'
import React from 'react'
import { Input } from '@nextui-org/input'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
      <Input
        label='Search'
        placeholder='Type to search...'
        color='secondary'
        startContent={
          <Search size={20}/>
        }

       className='pb-5'
      />
  )
}

export default SearchBar
