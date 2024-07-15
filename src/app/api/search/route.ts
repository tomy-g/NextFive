import { NextResponse } from 'next/server'

export async function GET (req: Request) {
  const { searchParams } = new URL(req.url)
  const apiUrl = process.env.MOVIE_API_URL
  const apiKey = process.env.MOVIES_API_KEY
  const searchTerm = searchParams.get('s')

  if (apiKey == null || searchTerm == null) {
    return NextResponse.json(
      { error: 'Missing neccesary parameters' },
      { status: 400 }
    )
  }

  const apiCall = `${apiUrl}?apikey=${apiKey}&s=${searchTerm}`

  try {
    const response = await fetch(apiCall)
    if (!response.ok) {
      throw new Error('Error obtaining movie data')
    }

    const data = await response.json()

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
