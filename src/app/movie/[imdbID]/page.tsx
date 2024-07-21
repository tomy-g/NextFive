'use client'
import { useEffect, useState } from 'react'
import type { Movie } from '@/app/schemas/movie'
import { getCompleteMovie } from '@/app/services/completeMovie'
import { Image, Skeleton, Link, Tooltip } from '@nextui-org/react'
import NextImage from 'next/image'
import imdb from '@/app/assets/IMDB.svg'
import metacritic from '@/app/assets/Metacritic.svg'
import rottentomatoes from '@/app/assets/Rotten_Tomatoes.svg'
import { Clapperboard, Tv } from 'lucide-react'
export default function MoviePage ({ params }: { params: { imdbID: string } }) {
  const [movie, setMovie] = useState<Movie>({
    imdbID: '',
    Title: '',
    Year: '',
    Director: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMovie () {
      try {
        const newMovie = await getCompleteMovie({ id: params.imdbID })
        setMovie(newMovie)
      } catch (error) {
        console.error(error)
      }
    }
    void loadMovie()
  }, [])

  useEffect(() => {
    if (movie.imdbID !== '') {
      setIsLoading(false)
    }
  }, [movie])

  return (
    <main className='flex mt-16 items-start'>
      <aside className='flex flex-col items-center gap-5 w-[25%]'>
        <Skeleton isLoaded={!isLoading} className='rounded-md'>
          <Image
            as={NextImage}
            src={movie.Poster}
            width={300}
            className='rounded-md aspect-[0.675/1]'
            height={448}
          />
        </Skeleton>
        <Link
          isExternal
          showAnchorIcon
          href={`https://www.imdb.com/title/${movie.imdbID}`}
          className='!color-focus'
          underline='hover'
          color='success'
        >
          More on IMDB
        </Link>
      </aside>
      <div id='details' className='w-[75%] ml-[5%]'>
        <div id='title' className='flex items-end mb-2'>
          <h1 className='pb-4 text-5xl font-bold text-grad bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent'>
            {movie.Title}
          </h1>
          <span className='pb-4 text-2xl text-white ml-4'>{`(${movie.Year.split(
            '–'
          )[0].trim()})`}</span>
          { movie.Type === 'movie' && (
            <Tooltip content='Film' showArrow color='secondary'>
              <Clapperboard className='ml-4 self-center text-secondary-700' size={18} />
            </Tooltip>
          )}
          { movie.Type === 'series' && (
            <Tooltip content='TV Show' showArrow color='secondary'>
              <Tv className='ml-4 self-center text-secondary-700' size={18} />
            </Tooltip>
          )}

        </div>
        {movie.Director !== 'N/A' && (
          <h2 id='director' className='text-focus text-2xl'>
            Directed by: <span className='text-white'>{movie.Director}</span>
          </h2>
        )}
        <div id='scores' className='flex mt-6 mb-6 items-center gap-8'>
          {movie?.Ratings?.find(
            movie => movie.Source === 'Internet Movie Database'
          ) !== undefined && (
            <div id='imdb' className='flex items-center gap-2'>
              <Image
                className='rounded-none'
                as={NextImage}
                src={imdb.src}
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
          {movie?.Ratings?.find(movie => movie.Source === 'Rotten Tomatoes') !==
            undefined && (
            <div id='rotten' className='flex items-center gap-2'>
              <Image
                className='aspect-[19/20]'
                src={rottentomatoes.src}
                as={NextImage}
                width={19}
                height={20}
              />
              <span className='text-white text-sm'>
                {movie?.Ratings?.find(movie => movie.Source === 'Rotten Tomatoes')
                  ?.Value ?? ''}
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
        <div id='plot' className='mt-4'>
          <h3 className='text-secondary-700 w-[9ch]'>Plot:</h3>
          <p className='text-white max-w-[75%]'>{movie.Plot}</p>
        </div>
        <div id='genre' className='mt-4'>
          <h3 className='text-secondary-700 w-[9ch]'>Genre:</h3>
          <p className='text-white'>{movie.Genre}</p>
        </div>
        <div id='runtime' className='mt-4'>
          <h3 className='text-secondary-700 w-[9ch]'>Runtime:</h3>
          <p className='text-white'>{movie.Runtime}</p>
        </div>
        <div id='writters' className='mt-4'>
          <h3 className='text-secondary-700 w-[9ch]'>Writters:</h3>
          <p className='text-white'>{movie.Writer}</p>
        </div>
        <div id='cast' className='mt-4'>
          <h3 className='text-secondary-700 w-[9ch]'>Cast:</h3>
          <p className='text-white'>{movie.Actors}</p>
        </div>
        <div id='country' className='mt-4'>
          <h3 className='text-secondary-700 w-[9ch]'>Country:</h3>
          <p className='text-white'>{movie.Country}</p>
        </div>
        <div id='language' className='mt-4'>
          <h3 className='text-secondary-700 w-[9ch]'>Language:</h3>
          <p className='text-white'>{movie.Language}</p>
        </div>
        <div id='awards' className='mt-4'>
          <h3 className='text-secondary-700 w-[9ch]'>Awards:</h3>
          <p className='text-white'>{movie.Awards}</p>
        </div>
      </div>
    </main>
  )
}
