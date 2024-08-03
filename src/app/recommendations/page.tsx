'use client'
import {
  Button,
  Card,
  Divider,
  Image,
  Modal,
  Link,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Skeleton,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { type Movie } from '@/schemas/movie'
import { Trash, CircleAlert } from 'lucide-react'
import NextImage from 'next/image'
import placeholder from '@/assets/placeholder-min.png'
import NextLink from 'next/link'

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <main className='mt-8'>
      <section id='prev-recommendations'>
        <div className='flex justify-between items-end gap-4 mt-1'>
          <h1 className='text-sm sm:text-lg text-secondary-500'>
            PREVIOUS RECOMMENDATIONS
          </h1>
          <Button
            className='hidden sm:flex'
            startContent={<Trash width={18} />}
            color='danger'
            size='md'
            onPress={() => {
              onOpen()
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
              onOpen()
            }}
            isDisabled={
              prevRecommendedMovies === null ||
              prevRecommendedMovies === undefined ||
              prevRecommendedMovies.length === 0
            }
          ></Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
            <ModalContent>
              {onClose => (
                <>
                  <ModalHeader className='flex flex-col gap-1 mt-2'>
                    Remove all previous recommendations
                  </ModalHeader>
                  <ModalBody>
                    <p className='mt-2 text-foreground-500'>
                      You are about to remove all previous recommendations. This
                      action cannot be undone.
                    </p>
                    <p className='mt-2 text-foreground'> Are you sure you want to continue?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color='secondary' onPress={onClose}>
                      Close
                    </Button>
                    <Button color='danger' onPress={() => { setPrevRecommendedMovies([]); onClose() }}>
                      Delete all
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Divider className='bg-secondary-500 mt-1 mb-2' />
        {loading && (
          <div className='grid grid-cols-5 sm:grid-cols-10 gap-2 list-none'>
            {[...Array(10)].map((_, index) => (
              <Skeleton className='rounded-md' key={index}>
                <div className='rounded-md aspect-[0.675/1]' />
              </Skeleton>
            ))}
          </div>
        )}

        {!loading &&
          (prevRecommendedMovies !== null &&
          prevRecommendedMovies !== undefined &&
          prevRecommendedMovies.length > 0
            ? (
            <div>
              <ul className='grid grid-cols-5 sm:grid-cols-10 gap-2 list-none'>
                {prevRecommendedMovies
                  .reverse()
                  .slice((page - 1) * 40, page * 40)
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
                        <Card className='rounded-md border-secondary-100 border-1 hover:border-success !transition-all !duration-300'>
                          <NextLink href={`/movie/${movie.imdbID}`}>
                            <Image
                              className='rounded-md aspect-[0.675/1] object-cover'
                              src={
                                movie.Poster !== 'N/A'
                                  ? movie.Poster
                                  : placeholder.src
                              }
                              alt={movie.Title}
                              as={NextImage}
                              width={100}
                              height={150}
                            />
                          </NextLink>
                        </Card>
                      </Tooltip>
                    </li>
                  ))}
              </ul>
              <div className='flex w-full mt-4 mb-4'>
                <Pagination
                  className='mx-auto'
                  showControls
                  total={Math.ceil(prevRecommendedMovies.length / 40)}
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
