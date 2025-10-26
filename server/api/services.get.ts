import { query } from '../utils/db'

export default defineEventHandler(async () => {
  try {
    const { rows } = await query(`SELECT id, title, slug, image FROM public.services WHERE is_active = true ORDER BY id ASC`)
    return rows
  } catch (e: any) {
    console.error('services.get error', e)
    throw createError({ statusCode: 500, statusMessage: 'Failed to load services' })
  }
})