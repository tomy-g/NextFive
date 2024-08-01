import { type Movie } from '@/schemas/movie'
import { Card, Image, Tooltip } from '@nextui-org/react'
import React from 'react'
import NextImage from 'next/image'
import error from '@/assets/error-min.png'
import nophoto from '@/assets/no-photo-min.png'

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
        color='secondary'
        isDisabled={
          movie?.Title?.length < 1 ||
          movie?.State === 'loading' ||
          movie?.State === 'error'
        }
      >
        <Image
          as={NextImage}
          alt={`${movie.Title} (${movie.Year}) {' '} poster`}
          src={movie.State !== 'error' ? (movie.Poster !== 'N/A' ? movie.Poster : nophoto.src) : error.src}
          className='rounded-md aspect-[0.675/1] object-cover'
          width={300}
          height={448}
        />
      </Tooltip>
    </Card>
  )
}
