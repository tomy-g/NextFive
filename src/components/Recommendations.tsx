'use client'

import { useGetRecommendations } from '@/app/hooks/useGetRecommendations'
import { PROMPT } from '../app/constants/prompt'
import Recommendation from './Recommendation'
import type { Movie } from '../app/schemas/movie'

export default function Recommendations () {
  const { submit, isLoading, finalMovies, stop, resetFinalMovies } =
    useGetRecommendations()
  return (
    <section className='w-full mt-8 '>
      <button
        onClick={() => {
          resetFinalMovies()
          submit(PROMPT)
        }}
        disabled={isLoading}
      >
        Generate movies
      </button>

      {isLoading && (
        <div>
          <div>Loading...</div>
          <button
            type='button'
            onClick={() => {
              stop()
            }}
          >
            Stop
          </button>
        </div>
      )}
      <div className='flex gap-2 items-stretch'>
        {finalMovies.map((movie: Movie, index: number) => (
          <Recommendation movie={movie} key={index} />
        ))}
      </div>
    </section>
  )
}
