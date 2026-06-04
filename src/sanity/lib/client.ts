import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'

import { apiVersion, dataset, projectId } from '../env'

/**
 * Sanity client config builder — pure function for testability.
 * Branching: CDN + no token in production, direct + token in draft mode.
 */
export type SanityClientConfig = {
  projectId: string
  dataset: string
  apiVersion: string
  useCdn: boolean
  token?: string
  stega?: { studioUrl: string }
}

export function createClientConfig(isDraft: boolean): SanityClientConfig {
  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: !isDraft,
    token: isDraft ? process.env.SANITY_API_READ_TOKEN : undefined,
    stega: isDraft
      ? { studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333' }
      : undefined,
  }
}

/**
 * Factory: returns a Sanity client branched on draft mode.
 * Use in Server Components via `await getClient()` then `.fetch(...)`.
 */
export const getClient = async () => {
  const isDraft = (await draftMode()).isEnabled
  return createClient(createClientConfig(isDraft))
}
