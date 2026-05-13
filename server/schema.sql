CREATE TABLE IF NOT EXISTS admins (
  id           SERIAL PRIMARY KEY,
  username     TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
  id         SERIAL PRIMARY KEY,
  type       TEXT NOT NULL,
  title      TEXT NOT NULL,
  excerpt    TEXT NOT NULL,
  date       DATE NOT NULL,
  read_time  TEXT NOT NULL,
  category   TEXT NOT NULL,
  priority   TEXT NOT NULL,
  author     TEXT NOT NULL,
  tags       TEXT[] NOT NULL DEFAULT '{}',
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by INTEGER REFERENCES admins(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
