import { query } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const { rows } = await query(`SELECT id, title, slug, content, excerpt, image, publish_date FROM public.blogs WHERE slug = $1 AND is_active = true LIMIT 1`, [slug])
  if (!rows.length) throw createError({ statusCode: 404, statusMessage: 'Blog not found' })
  return rows[0]
})