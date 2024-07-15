import { type Movie } from '@/app/schemas/movie'
import { Card, Skeleton, Image } from '@nextui-org/react'
// import NextImage from 'next/image'
import React from 'react'

interface Props {
  movie: Movie
}

export default function Recommendation ({ movie }: Props) {
  return (
    <Skeleton
      isLoaded={movie.Poster !== undefined && movie.Poster.length > 0}
      className='rounded-md flex-grow '
    >
      <Card className='rounded-md'>
        <Image
          alt='NextUI hero Image'
          src={movie.Poster}
          className='rounded-md flex-grow'
          width={300}
          height={445}
        />
      </Card>
    </Skeleton>
  )
}
