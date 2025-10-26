import { useSitemap } from '~/composables/useSeo'

export default defineEventHandler(async (event) => {
  const { generateSitemap } = useSitemap()
  
  // Set proper headers for XML sitemap
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=86400') // Cache for 24 hours
  
  try {
    const sitemap = await generateSitemap()
    return sitemap
  } catch (error) {
    console.error('Error generating sitemap:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate sitemap'
    })
  }
})
