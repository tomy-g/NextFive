import { NextResponse } from 'next/server'
import { movieSchema } from '@/app/schemas/movie'
export async function GET (req: Request) {
  const { searchParams } = new URL(req.url)
  const apiUrl = process.env.MOVIE_API_URL
  const apiKey = process.env.MOVIES_API_KEY
  const movieId = searchParams.get('i')
  const movieTitle = searchParams.get('t')
  const movieYear = searchParams.get('y')

  if (
    apiKey == null ||
    (movieId == null && (movieTitle == null || movieYear == null))
  ) {
    return NextResponse.json(
      { error: 'Missing neccesary parameters' },
      { status: 400 }
    )
  }

  let apiCall = `${apiUrl}?apikey=${apiKey}&t=${movieTitle}&y=${movieYear}`

  if (movieId != null) {
    apiCall = `${apiUrl}?apikey=${apiKey}&i=${movieId}`
  }

  try {
    const response = await fetch(apiCall)
    if (!response.ok) {
      throw new Error('Error obtaining movie data')
    }
    const data = await response.json()
    if (data.Response === 'False') {
      throw new Error(data.Error)
    }
    try {
      movieSchema.parse(data)
    } catch (error) {
      throw new Error('Error parsing movie data')
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: true, message: (error as Error).message },
      { status: 500 }
    )
  }
}
