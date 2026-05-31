import { defineQuery } from 'next-sanity'

/**
 * Posts listing filtered by locale, ordered by publishedAt desc.
 * Only includes posts with a defined slug.
 */
export const postsByLocaleQuery = defineQuery(`
  *[_type == "post" && locale == $locale && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    tags,
    "coverImage": coverImage.asset->url
  }
`)

/**
 * Single post by slug (no locale filter — let the page handle that).
 * Returns the first match or null.
 */
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    locale,
    tags,
    "coverImage": coverImage.asset->url,
    body
  }
`)
