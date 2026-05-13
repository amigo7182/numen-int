import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { pool, query } from './db.js';
import { initialArticles } from './initial-articles.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function applySchema() {
  const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8');
  await query(schema);
  console.log('[seed] schema applied');
}

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    console.warn('[seed] ADMIN_USERNAME/ADMIN_PASSWORD missing — skipping admin seed');
    return;
  }
  const { rows } = await query('SELECT COUNT(*)::int AS count FROM admins');
  if (rows[0].count > 0) {
    console.log('[seed] admins table already populated — skipping');
    return;
  }
  const hash = await bcrypt.hash(password, 12);
  await query(
    'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
    [username, hash],
  );
  console.log(`[seed] admin "${username}" created`);
}

async function seedArticles() {
  const { rows } = await query('SELECT COUNT(*)::int AS count FROM articles');
  if (rows[0].count > 0) {
    console.log('[seed] articles table already populated — skipping');
    return;
  }
  for (const a of initialArticles) {
    await query(
      `INSERT INTO articles (type, title, excerpt, date, read_time, category, priority, author, tags, content)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [a.type, a.title, a.excerpt, a.date, a.readTime, a.category, a.priority, a.author, a.tags, a.content],
    );
  }
  console.log(`[seed] inserted ${initialArticles.length} initial articles`);
}

async function main() {
  try {
    await applySchema();
    await seedAdmin();
    await seedArticles();
    console.log('[seed] done');
  } catch (err) {
    console.error('[seed] failed:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
