import { type Movie } from '@/schemas/movie'
import { Card, CardFooter, Image, Tooltip } from '@nextui-org/react'
import React from 'react'
import NextImage from 'next/image'
import error from '@/assets/error-min.png'
import nophoto from '@/assets/no-photo-min.png'
import placeholder from '@/assets/placeholder-min.png'

interface Props {
  movie: Movie
}

export default function RecommendationCard ({ movie }: Props) {
  let src
  if (movie.State !== 'error') {
    if (movie.Poster !== 'N/A') {
      if (movie.State !== 'empty') {
        src = movie.Poster
      } else {
        src = placeholder.src
      }
    } else {
      src = nophoto.src
    }
  } else {
    src = error.src
  }
  return (
    <Card className={`!rounded-md bg-background border-secondary-100 border-1 ${movie?.Poster !== '' ? 'hover:border-success' : ''}  !transition-all !duration-300`}>
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
          src={src}
          radius='md'
          className={`aspect-[0.675/1] object-cover 
            ${(movie.State === 'error' && movie.Title !== '') ? '!opacity-70' : ''}`}
          width={300}
          height={448}
        />
      </Tooltip>
      {(movie.State === 'error' && movie.Title !== '') && (
        <CardFooter className='absolute bottom-0 text-small pb-0 sm:pb-3 z-50'>
          <span>{`${movie.Title} (${movie.Year})`}</span>
        </CardFooter>
      )}
    </Card>
  )
}
