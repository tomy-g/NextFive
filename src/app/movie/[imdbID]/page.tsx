'use client'
import { useEffect, useState } from 'react'
import type { Movie } from '@/schemas/movie'
import { getCompleteMovie } from '@/services/completeMovie'
import { Image, Skeleton, Link, Tooltip } from '@nextui-org/react'
import NextImage from 'next/image'
import imdb from '@/assets/IMDB.svg'
import metacritic from '@/assets/Metacritic.svg'
import rottentomatoes from '@/assets/Rotten_Tomatoes.svg'
import { Clapperboard, Tv } from 'lucide-react'
import nophoto from '@/assets/no-photo-min.png'
import { notFound } from 'next/navigation'
import Zoom from 'react-medium-image-zoom'
import '@/styles/imageModal.css'

export default function MoviePage ({ params }: { params: { imdbID: string } }) {
  const [movie, setMovie] = useState<Movie>({
    imdbID: '',
    Title: '',
    Year: '',
    Director: ''
  })
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMovie () {
      try {
        const newMovie = await getCompleteMovie({ id: params.imdbID })
        if (newMovie.error === true) {
          setError(true)
          throw new Error(newMovie.message)
        }
        setMovie(newMovie)
      } catch (error) {
        console.error(error)
      }
    }
    void loadMovie()
  }, [])

  if (error) {
    notFound()
  }

  useEffect(() => {
    if (movie.imdbID !== '') {
      setIsLoading(false)
    }
  }, [movie])

  return (
    <main className='flex mt-8 mb-8 items-start'>
      <aside className='flex flex-col items-center gap-5 w-[25%]'>
        <Skeleton isLoaded={!isLoading} className='rounded-md w-[100%]'>
          <Zoom >
          <Image
            as={NextImage}
            src={movie.Poster !== 'N/A' ? movie.Poster : nophoto.src}
            isLoading={isLoading}
            alt={`${movie.Title} poster`}
            width={300}
            className='rounded-md aspect-[0.675/1]'
            height={448}
          />
          </Zoom>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} className='rounded-md'>
          <Link
            isExternal
            showAnchorIcon
            href={`https://www.imdb.com/title/${movie?.imdbID ?? ''}`}
            className='!color-focus text-xs sm:text-lg z-50'
            underline='hover'
            color='success'
          >
            More on IMDB
          </Link>
        </Skeleton>
      </aside>
      <div id='details' className='w-[75%] ml-[5%]'>
        <Skeleton className='rounded-full' isLoaded={!isLoading}>
          <div id='title' className='flex gap-4 break-words items-end'>
            <h1 className='inline-block w-max sm:pb-4 text-3xl sm:text-5xl font-bold text-grad bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent'>
              {movie.Title}
            </h1>
            <div className='flex mr-auto'>
              <span className='sm:pb-4 text-md sm:text-2xl text-white'>{`(${movie?.Year?.split(
                '–'
              )[0].trim()})`}</span>
              {movie.Type === 'movie' && (
                <Tooltip content='Film' showArrow color='secondary'>
                  <Clapperboard
                    className='ml-4 self-center text-secondary-700 sm:mb-4'
                    size={18}
                  />
                </Tooltip>
              )}
              {movie.Type === 'series' && (
                <Tooltip content='TV Show' showArrow color='secondary'>
                  <Tv
                    className='ml-4 self-center text-secondary-700 sm:mb-4'
                    size={18}
                  />
                </Tooltip>
              )}
            </div>
          </div>
        </Skeleton>
        <Skeleton className='rounded-full w-3/4 mt-4' isLoaded={!isLoading}>
          {movie.Director !== 'N/A' && (
            <h2 id='director' className='text-focus sm:text-2xl'>
              Directed by: <span className='text-white'>{movie.Director}</span>
            </h2>
          )}
        </Skeleton>
        <Skeleton className='mt-4 rounded-full w-1/2' isLoaded={!isLoading}>
          <div
            id='scores'
            className='flex mt-2 mb-6 sm:items-center max-w-80 flex-col sm:flex-row sm:gap-8 gap-2'
          >
            {movie?.Ratings?.find(
              movie => movie.Source === 'Internet Movie Database'
            ) !== undefined && (
              <div id='imdb' className='flex items-center gap-2'>
                <Image
                  className='rounded-none'
                  as={NextImage}
                  src={imdb.src}
                  alt='IMDB'
                  width={40}
                  height={20}
                />
                <span className='text-white text-sm'>
                  {movie?.Ratings?.find(
                    movie => movie.Source === 'Internet Movie Database'
                  )?.Value ?? ''}
                </span>
              </div>
            )}
            {movie?.Ratings?.find(
              movie => movie.Source === 'Rotten Tomatoes'
            ) !== undefined && (
              <div id='rotten' className='flex items-center gap-2'>
                <Image
                  className='aspect-[19/20]'
                  src={rottentomatoes.src}
                  as={NextImage}
                  alt='Rotten Tomatoes'
                  width={19}
                  height={20}
                />
                <span className='text-white text-sm'>
                  {movie?.Ratings?.find(
                    movie => movie.Source === 'Rotten Tomatoes'
                  )?.Value ?? ''}
                </span>
              </div>
            )}
            {movie?.Ratings?.find(movie => movie.Source === 'Metacritic') !==
              undefined && (
              <div id='metacritic' className='flex items-center gap-2'>
                <Image
                  className='aspect-[87/20]'
                  src={metacritic.src}
                  as={NextImage}
                  alt='Metacritic'
                  width={87}
                  height={20}
                />
                <span className='text-white text-sm'>
                  {movie?.Ratings?.find(movie => movie.Source === 'Metacritic')
                    ?.Value ?? ''}
                </span>
              </div>
            )}
          </div>
        </Skeleton>
        <Skeleton className='mt-4 rounded-md' isLoaded={!isLoading}>
          {movie.Plot !== 'N/A' && (
            <div id='plot' className='mt-4'>
              <h3 className='text-secondary-700 w-[9ch]'>Plot:</h3>
              <p className='text-white sm:max-w-[75%]'>{movie.Plot}</p>
            </div>
          )}
          {movie.Genre !== 'N/A' && (
            <div id='genre' className='mt-4'>
              <h3 className='text-secondary-700'>Genre:</h3>
              <p className='text-white'>{movie.Genre}</p>
            </div>
          )}
          {movie.Runtime !== 'N/A' && (
            <div id='runtime' className='mt-4'>
              <h3 className='text-secondary-700'>Runtime:</h3>
              <p className='text-white'>{movie.Runtime}</p>
            </div>
          )}
          {movie.Writer !== 'N/A' && (
            <div id='writters' className='mt-4'>
              <h3 className='text-secondary-700'>Writters:</h3>
              <p className='text-white'>{movie.Writer}</p>
            </div>
          )}
          {movie.Actors !== 'N/A' && (
            <div id='cast' className='mt-4'>
              <h3 className='text-secondary-700'>Cast:</h3>
              <p className='text-white'>{movie.Actors}</p>
            </div>
          )}
          {movie.Released !== 'N/A' && (
            <div id='released' className='mt-4'>
              <h3 className='text-secondary-700'>Released:</h3>
              <p className='text-white'>{movie.Released}</p>
            </div>
          )}
          {movie.Country !== 'N/A' && (
            <div id='country' className='mt-4'>
              <h3 className='text-secondary-700'>Country:</h3>
              <p className='text-white'>{movie.Country}</p>
            </div>
          )}
          {movie.Language !== 'N/A' && (
            <div id='language' className='mt-4'>
              <h3 className='text-secondary-700'>Language:</h3>
              <p className='text-white'>{movie.Language}</p>
            </div>
          )}
          {movie.Awards !== 'N/A' && (
            <div id='awards' className='mt-4'>
              <h3 className='text-secondary-700'>Awards:</h3>
              <p className='text-white'>{movie.Awards}</p>
            </div>
          )}
        </Skeleton>
      </div>
    </main>
  )
}
