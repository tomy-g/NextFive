import React from 'react'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'

export default function Header () {
  return (
    <header className='pt-6'>
        <Image src='nextFive.svg' className='w-32 ' radius='none' as={NextImage} width={568} height={174} />
    </header>
  )
}
