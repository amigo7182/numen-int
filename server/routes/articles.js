import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

function rowToArticle(r) {
  return {
    id: r.id,
    type: r.type,
    title: r.title,
    excerpt: r.excerpt,
    date: r.date instanceof Date ? r.date.toISOString().slice(0, 10) : r.date,
    readTime: r.read_time,
    category: r.category,
    priority: r.priority,
    author: r.author,
    tags: r.tags || [],
    content: r.content,
  };
}

router.get('/', async (_req, res) => {
  const { rows } = await query(
    `SELECT id, type, title, excerpt, date, read_time, category, priority, author, tags, content
     FROM articles
     ORDER BY date DESC, id DESC`,
  );
  res.json(rows.map(rowToArticle));
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  const { rows } = await query(
    `SELECT id, type, title, excerpt, date, read_time, category, priority, author, tags, content
     FROM articles WHERE id = $1`,
    [id],
  );
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rowToArticle(rows[0]));
});

const ALLOWED_PRIORITIES = new Set(['high', 'medium', 'low']);

router.post('/', requireAdmin, async (req, res) => {
  const { type, title, excerpt, date, readTime, category, priority, author, tags, content } = req.body || {};

  const errors = [];
  if (typeof type !== 'string' || !type.trim()) errors.push('type');
  if (typeof title !== 'string' || !title.trim()) errors.push('title');
  if (typeof excerpt !== 'string' || !excerpt.trim()) errors.push('excerpt');
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push('date (YYYY-MM-DD)');
  if (typeof readTime !== 'string' || !readTime.trim()) errors.push('readTime');
  if (typeof category !== 'string' || !category.trim()) errors.push('category');
  if (typeof priority !== 'string' || !ALLOWED_PRIORITIES.has(priority)) errors.push('priority (high|medium|low)');
  if (typeof author !== 'string' || !author.trim()) errors.push('author');
  if (!Array.isArray(tags) || !tags.every((t) => typeof t === 'string')) errors.push('tags (string[])');
  if (typeof content !== 'string' || !content.trim()) errors.push('content');
  if (errors.length) return res.status(400).json({ error: 'Invalid fields', fields: errors });

  const { rows } = await query(
    `INSERT INTO articles (type, title, excerpt, date, read_time, category, priority, author, tags, content, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING id, type, title, excerpt, date, read_time, category, priority, author, tags, content`,
    [type, title, excerpt, date, readTime, category, priority, author, tags, content, req.admin.id],
  );
  res.status(201).json(rowToArticle(rows[0]));
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  const { rowCount } = await query('DELETE FROM articles WHERE id = $1', [id]);
  if (rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

export default router;
