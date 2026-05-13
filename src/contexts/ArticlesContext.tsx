import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchArticles } from '../lib/api';
import type { Article } from '../data/articles';

interface ArticlesContextValue {
  articles: Article[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextValue | null>(null);

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <ArticlesContext.Provider value={{ articles, loading, error, reload }}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error('useArticles must be used inside ArticlesProvider');
  return ctx;
}
