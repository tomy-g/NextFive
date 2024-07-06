'use client'

import { experimental_useObject as useObject } from 'ai/react'
import { PROMPT } from '../../constants/prompt'
import Recommendation from './Recommendation'
import { moviesSchema } from '@/app/schemas/movies'
import { useEffect, useState } from 'react'
import type { Movie } from '@/app/schemas/movie'

async function convertMovie (movie: any): Promise<any> {
  const res = await fetch(`/api/movie?i=${movie.imdb_id}`)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return await res.json()
}

export default function Recommendations () {
  const { object, submit, isLoading, stop } = useObject({
    api: '/api/completion',
    schema: moviesSchema
  })
  const [finalMovies, setFinalMovies] = useState<Movie[]>([])
  const [isReady, setIsReady] = useState(true)

  useEffect(() => {
    if (!isReady) return
    setIsReady(false)
    const fetchData = async (movie: any) => {
      return await convertMovie(movie)
    }

    const pushLastModified = async (movie: any) => {
      const completeMovie: any = await fetchData(movie)
      setFinalMovies(prevMovies => [...prevMovies, completeMovie])
    }

    const updateLastAdded = async (index: number, movie: any) => {
      const completeMovie: any = await fetchData(movie)
      setFinalMovies(prevMovies => {
        const updatedMovies = [...prevMovies]
        updatedMovies[index] = completeMovie
        return updatedMovies
      })
    }

    const trackChanges = async () => {
      if (moviesSchema.safeParse(object).success) {
        const lastModified = object?.movies?.findLast(
          movie => movie?.imdb_id != null && movie?.imdb_id?.length > 0
        )
        const lastAdded = finalMovies.findLast(
          movie => movie?.imdbID != null && movie?.imdbID?.length > 0
        )
        if (
          (lastAdded === undefined) ||
          (lastModified?.imdb_id !== lastAdded?.imdbID &&
            lastModified !== undefined)
        ) {
          await pushLastModified(lastModified)
            .catch(error => {
              console.error(error)
            })
            .then(() => {
              console.log(lastAdded?.imdbID + ' ' + lastModified?.imdb_id)
            })
        }
        if (
          lastModified !== undefined &&
          lastAdded !== undefined &&
          lastModified?.imdb_id === lastAdded?.imdbID
        ) {
          const lastAddedIndex = finalMovies.findLastIndex(
            movie => movie?.imdbID != null && movie?.imdbID?.length > 0
          )
          await updateLastAdded(lastAddedIndex, lastModified)
            .catch(error => {
              console.error(error)
            })
            .then(() => {
              console.log(lastAdded?.imdbID + ' ' + lastModified?.imdb_id)
            })
        }
      }
      setIsReady(true)
    }
    trackChanges().catch(error => {
      console.error(error)
    })
  }, [object])

  useEffect(() => {}, [finalMovies])

  return (
    <div>
      <button
        onClick={() => {
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

      <div className='flex gap-2'>
        {finalMovies.map((movie: any, index: number) => (
          <Recommendation movie={movie} key={index} />
        ))}
      </div>
    </div>
  )
}
