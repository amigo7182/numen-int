import type { Article } from '../data/articles';

// In dev the Vite proxy forwards /api to localhost:4000.
// In prod set VITE_API_BASE_URL to the deployed backend, e.g.
// "https://numen-api.onrender.com/api".
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const TOKEN_KEY = 'numen.adminToken';

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export async function login(username: string, password: string): Promise<{ token: string; admin: { id: number; username: string } }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handle(res);
}

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${API_BASE}/articles`);
  return handle(res);
}

export async function fetchArticle(id: number): Promise<Article> {
  const res = await fetch(`${API_BASE}/articles/${id}`);
  return handle(res);
}

export type NewArticle = Omit<Article, 'id'>;

export async function createArticle(article: NewArticle): Promise<Article> {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(`${API_BASE}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });
  return handle(res);
}

export async function deleteArticle(id: number): Promise<void> {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(`${API_BASE}/articles/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }
}
