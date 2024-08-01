import React from 'react'
import { type Movie } from '@/schemas/movie'
import {
  Skeleton,
  Tooltip
} from '@nextui-org/react'
import Link from 'next/link'
import SelectedMovieCard from './SelectedMovieCard'

interface Props {
  movie: Movie
  deselectMovie: (movie: Movie) => void
}

function SelectedMovie ({ movie, deselectMovie }: Props) {
  return (
    <li className='list-none flex-1' key={movie.imdbID}>
      <Skeleton
        className='rounded-md'
        isLoaded={movie.State !== 'loading'}
      >
        <Tooltip
          showArrow={true}
          content={
            <p>
              <span>{movie.Title}</span>
              <span className='text-tiny'>{` (${movie.Year})`}</span>
            </p>
          }
          isDisabled={
            movie.Title.length < 1 ||
            movie.State === 'loading' ||
            movie.State === 'error'
          }
          placement='top'
          className=''
          color='secondary'
        >
          {movie.imdbID.length < 2
            ? (
            <SelectedMovieCard movie={movie} deselectMovie={deselectMovie} />
              )
            : (
            <Link href={`/movie/${movie.imdbID}`}>
              <SelectedMovieCard movie={movie} deselectMovie={deselectMovie} />
            </Link>
              )}
        </Tooltip>
      </Skeleton>
    </li>
  )
}

export default SelectedMovie
