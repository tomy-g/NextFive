import { type Movie } from '@/app/schemas/movie'
import { Card, Skeleton, Image } from '@nextui-org/react'
// import NextImage from 'next/image'
import React from 'react'
import NextImage from 'next/image'
import error from '@/app/assets/error-min.png'

interface Props {
  movie: Movie
}

export default function Recommendation ({ movie }: Props) {
  return (
    <Skeleton
      isLoaded={(movie.Poster !== undefined && movie.Poster.length > 0) || movie.Title === '...error...'}
      className='rounded-md '
      role='listitem'
    >
      <Card className='rounded-md'>
        <Image
          as={NextImage}
          alt='NextUI hero Image'
          objectFit='cover'
          src={movie.Title !== '...error...' ? movie.Poster : error.src}
          className='rounded-md aspect-[0.675/1]'
          width={300}
          height={448}
        />
      </Card>
    </Skeleton>
  )
}
