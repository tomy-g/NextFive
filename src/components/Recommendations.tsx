'use client'

import { experimental_useObject as useObject } from 'ai/react'
// import { PROMPT } from '../../constants/prompt'
import { moviesSchema } from '@/app/schemas/movies'
import data from '../app/mocks/completeMovies.json'
import Recommendation from './Recommendation'

export default function Recommendations () {
  const { isLoading, stop } = useObject({
    api: '/api/completion',
    schema: moviesSchema
  })

  return (
    <div>
      {/* <button
        onClick={() => {
          submit(PROMPT)
        }}
        disabled={isLoading}
        disabled={true}
      >
        Generate movies
      </button> */}

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
      <div className='flex gap-2'>
        {data?.movies?.map((movie, index) => (
          <Recommendation movie={movie} key={index} />
        ))}
      </div>
    </div>
  )
}
