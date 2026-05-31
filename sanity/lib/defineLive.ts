import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { token } from './token'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: '2026-05-30' }),
  serverToken: token,
  browserToken: token,
})
