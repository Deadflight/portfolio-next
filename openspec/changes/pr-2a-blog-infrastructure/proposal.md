# Proposal: PR 2A — Blog Code Infrastructure

**Issue**: [#76](https://github.com/Deadflight/portfolio-next/issues/76) | **Lines**: ~420 | **Base**: `main` | **Risk**: Medium
**CMS**: Sanity (Free tier) | **Content**: Headless CMS + Server Components

## Intent

Add blog listing + detail pages with EN/ES i18n powered by **Sanity CMS**. Code infra only — articles start in PR 2B.

## Scope

| In | Out |
|----|-----|
| Sanity schema (`post` for EN/ES) | Sample articles (PR 2B) |
| Sanity client + GROQ queries | RSS, search, tags (PR 2cii) |
| Listing + detail page under `[locale]/blog/` | OpenGraph per article (PR 2B) |
| @portabletext/react with custom components | Comments, pagination |
| i18n keys + nav link | Embedded Studio at `/studio` |

## Approach

Sanity CMS on Free tier (20 seats, 10K docs, 100GB assets — sobra para un portfolio), queried via `next-sanity` in Server Components, rendered with `@portabletext/react`. No CMS embedded in this PR — solo el cliente de lectura.

### Schema Design

Un solo tipo `post` con campo `locale` para filtrar:

```ts
// sanity/schemas/post.ts
export const post = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', type: 'text', rows: 3 },
    { name: 'body', type: 'blockContent' }, // Portable Text
    { name: 'publishedAt', type: 'datetime' },
    { name: 'locale', type: 'string', options: { list: ['en', 'es'] } },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'title', locale: 'locale' },
    prepare({ title, locale }: { title: string; locale: string }) {
      return { title, subtitle: locale?.toUpperCase() }
    },
  },
}
```

## Key Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| **CMS vs MDX** | **Sanity CMS** | Estrategia de 1 post/semana. CMS permite escribir desde cualquier lado, rich text, imágenes optimizadas, drafts sin commitear |
| **Rendering** | `next-sanity` + `@portabletext/react` | SDK oficial, tipado con `defineQuery`, compatible con Server Components |
| **i18n approach** | Campo `locale` en cada post | Un solo dataset, un schema, filtro en GROQ |
| **Draft mode** | `draftMode()` de Next.js | Drafts visibles solo en preview, nunca en producción |
| **Revalidation** | On-demand vía webhook | Sanity → webhook → `revalidatePath('/blog')` — actualización instantánea en Vercel |
| **Studio** | No embebido en este PR | Se deploya aparte con `npx sanity deploy`. Se puede embeber después en `/studio` |
| **Nav link** | Ruta real `/blog` | Primera ruta real del proyecto, no un anchor `#` |
| **Free tier** | Suficiente para portfolio | 20 users, 10K documentos, 100GB assets, 1M CDN reqs/mes — todo sobra |

## Sanity Integration Architecture

```
sanity.io (hosted CMS)
    │
    ├── Sanity Studio (deployed via sanity deploy)
    │     └── Editors create/edit posts (EN/ES)
    │
    ├── GROQ API
    │     └── next-sanity/client.fetch() en Server Components
    │
    └── Webhook (on publish)
          └── POST /api/revalidate → revalidatePath('/blog')
```

### File Structure

```
sanity/
  schemas/
    post.ts            # Blog post schema
    blockContent.ts    # Portable Text block schema
  lib/
    client.ts          # createClient config
    queries.ts         # GROQ queries (listing, bySlug)
    token.ts           # SANITY_API_READ_TOKEN export
  sanity.config.ts     # Studio config
  sanity.cli.ts        # CLI config
```

## Affected Areas

### New Files
| File | Purpose |
|------|---------|
| `sanity/schemas/post.ts` | Blog post schema definition |
| `sanity/schemas/blockContent.ts` | Portable Text block schema |
| `sanity/lib/client.ts` | Sanity client config |
| `sanity/lib/queries.ts` | GROQ queries |
| `sanity/lib/token.ts` | Read token export |
| `sanity/sanity.config.ts` | Studio config |
| `sanity/sanity.cli.ts` | CLI config |
| `src/app/[locale]/blog/page.tsx` | Blog listing page (Server Component) |
| `src/app/[locale]/blog/[slug]/page.tsx` | Blog detail page (Server Component, `generateStaticParams`) |
| `src/app/[locale]/blog/[slug]/not-found.tsx` | 404 for unknown slugs |
| `src/app/components/blog/PostCard.tsx` | Blog post card for listing |
| `src/app/components/blog/PostBody.tsx` | Portable Text renderer with custom components |
| `src/app/api/revalidate/route.ts` | Webhook handler for Sanity |

### Modified Files
| File | Change |
|------|--------|
| `package.json` | Add `next-sanity`, `@portabletext/react` |
| `.env.local.example` | Add Sanity env vars |
| `messages/{en,es}.json` | Add `blog.*` keys |
| `src/shared/components/Navigation/Navigation.tsx` | Add Blog nav link |
| `src/app/layout.tsx` | Add `SanityLive` component for live preview |

## Implementation Plan (8 tasks)

### Task 1: Sanity project + schema
- Crear proyecto en sanity.io (free tier)
- `npx sanity init` en el repo
- Instalar `next-sanity` + `@portabletext/react`
- Definir schema `post` + `blockContent`
- Configurar `sanity.config.ts` + `sanity.cli.ts`

### Task 2: Sanity client + queries
- `sanity/lib/client.ts` con `createClient`
- `sanity/lib/token.ts` para read token
- `sanity/lib/queries.ts` con GROQ queries:
  - `postsByLocaleQuery` (listing, filtrado por locale)
  - `postBySlugQuery` (detalle)
- Tipado con `defineQuery` + inferencia

### Task 3: Blog listing page
- `src/app/[locale]/blog/page.tsx`
- Server Component async, `getLocale()` → filtra posts por locale
- `revalidate = 60` como fallback ISR
- Lista `<PostCard>` con title, description, date, tags
- Empty state si no hay posts

### Task 4: Blog detail page
- `src/app/[locale]/blog/[slug]/page.tsx`
- `generateStaticParams` para SSG de slugs conocidos
- `notFound()` si slug no existe
- `generateMetadata` para SEO (title, description, openGraph)
- Render `<PostBody>` con `@portabletext/react`

### Task 5: PostBody + custom components
- `src/app/components/blog/PostBody.tsx`
- Custom components para Portable Text:
  - headings con anchor links
  - code blocks con syntax highlight
  - images desde Sanity CDN (con `next-sanity/image`)
  - links (target _blank para externos)
  - blockquote

### Task 6: Webhook revalidation
- `src/app/api/revalidate/route.ts`
- Valida `x-webhook-secret`
- `revalidatePath('/blog')`
- Configurar webhook en Sanity dashboard

### Task 7: Nav + i18n keys
- `messages/{en,es}.json`: namespace `blog` con keys `title`, `readMore`, `publishedAt`, `backToBlog`, `notFound`
- `Navigation.tsx`: link a `/blog` (real route)

### Task 8: E2E tests
- Blog navigation flow
- Blog listing renders posts
- Blog detail renders content
- 404 for unknown slugs

## Env Vars Required

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=skxxx
SANITY_WEBHOOK_SECRET=xxx   # optional, for on-demand revalidation
```

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Sanity API rate limits en free tier | Low | 1M CDN reqs/mes — portfolio no llega ni a 10K |
| CORS errors en dev | Low | Agregar `http://localhost:3000` en Sanity API settings |
| Draft content leak en prod | Medium | `useCdn: true` por defecto; solo draft con `draftMode()` + token |
| Sanity schema migration | Low | Schema v1 es simple; agregar campos no es breaking |
| Studio build time | Low | Studio se deploya aparte, no afecta build del frontend |

## Rollback Plan

`git revert` del commit. Revocar tokens de Sanity. Borrar proyecto Sanity si es necesario.

## Success Criteria

- [ ] `npm run build` + `npm test` pass
- [ ] `GET /blog = 200` con posts del locale actual
- [ ] `GET /en/blog` y `GET /es/blog` muestran posts filtrados por locale
- [ ] `GET /blog/[slug] = 200` renderiza Portable Text con custom components
- [ ] `GET /blog/unknown-slug = 404`
- [ ] Nav "Blog" link navega a `/blog`
- [ ] Webhook revalidation: publicar en Sanity → sitio actualizado en segundos
- [ ] E2E: blog nav, listing, detail, 404 flows
