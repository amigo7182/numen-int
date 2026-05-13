import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// In prod, managed Postgres providers (Neon, Supabase, Render, etc.) give
// you a single DATABASE_URL. In dev we fall back to PGHOST/PGUSER/...
export const pool = process.env.DATABASE_URL
  ? new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new pg.Pool({
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT) || 5432,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    });

export async function query(text, params) {
  return pool.query(text, params);
}
