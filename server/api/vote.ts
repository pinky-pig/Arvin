import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '../redis'

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})

export default defineEventHandler(async (event) => {
  const value = await redis.get<number[]>('vote')
  if (!value)
    await redis.set('vote', [0, 0, 0, 0])

  // todo: add ip ratelimit : await ratelimit.limit(getKey(id) + `_${req.ip ?? ''}`)
  const { success } = await ratelimit.limit('vote')
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
    })
  }
  return value ?? [0, 0, 0, 0]
})
