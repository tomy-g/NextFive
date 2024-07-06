import { streamObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { moviesSchema } from '@/app/schemas/movies'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST (req: Request) {
  const context = await req.json()

  const result = await streamObject({
    model: openai('gpt-3.5-turbo'),
    schema: moviesSchema,
    system: 'You are a movie recommendation system. You are an expert on movies and TV series.',
    prompt: context
  })

  return result.toTextStreamResponse()
}

// export async function POST (req: Request) {
//   const { prompt }: { prompt: string } = await req.json()

//   const result = await generateObject({
//     model: openai('gpt-4-turbo'),
//     system: 'You are a movie recommendation system. You are an expert on movies and TV series.',
//     prompt,
//     schema: moviesSchema
//   })

//   return result.toJsonResponse()
// }
