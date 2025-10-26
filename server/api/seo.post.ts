export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // In-memory mock (replace with DB later)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saved = body
  return { ok: true }
})