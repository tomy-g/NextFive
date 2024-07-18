import React from 'react'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'

export default function Header () {
  return (
    <header className='pt-5'>
      <a href='/'>
        <Image src='nextFive.svg' className='w-32 aspect-[568/174] ' radius='none' as={NextImage} width={568} height={174} />
      </a>
    </header>
  )
}
