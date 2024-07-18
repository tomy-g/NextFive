'use client'

import { useGetRecommendations } from '@/app/hooks/useGetRecommendations'
import Recommendation from './Recommendation'
import type { Movie } from '../app/schemas/movie'
import { Button, Divider } from '@nextui-org/react'
import { buildPrompt, countFilledMovies, simplifyMovies } from '@/app/utils/utils'

interface Props {
  selectedMovies: Movie[]
}

export default function Recommendations ({ selectedMovies }: Props) {
  const { submit, isLoading, recommendedMovies } =
    useGetRecommendations()
  return (
    <section id='movie-recommendations' className='w-full mt-8'>
      <div className='w-full flex items-center justify-evenly'>
        <Divider className='w-1/3' />
        {isLoading
          ? (
          <Button
            radius='full'
            color='danger'
            className='text-background text-md font-medium'
            onClick={() => {
              stop()
            }}
          >
            Cancel
          </Button>
            )
          : (
          <Button
            radius='full'
            color='primary'
            className='text-background text-md font-medium'
            onClick={() => {
              // resetRecommendedMovies()
              const toSimplify = [...selectedMovies]
              const simplifiedMovies = simplifyMovies(toSimplify)
              const prompt = buildPrompt(simplifiedMovies)
              submit(prompt)
            }}
            isDisabled={isLoading || countFilledMovies([...selectedMovies]) < 1}
          >
            Recommend Movies
          </Button>
            )
          }
        <Divider className='w-1/3' />
      </div>
      {countFilledMovies([...recommendedMovies]) > 0 && (
        <ul className='flex gap-2 items-stretch mt-8 list-none'>
          {recommendedMovies.map((movie: Movie, index: number) => (
            <Recommendation movie={movie} key={index} />
          ))}
        </ul>
      )}
    </section>
  )
}
