import { Card, Skeleton, Image } from '@nextui-org/react'
import React from 'react'
import { type CompleteMovie } from '@/app/schemas/completeMovie'

interface Props {
  movie: CompleteMovie
}

export default function Recommendation ({ movie }: Props) {
  // const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <Skeleton isLoaded={true}>
      <Card className='rounded-md'>
        <Image
          alt='NextUI hero Image'
          src={movie.poster}
          className='rounded-md'
        />
      </Card>
    </Skeleton>
  )
}
