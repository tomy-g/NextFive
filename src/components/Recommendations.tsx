'use client'

import { experimental_useObject as useObject } from 'ai/react'
import { PROMPT } from '../../constants/prompt'
import Recommendation from './Recommendation'
import { moviesSchema } from '@/app/schemas/movies'
import { useEffect, useState } from 'react'
import type { Movie } from '@/app/schemas/movie'

async function convertMovie (movie: any): Promise<any> {
  const res = await fetch(`/api/movie?t=${movie.title}&y=${movie.year}`)
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
        console.log(completeMovie.Title)
        console.log(index)
        setFinalMovies(prevMovies => {
          const updatedMovies = [...prevMovies]
          console.log(updatedMovies)
          updatedMovies[index] = completeMovie
          console.log(updatedMovies)
          return updatedMovies
        })
      }
    }

    const trackChanges = async () => {
      if (moviesSchema.safeParse(object).success) {
        console.log(object)
        const allNew = object?.movies?.filter(
          movie =>
            finalMovies.filter(
              finalMovie => finalMovie.imdbID === movie?.imdb_id
            ).length === 0 && (movie?.imdb_id?.length ?? 0) > 0
        )
        console.log(allNew)
        for (const movie of allNew ?? []) {
          const index = finalMovies.findIndex(movie => movie.imdbID === '')
          await pushLastModified(movie, index)
            .catch(error => {
              console.error(error)
            })
            .then(() => {})
        }
        console.log(finalMovies)
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
          resetFinalMovies()
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
