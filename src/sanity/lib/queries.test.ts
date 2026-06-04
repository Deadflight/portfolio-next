jest.mock('next-sanity', () => ({
  defineQuery: jest.fn(<T>(s: T) => s),
}))

import { postBySlugQuery, postsByLocaleQuery } from './queries'

describe('postBySlugQuery', () => {
  it('filters by both slug.current and locale', () => {
    expect(postBySlugQuery).toContain('slug.current == $slug')
    expect(postBySlugQuery).toContain('locale == $locale')
  })

  it('returns the first match as a single object', () => {
    expect(postBySlugQuery).toContain('[0]')
  })

  it('includes body field for detail rendering', () => {
    expect(postBySlugQuery).toContain('body')
  })
})

describe('postsByLocaleQuery', () => {
  it('filters by locale and requires defined slug', () => {
    expect(postsByLocaleQuery).toContain('locale == $locale')
    expect(postsByLocaleQuery).toContain('defined(slug.current)')
  })

  it('orders by publishedAt descending', () => {
    expect(postsByLocaleQuery).toContain('| order(publishedAt desc)')
  })

  it('does NOT include body field (listing only)', () => {
    expect(postsByLocaleQuery).not.toContain('body')
  })
})
