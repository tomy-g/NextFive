import { type Movie } from '@/app/schemas/movie'
import { Skeleton } from '@nextui-org/react'
// import NextImage from 'next/image'
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
        movie.Title === '...error...'
      }
      className='rounded-md '
      role='listitem'
    >
      {movie.Title === '...error...'
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
