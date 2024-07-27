'use client'
import {
  Button,
  Card,
  Divider,
  Image,
  Link,
  Pagination,
  Skeleton,
  Tooltip
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { type Movie } from '../schemas/movie'
import { Trash, CircleAlert } from 'lucide-react'
import NextImage from 'next/image'
import placeholder from '@/app/assets/placeholder-min.png'

export default function Recommendations () {
  const [prevRecommendedMovies, setPrevRecommendedMovies] = useState<Movie[]>(
    []
  )
  const [prevRecommendedMoviesDB, setPrevRecommendedMoviesDB] = useLocalStorage(
    'prevRecommendedMovies',
    []
  )
  useEffect(() => {
    setPrevRecommendedMovies([...prevRecommendedMoviesDB])
    setLoading(false)
  }, [])
  useEffect(() => {
    setPrevRecommendedMoviesDB([...prevRecommendedMovies])
  }, [prevRecommendedMovies])

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  return (
    <main className='mt-8'>
      <section id='prev-recommendations'>
        <div className='flex justify-between items-end gap-4 mt-1'>
          <h1 className='text-sm sm:text-lg text-secondary-500'>
            PREVIOUS RECOMMENDATIONS
          </h1>
          <Button
            className='hidden sm:flex'
            startContent={<Trash width={20} />}
            color='danger'
            size='sm'
            onPress={() => {
              setPrevRecommendedMovies([])
            }}
            isDisabled={
              prevRecommendedMovies === null ||
              prevRecommendedMovies === undefined ||
              prevRecommendedMovies.length === 0
            }
          >
            Remove all
          </Button>
          <Button
            className='flex sm:hidden'
            startContent={<Trash width={16} />}
            isIconOnly
            color='danger'
            size='sm'
            onPress={() => {
              setPrevRecommendedMovies([])
            }}
            isDisabled={
              prevRecommendedMovies === null ||
              prevRecommendedMovies === undefined ||
              prevRecommendedMovies.length === 0
            }
          >
          </Button>
        </div>
        <Divider className='bg-secondary-500 mt-1 mb-2' />
        {loading && (
          <div className='grid grid-cols-5 sm:grid-cols-10 gap-2 list-none'>
          {[...Array(10)].map((_, index) => (
                  <Skeleton className='rounded-md' key={index}>
                      <Image
                        radius='sm'
                        className='rounded-md aspect-[0.675/1]'
                        objectFit='cover'
                        as={NextImage}
                        src=''
                        alt='loading'
                        width={100}
                        height={150}
                      />
                  </Skeleton>
          ))}
        </div>)}

        {!loading && (
          prevRecommendedMovies !== null &&
          prevRecommendedMovies !== undefined &&
          prevRecommendedMovies.length > 0
            ? (
            <div>
              <ul className='grid grid-cols-5 sm:grid-cols-10 gap-2 list-none'>
                {prevRecommendedMovies.reverse()
                  .slice((page - 1) * 50, page * 50)
                  .map((movie: Movie, index: number) => (
                    <li key={movie.imdbID}>
                      <Tooltip
                        showArrow={true}
                        content={
                          <p>
                            <span>{movie.Title}</span>
                            <span className='text-tiny'>{` (${movie.Year})`}</span>
                          </p>
                        }
                        placement='top'
                        className=''
                        color='secondary'
                        isDisabled={
                          movie.Title.length < 1 ||
                          movie.State === 'loading' ||
                          movie.State === 'error'
                        }
                      >
                        <Card radius='sm'>
                          <Link href={`/movie/${movie.imdbID}`}>
                            <Image
                              radius='sm'
                              className='rounded-md aspect-[0.675/1]'
                              objectFit='cover'
                              src={movie.Poster !== 'N/A' ? movie.Poster : placeholder.src}
                              alt={movie.Title}
                              as={NextImage}
                              width={100}
                              height={150}
                            />
                          </Link>
                        </Card>
                      </Tooltip>
                    </li>
                  ))}
              </ul>
              <div className='flex w-full mt-4 mb-4'>
                <Pagination
                  className='mx-auto'
                  showControls
                  total={Math.ceil(prevRecommendedMovies.length / 50)}
                  onChange={page => {
                    setPage(page)
                  }}
                  initialPage={page}
                  classNames={{ cursor: 'text-black ' }}
                />
              </div>
            </div>
              )
            : (
            <div className='mt-16 flex gap-2 justify-center'>
              <CircleAlert />
              <p>
                No previous recommendations,{' '}
                <Link href='/' underline='always'>
                  get started by selecting a movie you like.
                </Link>
              </p>
            </div>
              ))}
      </section>
    </main>
  )
}
