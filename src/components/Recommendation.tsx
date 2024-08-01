import { type Movie } from '@/schemas/movie'
import { Skeleton } from '@nextui-org/react'
import React from 'react'
import RecommendationCard from './RecommendationCard'
import Link from 'next/link'

interface Props {
  movie: Movie
}

export default function Recommendation ({ movie }: Props) {
  return (
    <Skeleton
      isLoaded={
        (movie.Poster !== undefined && movie.Poster.length > 0) ||
        movie.State === 'error'
      }
      className='rounded-md max-sm:w-[30%]'
      role='listitem'
    >
      {movie.State === 'error'
        ? (
        <RecommendationCard movie={movie} />
          )
        : (
        <Link href={`/movie/${movie.imdbID}`}>
          <RecommendationCard movie={movie} />
        </Link>
          )}
    </Skeleton>
  )
}
