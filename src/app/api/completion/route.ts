import { streamObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { kv } from '@vercel/kv'
import { Ratelimit } from '@upstash/ratelimit'
import { moviesSchema } from '@/app/schemas/movie'
import { type NextRequest } from 'next/server'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST (req: NextRequest) {
  let ratelimit: Ratelimit | null = null
  const { searchParams } = new URL(req.url)
  const apiKey = searchParams.get('api_key')
  const openai = createOpenAI({ apiKey: apiKey !== '' ? apiKey ?? undefined : process.env.OPENAI_API_KEY })
  if (process.env.LIMIT_ACTIVE === 'true' && process.env.USER_API_KEY !== '') {
    // Create Rate limit
    ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.fixedWindow(5, '12 h'),
    })
  }
  if (ratelimit !== null) {
    // call ratelimit with request ip
    const { success } = await ratelimit.limit('ip-address')
    // block the request if unsuccessfull
    if (!success) {
      return new Response('Ratelimited!', { status: 429 })
    }
  }
  const context = await req.json()
  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: moviesSchema,
    system: 'You are a movie recommendation system. You are an expert on movies and TV series.',
    prompt: context,
    temperature: 0
  })

  // if (typeof result.object === 'undefined') {
  //   return new Response('Error', { status: 500 })
  // }

  return result.toTextStreamResponse()
}
