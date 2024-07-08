import { Card, Skeleton, Image } from '@nextui-org/react'
import React from 'react'

interface Props {
  movie?: any
}

export default function Recommendation ({ movie }: Props) {
  // const [isLoaded, setIsLoaded] = React.useState(false)
  return (
    <Skeleton isLoaded={movie.Poster.length > 0}>
      <Card className='rounded-md'>
        <Image
          alt='NextUI hero Image'
          src={movie.Poster}
          className='rounded-md'
          width={300}
          height={445}
        />
      </Card>
    </Skeleton>
  )
}
