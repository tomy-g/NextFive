import { streamObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { kv } from '@vercel/kv'
import { Ratelimit } from '@upstash/ratelimit'
import { moviesSchema } from '@/app/schemas/movie'
import { type NextRequest } from 'next/server'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Create Rate limit
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(5, '30s'),
})

export async function POST (req: NextRequest) {
  // call ratelimit with request ip
  const ip = req.ip ?? 'ip'
  const { success } = await ratelimit.limit(ip)
  // block the request if unsuccessfull
  if (!success) {
    return new Response('Ratelimited!', { status: 429 })
  }

  const context = await req.json()
  const result = await streamObject({
    model: openai('gpt-3.5-turbo'),
    schema: moviesSchema,
    system: 'You are a movie recommendation system. You are an expert on movies and TV series.',
    prompt: context,
    temperature: 0
  })

  return result.toTextStreamResponse()
}
