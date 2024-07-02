import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { moviesSchema } from '@/app/schemas/movies'

export async function POST (req: Request) {
  const { prompt }: { prompt: string } = await req.json()

  const result = await generateObject({
    model: openai('gpt-4-turbo'),
    system: 'You are a movie recommendation system. You are an expert on movies and TV series.',
    prompt,
    schema: moviesSchema
  })

  return result.toJsonResponse()
}
