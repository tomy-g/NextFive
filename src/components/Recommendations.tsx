'use client'

import { useGetRecommendations } from '@/app/hooks/useGetRecommendations'
import Recommendation from './Recommendation'
import type { Movie } from '../app/schemas/movie'
import { Button, Chip, Divider } from '@nextui-org/react'
import {
  buildPrompt,
  countFilledMovies,
  simplifyMovies
} from '@/app/utils/utils'

interface Props {
  selectedMovies: Movie[]
}

export default function Recommendations ({ selectedMovies }: Props) {
  const {
    submit,
    isLoading,
    recommendedMovies,
    resetRecommendedMovies,
    resetAuxFinalMovies,
    stop
  } = useGetRecommendations()
  return (
    <section id='movie-recommendations' className='w-full mt-8'>
      <div className='w-full flex items-center justify-evenly'>
        {/* <Divider className='w-1/3 hidden sm:block' /> */}
        {isLoading
          ? (
          <Button
            radius='full'
            color='danger'
            className='text-background sm:text-medium font-medium'
            onPress={() => {
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
            className='text-background sm:text-medium font-medium'
            onPress={() => {
              resetRecommendedMovies()
              resetAuxFinalMovies()
              const toSimplify = [...selectedMovies]
              const simplifiedMovies = simplifyMovies(toSimplify)
              const prompt = buildPrompt(simplifiedMovies)
              submit(prompt)
            }}
            isDisabled={isLoading || countFilledMovies([...selectedMovies]) < 1}
          >
            Recommend
          </Button>
            )}
        {/* <Divider className='w-1/3 hidden sm:block' /> */}
      </div>
      {countFilledMovies([...recommendedMovies]) > 0 && (
        <div>
          <span className='flex items-center gap-4 mt-1'>
            <h2 className='text-lg text-secondary-500'>MOVIES YOU <b>WILL </b>LIKE</h2>
            <Chip
              onClose={() => {
                resetRecommendedMovies()
                resetAuxFinalMovies()
              }}
              variant='bordered'
              size='sm'
              className='pb-0 text-secondary-700'
            >
              Clear all
            </Chip>
          </span>
          <Divider className='bg-secondary-500 mt-1 mb-2' />
          <ul className='flex gap-2 items-stretch list-none'>
            {recommendedMovies.map((movie: Movie, index: number) => (
              <Recommendation movie={movie} key={index} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
