'use client'

import { useGetRecommendations } from '@/hooks/useGetRecommendations'
import Recommendation from './Recommendation'
import type { Movie } from '@/schemas/movie'
import { Button, Chip, Divider, Link } from '@nextui-org/react'
import { countFilledMovies, createPrompt, mapImportantData } from '@/utils/utils'
import { useRouter } from 'next/navigation'

interface Props {
  selectedMovies: Movie[]
  type: string
}

export default function Recommendations ({ selectedMovies, type }: Props) {
  const {
    submit,
    isLoading,
    recommendedMovies,
    resetRecommendedMovies,
    resetAuxFinalMovies,
    stop,
    error,
    prevRecommendedMovies
  } = useGetRecommendations()

  const router = useRouter()
  return (
    <section id='movie-recommendations' className='w-full mt-8 min-h-96'>
      <div className='w-full flex items-center justify-evenly'>
        {isLoading
          ? (
          <Button
            radius='full'
            color='danger'
            className='text-background sm:text-medium font-medium mb-8 sm:mb-4'
            onPress={() => {
              stop()
              resetAuxFinalMovies()
              resetRecommendedMovies()
            }}
          >
            Cancel
          </Button>
            )
          : (
          <Button
            radius='full'
            color='primary'
            className='text-background sm:text-medium font-medium mb-8 sm:mb-4'
            onPress={() => {
              resetRecommendedMovies()
              resetAuxFinalMovies()
              const toSimplify = [...selectedMovies]
              const simplifiedMovies = mapImportantData(toSimplify)
              const prompt = createPrompt(simplifiedMovies, type, prevRecommendedMovies)
              submit(prompt)
              const w = window.innerWidth
              if (w < 640) {
                setTimeout(() => {
                  router.push('#movie-recommendations')
                }, 2000)
              }
            }}
            isDisabled={isLoading || countFilledMovies([...selectedMovies]) < 1}
          >
            Recommend
          </Button>
            )}
      </div>
      {error !== null &&
        error !== undefined &&
        (error as Error)?.message === 'Ratelimited!' && (
          <div className='w-full mt-4 flex'>
            <p className='inline mx-auto text-danger-600 text-center bg-danger-50 p-2 px-4 rounded-md'>
              You have reached the limit of free recommendations for today. Set
              your own API key in <b>Settings</b> to have unlimited access{' '}
              <Link
                href='/about#error-limit'
                color='success'
                underline='always'
              >
                Learn how
              </Link>
            </p>
          </div>
      )}

      {error !== null &&
        error !== undefined &&
        (error as Error)?.message === '' && (
          <div className='w-full mt-4 flex'>
            <p className='inline mx-auto text-danger-600 text-center bg-danger-50 p-2 px-4 rounded-md'>
              An error occurred, make sure you have set your API key correctly.{' '}
              <Link href='/about#error-api' color='success' underline='always'>
                Learn how
              </Link>
            </p>
          </div>
      )}

      {countFilledMovies([...recommendedMovies]) > 0 && (
        <div>
          <span className='flex items-center gap-4 mt-1'>
            <h2 className='text-lg text-secondary-500'>
              MOVIES YOU <b>WILL </b>LIKE
            </h2>
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
          <ul className='flex flex-wrap sm:flex-nowrap gap-2 items-stretch
          max-sm:justify-center max-sm:gap-4 list-none max-sm:[&>*:nth-child(4n)]:ml-[auto]
          max-sm:[&>*:nth-child(5n)]:mr-[auto] '>
            {recommendedMovies.map((movie: Movie, index: number) => (
              <Recommendation movie={movie} key={index} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
