// Comprehensive SEO composable with structured data and dynamic meta tags
import { useHead } from '#app'

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'service'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  price?: number
  currency?: string
  availability?: 'in stock' | 'out of stock' | 'preorder'
  rating?: {
    value: number
    count: number
  }
  breadcrumbs?: Array<{
    name: string
    url: string
  }>
  faq?: Array<{
    question: string
    answer: string
  }>
  organization?: {
    name: string
    url: string
    logo: string
    description: string
    address?: {
      street: string
      city: string
      region: string
      postalCode: string
      country: string
    }
    contactPoint?: {
      telephone: string
      contactType: string
      email?: string
    }
  }
}

export const useSeo = (config: SEOConfig = {}) => {
  const runtimeConfig = useRuntimeConfig()
  const route = useRoute()
  
  // Default values
  const siteUrl = runtimeConfig.public.siteUrl || 'https://relaxation-studio.ru'
  const siteName = 'Relaxation Studio'
  const siteDescription = 'Премиальная студия массажа и SPA в Туле. Профессиональные терапевты, современное оборудование, расслабляющая атмосфера.'
  
  // Generate canonical URL
  const canonicalUrl = config.url || `${siteUrl}${route.path}`
  
  // Generate meta title
  const title = config.title 
    ? `${config.title} | ${siteName}`
    : `${siteName} — Массаж и SPA в Туле`
  
  // Generate meta description
  const description = config.description || siteDescription
  
  // Generate keywords
  const keywords = [
    'массаж',
    'спа',
    'релаксация',
    'Тула',
    'массаж Тула',
    'спа Тула',
    'студия массажа',
    'профессиональный массаж',
    'расслабляющий массаж',
    'лечебный массаж',
    'косметология',
    'уход за телом',
    ...(config.keywords || [])
  ].join(', ')
  
  // Generate Open Graph image
  const ogImage = config.image || `${siteUrl}/og-image.jpg`
  
  // Generate structured data
  const generateStructuredData = () => {
    const structuredData: any = {
      '@context': 'https://schema.org',
      '@graph': []
    }
    
    // Organization
    if (config.organization) {
      structuredData['@graph'].push({
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: config.organization.name,
        url: config.organization.url,
        logo: {
          '@type': 'ImageObject',
          url: config.organization.logo
        },
        description: config.organization.description,
        ...(config.organization.address && {
          address: {
            '@type': 'PostalAddress',
            ...config.organization.address
          }
        }),
        ...(config.organization.contactPoint && {
          contactPoint: {
            '@type': 'ContactPoint',
            ...config.organization.contactPoint
          }
        })
      })
    }
    
    // Website
    structuredData['@graph'].push({
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: {
        '@id': `${siteUrl}/#organization`
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    })
    
    // WebPage
    const webPage: any = {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}/#webpage`,
      url: canonicalUrl,
      name: title,
      description: description,
      isPartOf: {
        '@id': `${siteUrl}/#website`
      },
      about: {
        '@id': `${siteUrl}/#organization`
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: ogImage
      }
    }
    
    // Add breadcrumbs if provided
    if (config.breadcrumbs && config.breadcrumbs.length > 0) {
      webPage.breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: config.breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
    }
    
    structuredData['@graph'].push(webPage)
    
    // Article/Service specific data
    if (config.type === 'article') {
      structuredData['@graph'].push({
        '@type': 'Article',
        '@id': `${canonicalUrl}/#article`,
        headline: config.title,
        description: description,
        image: ogImage,
        datePublished: config.publishedTime,
        dateModified: config.modifiedTime || config.publishedTime,
        author: {
          '@type': 'Person',
          name: config.author || siteName
        },
        publisher: {
          '@id': `${siteUrl}/#organization`
        },
        mainEntityOfPage: {
          '@id': `${canonicalUrl}/#webpage`
        }
      })
    } else if (config.type === 'service') {
      const service: any = {
        '@type': 'Service',
        '@id': `${canonicalUrl}/#service`,
        name: config.title,
        description: description,
        image: ogImage,
        provider: {
          '@id': `${siteUrl}/#organization`
        },
        areaServed: {
          '@type': 'City',
          name: 'Тула'
        },
        serviceType: 'Массаж и SPA услуги'
      }
      
      if (config.price) {
        service.offers = {
          '@type': 'Offer',
          price: config.price,
          priceCurrency: config.currency || 'RUB',
          availability: `https://schema.org/${config.availability || 'InStock'}`
        }
      }
      
      if (config.rating) {
        service.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: config.rating.value,
          reviewCount: config.rating.count
        }
      }
      
      structuredData['@graph'].push(service)
    }
    
    // FAQ if provided
    if (config.faq && config.faq.length > 0) {
      structuredData['@graph'].push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}/#faq`,
        mainEntity: config.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      })
    }
    
    return structuredData
  }
  
  // Set head meta tags
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: config.author || siteName },
      
      // Open Graph
      { property: 'og:type', content: config.type || 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'ru_RU' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      
      // Additional meta tags
      { name: 'theme-color', content: '#4A90A4' },
      { name: 'msapplication-TileColor', content: '#4A90A4' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: siteName },
      
      // Article specific
      ...(config.type === 'article' && config.publishedTime ? [
        { property: 'article:published_time', content: config.publishedTime },
        { property: 'article:modified_time', content: config.modifiedTime || config.publishedTime },
        { property: 'article:author', content: config.author || siteName },
        { property: 'article:section', content: config.section || 'Массаж и SPA' }
      ] : []),
      
      // Service specific
      ...(config.type === 'service' && config.price ? [
        { property: 'product:price:amount', content: config.price.toString() },
        { property: 'product:price:currency', content: config.currency || 'RUB' },
        { property: 'product:availability', content: config.availability || 'in stock' }
      ] : [])
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'alternate', hreflang: 'ru', href: canonicalUrl },
      { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(generateStructuredData())
      }
    ]
  })
  
  return {
    title,
    description,
    canonicalUrl,
    structuredData: generateStructuredData()
  }
}

// Sitemap generation utility
export const useSitemap = () => {
  const generateSitemap = async () => {
    const routes = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/services', priority: 0.9, changefreq: 'monthly' },
      { url: '/about', priority: 0.8, changefreq: 'monthly' },
      { url: '/gallery', priority: 0.7, changefreq: 'weekly' },
      { url: '/reviews', priority: 0.7, changefreq: 'weekly' },
      { url: '/contact', priority: 0.8, changefreq: 'monthly' },
      { url: '/blog', priority: 0.6, changefreq: 'weekly' },
      { url: '/faq', priority: 0.6, changefreq: 'monthly' },
      { url: '/booking', priority: 0.9, changefreq: 'daily' }
    ]
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://relaxation-studio.ru${route.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`
    
    return sitemap
  }
  
  return {
    generateSitemap
  }
}