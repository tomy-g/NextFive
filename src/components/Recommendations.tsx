'use client'

import { experimental_useObject as useObject } from 'ai/react'
import { PROMPT } from '../app/constants/prompt'
import Recommendation from './Recommendation'
import { moviesSchema, recommendedMoviesSchema } from '@/app/schemas/movie'
import { useEffect, useState } from 'react'
import type { Movie } from '../app/schemas/movie'

async function convertMovie (movie: any): Promise<any> {
  const res = await fetch(`/api/movie?t=${movie.Title}&y=${movie.Year}`)
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
  const auxFinalMovies: Movie[] = [
    { Title: '', Year: '', Director: '', imdbID: '', Poster: '' },
    { Title: '', Year: '', Director: '', imdbID: '', Poster: '' },
    { Title: '', Year: '', Director: '', imdbID: '', Poster: '' },
    { Title: '', Year: '', Director: '', imdbID: '', Poster: '' },
    { Title: '', Year: '', Director: '', imdbID: '', Poster: '' }
  ]
  const [isReady, setIsReady] = useState(true)

  function resetFinalMovies () {
    setFinalMovies([
      { Title: '', Year: '', Director: '', imdbID: '', Poster: '' },
      { Title: '', Year: '', Director: '', imdbID: '', Poster: '' },
      { Title: '', Year: '', Director: '', imdbID: '', Poster: '' },
      { Title: '', Year: '', Director: '', imdbID: '', Poster: '' },
      { Title: '', Year: '', Director: '', imdbID: '', Poster: '' }
    ])
  }

  useEffect(() => {
    if (!isReady) return
    setIsReady(false)
    const fetchData = async (movie: any) => {
      return await convertMovie(movie)
    }

    const pushLastModified = async (movie: any, index: number) => {
      if (index !== -1) {
        const completeMovie: any = await fetchData(movie)
        auxFinalMovies[index] = completeMovie
        setFinalMovies(prevMovies => {
          const updatedMovies = [...prevMovies]
          updatedMovies[index] = completeMovie
          return updatedMovies
        })
      }
    }

    const trackChanges = async () => {
      if (recommendedMoviesSchema.safeParse(object).success) {
        const allNew = object?.movies?.filter(
          movie =>
            auxFinalMovies.filter(
              finalMovie => finalMovie.imdbID === movie?.imdbID
            ).length === 0 && (movie?.imdbID?.length ?? 0) > 0
        )
        for (const movie of allNew ?? []) {
          const index = auxFinalMovies.findIndex(movie => movie.imdbID === '')
          await pushLastModified(movie, index).catch(error => {
            console.error(error)
          })
        }
      }
      setIsReady(true)
    }
    trackChanges().catch(error => {
      console.error(error)
    })
  }, [object])

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
