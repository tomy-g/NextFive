import { Image } from '@nextui-org/react'
import NextImage from 'next/image'

export default function custom404 () {
  return (
    <div className='flex items-center justify-center'>
      <Image
        as={NextImage}
        src='https://http.cat/images/404.jpg'
        alt='Error 404'
        width={750}
        height={600}
      ></Image>
    </div>
  )
}
