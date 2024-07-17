import React from 'react'
import { type Movie } from '@/app/schemas/movie'
import placeholder from '@/app/assets/placeholder-min.png'
import nopicture from '@/app/assets/no-photo-min.png'
import NextImage from 'next/image'
import { Card, Skeleton, Image, CardFooter } from '@nextui-org/react'

interface Props {
  movie: Movie
}

function SelectedMovie ({ movie }: Props) {
  return (
    <li className='list-none flex-1' key={movie.imdbID}>
      <Skeleton isLoaded={placeholder.src.length > 0}>
        <Card className='rounded-md'>
          <Image
            as={NextImage}
            priority
            objectFit='cover'
            className='rounded-md aspect-[0.675/1]'
            width={300}
            height={448}
            src={
              movie.Poster !== undefined &&
              movie.Poster !== 'N/A' &&
              movie.Poster.length > 0
                ? movie.Poster
                : movie.Poster === 'N/A'
                  ? nopicture.src
                  : placeholder.src
            }
          ></Image>
          <CardFooter className='absolute z-10 bottom-0 text-small'>
            {movie.Poster === 'N/A' ? <span>{movie.Title}</span> : null}
          </CardFooter>
        </Card>
      </Skeleton>
    </li>
  )
}

export default SelectedMovie
