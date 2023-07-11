import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { UpstashSetting } from '~~/config'

export const redis = new Redis({
  url: UpstashSetting.UPSTASH_REDIS_REST_URL,
  token: UpstashSetting.UPSTASH_REDIS_REST_TOKEN,
})

// Create a new ratelimiter, that allows 30 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '10 s'),
  analytics: true,
})
