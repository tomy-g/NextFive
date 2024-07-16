'use client'

import { useGetRecommendations } from '@/app/hooks/useGetRecommendations'
import { PROMPT } from '../app/constants/prompt'
import Recommendation from './Recommendation'
import type { Movie } from '../app/schemas/movie'
import { Button, Divider } from '@nextui-org/react'

export default function Recommendations () {
  const { submit, isLoading, finalMovies, stop, resetFinalMovies } =
    useGetRecommendations()
  return (
    <section id='movie-recommendations' className='w-full mt-8'>
      <div className='w-full flex items-center justify-evenly'>
        <Divider className='w-1/3' />
        <Button
          radius='full'
          color='primary'
          className='text-background text-md font-medium'
          onClick={() => {
            resetFinalMovies()
            submit(PROMPT)
          }}
          disabled={isLoading}
        >
          Generate movies
        </Button>
        <Divider className='w-1/3' />
      </div>
      {isLoading && (
        <div>
          <div>Loading...</div>
          <Button
            type='button'
            onClick={() => {
              stop()
            }}
          >
            Stop
          </Button>
        </div>
      )}
      <div className='flex gap-2 items-stretch mt-8'>
        {finalMovies.map((movie: Movie, index: number) => (
          <Recommendation movie={movie} key={index} />
        ))}
      </div>
    </section>
  )
}
