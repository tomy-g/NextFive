import { type Movie } from '@/schemas/movie'
import placeholder from '@/assets/placeholder-min.png'
import nopicture from '@/assets/no-photo-min.png'
import NextImage from 'next/image'
import { Card, Image, CardFooter, Button } from '@nextui-org/react'
import { isFilled } from '@/utils/utils'
import { X } from 'lucide-react'

interface Props {
  movie: Movie
  deselectMovie: (movie: Movie) => void
}

export default function SelectedMovieCard ({ movie, deselectMovie }: Props) {
  return (
    <Card
      className={`rounded-md z-10 border-secondary-100 border-1 ${
        movie.Title.length > 0 ? 'hover:border-success' : ''
      } !transition-all !duration-300`}
    >
      <Image
        as={NextImage}
        priority
        alt={`${movie.Title} poster`}
        className='rounded-md aspect-[0.675/1] object-cover'
        radius='md'
        width={300}
        height={448}
        src={
          movie.Poster !== undefined &&
          movie.Poster !== 'N/A' &&
          movie.Poster.length > 0
            ? movie.Poster
            : movie.Poster === 'N/A'
              ? nopicture.src
              : placeholder.src
        }
      ></Image>
      <CardFooter className='absolute z-20 bottom-0 text-small pb-0 sm:pb-3'>
        {movie.Poster === 'N/A' ? <span>{movie.Title}</span> : null}
        {isFilled(movie)
          ? (
          <Button
            isIconOnly
            variant='light'
            radius='full'
            onClick={event => {
              event.stopPropagation()
              event.preventDefault()
            }}
            className='mx-auto max-sm:mb-2 max-sm:w-12 max-sm:h-12 !bg-background text-white !hover:bg-background opacity-75  hover:opacity-100  !important hover:text-danger '
            onPress={() => {
              deselectMovie(movie)
            }}
          >
            <X />
          </Button>
            )
          : null}
      </CardFooter>
    </Card>
  )
}
