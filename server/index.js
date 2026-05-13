import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import articlesRouter from './routes/articles.js';

dotenv.config();

const app = express();

// In prod, set CORS_ORIGINS to a comma-separated list of allowed frontend
// origins (e.g. "https://numen-int.pages.dev,https://numenintelligence.com").
// In dev, fall back to allowing everything so the Vite proxy works.
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins.length ? corsOrigins : true,
  }),
);
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/articles', articlesRouter);

app.use((err, _req, res, _next) => {
  console.error('[server] unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
});
