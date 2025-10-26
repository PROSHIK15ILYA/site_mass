import { useHead } from '#imports'

type ValueLike = string | number | boolean | null | undefined
type Resolvable = ValueLike | (() => ValueLike) | { value?: ValueLike }

export interface SeoOptions {
  title?: Resolvable
  description?: Resolvable
  image?: Resolvable
  url?: Resolvable
  keywords?: Resolvable
  noindex?: boolean
}

function resolve(v: Resolvable, fallback: string): string {
  try {
    if (typeof v === 'function') return String((v as any)() ?? fallback)
    if (v && typeof v === 'object' && 'value' in (v as any)) return String((v as any).value ?? fallback)
    if (v == null) return fallback
    return String(v)
  } catch {
    return fallback
  }
}

export function useSeo(opts: SeoOptions) {
  const title = resolve(opts.title ?? '', 'Relaxation Studio — массаж и SPA')
  const description = resolve(opts.description ?? '', 'Премиальные процедуры массажа и SPA в спокойной атмосфере.')
  const image = resolve(opts.image ?? '', '/mainlogo.svg')
  const url = resolve(opts.url ?? '', 'https://relaxation-studio.ru/')
  const keywords = resolve(opts.keywords ?? '', 'массаж, спа, студия массажа, спа процедуры, тула')
  const robots = opts.noindex ? 'noindex,nofollow' : 'index,follow'

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: robots },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ],
    link: [
      { rel: 'canonical', href: url }
    ]
  })
}
