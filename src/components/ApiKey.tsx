import { Input } from '@nextui-org/input'
import { Search } from 'lucide-react'
import React from 'react'

const ApiKey = () => {
  return (
    <Input
      label='Api Key'
      color='secondary'
      startContent={<Search size={20} />}
      className='mb-5'
    />
  )
}

export default ApiKey
