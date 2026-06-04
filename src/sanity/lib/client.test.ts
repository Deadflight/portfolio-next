jest.mock('next-sanity', () => ({
  createClient: jest.fn((config) => config),
}))

import { createClientConfig } from './client'

const ORIGINAL_ENV = process.env

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV }
})

afterEach(() => {
  process.env = ORIGINAL_ENV
})

describe('createClientConfig', () => {
  it('returns CDN config when NOT in draft mode', () => {
    const config = createClientConfig(false)

    expect(config.useCdn).toBe(true)
    expect(config.token).toBeUndefined()
    expect(config.stega).toBeUndefined()
  })

  it('returns direct API config with token when in draft mode', () => {
    process.env.SANITY_API_READ_TOKEN = 'test-token-123'
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL = 'https://my-studio.sanity.studio'

    const config = createClientConfig(true)

    expect(config.useCdn).toBe(false)
    expect(config.token).toBe('test-token-123')
    expect(config.stega).toBeDefined()
    expect(config.stega?.studioUrl).toBe('https://my-studio.sanity.studio')
  })

  it('uses default studio URL when env var is not set in draft mode', () => {
    process.env.SANITY_API_READ_TOKEN = 'test-token-123'
    delete process.env.NEXT_PUBLIC_SANITY_STUDIO_URL

    const config = createClientConfig(true)

    expect(config.stega?.studioUrl).toBe('http://localhost:3333')
  })

  it('provides projectId, dataset, and apiVersion in all modes', () => {
    const config = createClientConfig(false)

    expect(config.projectId).toBeDefined()
    expect(config.dataset).toBeDefined()
    expect(config.apiVersion).toBeDefined()
  })
})
