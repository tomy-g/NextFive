import { type Movie } from '@/app/schemas/movie'
import placeholder from '@/app/assets/placeholder-min.png'
import nopicture from '@/app/assets/no-photo-min.png'
import NextImage from 'next/image'
import { Card, Image, CardFooter, Button } from '@nextui-org/react'
import { isFilled } from '@/app/utils/utils'
import { X } from 'lucide-react'

interface Props {
  movie: Movie
  deselectMovie: (movie: Movie) => void
}

export default function SelectedMovieCard ({ movie, deselectMovie }: Props) {
  return (
    <Card className='rounded-md'>
      <Image
        as={NextImage}
        priority
        objectFit='cover'
        className='rounded-md aspect-[0.675/1]'
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
      <CardFooter className='absolute z-10 bottom-0 text-small pb-0 sm:pb-3'>
        {movie.Poster === 'N/A' ? <span>{movie.Title}</span> : null}
        {isFilled(movie)
          ? (
          <Button
            isIconOnly
            variant='light'
            radius='full'
            className='mx-auto opacity-75 hover:text-danger hover:opacity-100'
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