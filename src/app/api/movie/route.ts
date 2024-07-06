import { NextResponse } from 'next/server'
import MovieSchema from '../../schemas/movie'

export async function GET (req: Request) {
  const { searchParams } = new URL(req.url)
  const apiKey = process.env.MOVIES_API_KEY
  const movieId = searchParams.get('i')

  if ((apiKey == null) || (movieId == null)) {
    return NextResponse.json(
      { error: 'Missing neccesary parameters' },
      { status: 400 }
    )
  }

  const apiUrl = `${process.env.MOVIE_API_URL}?apikey=${apiKey}&i=${movieId}`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Error obtaining movie data')
    }

    const data = await response.json()
    MovieSchema.parse(data)

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
