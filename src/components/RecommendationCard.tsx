import { type Movie } from '@/app/schemas/movie'
import { Card, Image, Tooltip } from '@nextui-org/react'
import React from 'react'
import NextImage from 'next/image'
import error from '@/app/assets/error-min.png'
import placeholder from '@/app/assets/placeholder-min.png'

interface Props {
  movie: Movie
}

export default function RecommendationCard ({ movie }: Props) {
  return (
    <Card className='rounded-md'>
      <Tooltip
        showArrow={true}
        content={
          <p>
            <span>{movie.Title}</span>
            <span className='text-tiny'>{` (${movie.Year})`}</span>
          </p>
        }
        placement='bottom'
        className=''
        color='secondary'
        isDisabled={
          movie.Title.length < 1 ||
          movie.State === 'loading' ||
          movie.State === 'error'
        }
      >
        <Image
          as={NextImage}
          alt='NextUI hero Image'
          objectFit='cover'
          src={movie.State !== 'error' ? (movie.Poster !== 'N/A' ? movie.Poster : placeholder.src) : error.src}
          className='rounded-md aspect-[0.675/1]'
          width={300}
          height={448}
        />
      </Tooltip>
    </Card>
  )
}
