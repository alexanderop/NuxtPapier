import type { H3Event } from 'h3'
import { tryCatch } from '~/utils/tryCatch'
import { generateFeed } from '../utils/feedGenerator'

export default defineEventHandler(async (event: H3Event) => {
  const result = await tryCatch(generateFeed(event))

  if (result.error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate Atom feed',
    })
  }

  const atomString = result.data.atom1()

  event.node.res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8')
  event.node.res.setHeader('Cache-Control', 'max-age=3600') // Cache for 1 hour
  return atomString
})
