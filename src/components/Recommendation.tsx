import { type Movie } from '@/app/schemas/movie'
import { Card, Skeleton, Image, Tooltip } from '@nextui-org/react'
// import NextImage from 'next/image'
import React from 'react'
import NextImage from 'next/image'
import error from '@/app/assets/error-min.png'
import Link from 'next/link'

interface Props {
  movie: Movie
}

export default function Recommendation ({ movie }: Props) {
  return (
    <Skeleton
      isLoaded={
        (movie.Poster !== undefined && movie.Poster.length > 0) ||
        movie.Title === '...error...'
      }
      className='rounded-md '
      role='listitem'
    >
      <Card className='rounded-md'>
        <Link href={'/movie'}>
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
              movie.Title === '...loading...' ||
              movie.Title === '...error...'
            }
          >
            <Image
              as={NextImage}
              alt='NextUI hero Image'
              objectFit='cover'
              src={movie.Title !== '...error...' ? movie.Poster : error.src}
              className='rounded-md aspect-[0.675/1]'
              width={300}
              height={448}
            />
          </Tooltip>
        </Link>
      </Card>
    </Skeleton>
  )
}
