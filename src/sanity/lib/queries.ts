import { defineQuery } from 'next-sanity'

/**
 * Posts listing filtered by locale, ordered by publishedAt desc.
 * Only includes posts with a defined slug.
 * UNCHANGED — already filters by locale.
 */
export const postsByLocaleQuery = defineQuery(`
  *[_type == "post" && locale == $locale && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    tags,
    "coverImage": coverImage{asset, alt}
  }
`)

/**
 * Single post by slug AND locale.
 * Returns the first match or null.
 * FIXED: Added `&& locale == $locale` to prevent cross-locale data leaks.
 */
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    locale,
    tags,
    "coverImage": coverImage{asset, alt},
    body
  }
`)
