import pg from "pg"
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'relaxation_studio',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'relaxation_admin_db_2025',
  ssl: process.env.DB_SSL === 'true'
})

export async function query<T = unknown>(text: string, params?: unknown[]): Promise<{ rows: T[] }> {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return { rows: res.rows as T[] }
  } finally {
    client.release()
  }
}