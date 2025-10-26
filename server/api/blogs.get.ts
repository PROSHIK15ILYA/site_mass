import { query } from '../utils/db'

export default defineEventHandler(async () => {
  const { rows } = await query(`SELECT id, title, slug, excerpt, image, publish_date, is_active FROM public.blogs WHERE is_active = true ORDER BY publish_date DESC LIMIT 50`)
  return rows
})