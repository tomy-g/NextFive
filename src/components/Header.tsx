import React from 'react'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'

export default function Header () {
  return (
    <header className='mt-4'>
        <Image src='nextFive.svg' className='w-40' radius='none' as={NextImage} width={568} height={174} />
    </header>
  )
}
