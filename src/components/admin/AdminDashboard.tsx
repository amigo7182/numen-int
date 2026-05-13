import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, Plus, FileText, Trash2, X } from 'lucide-react';
import { clearToken, createArticle, deleteArticle, getToken, type NewArticle } from '../../lib/api';
import { useArticles } from '../../contexts/ArticlesContext';
import { categories } from '../../data/articles';

const PRIORITIES = ['high', 'medium', 'low'] as const;
const TYPES = ['Article', 'Daily Digest'] as const;

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const { articles, reload } = useArticles();

  if (!getToken()) return <Navigate to="/admin/login" replace />;

  const [type, setType] = useState<string>('Article');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState(todayIso());
  const [readTime, setReadTime] = useState('5 min read');
  const [category, setCategory] = useState('Geopolitics');
  const [priority, setPriority] = useState<string>('medium');
  const [author, setAuthor] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [content, setContent] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDelete(id: number) {
    setDeleteError(null);
    setDeletingId(id);
    try {
      await deleteArticle(id);
      setConfirmDeleteId(null);
      await reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete article';
      if (/token|auth/i.test(message)) {
        clearToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      setDeleteError(message);
    } finally {
      setDeletingId(null);
    }
  }

  function resetForm() {
    setTitle('');
    setExcerpt('');
    setDate(todayIso());
    setReadTime('5 min read');
    setCategory('Geopolitics');
    setPriority('medium');
    setAuthor('');
    setTagsInput('');
    setContent('');
    setType('Article');
  }

  function handleLogout() {
    clearToken();
    navigate('/admin/login', { replace: true });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      const payload: NewArticle = {
        type,
        title,
        excerpt,
        date,
        readTime,
        category,
        priority,
        author,
        tags,
        content,
      };
      const created = await createArticle(payload);
      setSuccess(`Published "${created.title}"`);
      resetForm();
      await reload();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create article';
      if (/token|auth/i.test(message)) {
        clearToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  const adminCategories = categories.filter((c) => c !== 'All');

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-white/90 mb-1">Admin Dashboard</h1>
            <p className="text-white/50 text-sm">
              {articles.length} article{articles.length === 1 ? '' : 's'} published.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 border border-white/10 text-white/70 hover:text-white hover:border-white/30 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-8 shadow-2xl mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-teal-400/30 bg-teal-400/10">
              <Plus className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-white/90">New Article</h2>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block md:col-span-2">
              <span className="block text-white/70 text-sm mb-2">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 placeholder:text-white/30 focus:outline-none focus:border-teal-400/50"
                placeholder="Article title"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="block text-white/70 text-sm mb-2">Excerpt</span>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
                rows={2}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 placeholder:text-white/30 focus:outline-none focus:border-teal-400/50 resize-y"
                placeholder="Short summary shown on the listing page"
              />
            </label>

            <label className="block">
              <span className="block text-white/70 text-sm mb-2">Type</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 focus:outline-none focus:border-teal-400/50"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t} className="bg-neutral-900">
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-white/70 text-sm mb-2">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 focus:outline-none focus:border-teal-400/50"
              >
                {adminCategories.map((c) => (
                  <option key={c} value={c} className="bg-neutral-900">
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-white/70 text-sm mb-2">Priority</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 focus:outline-none focus:border-teal-400/50"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p} className="bg-neutral-900">
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-white/70 text-sm mb-2">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 focus:outline-none focus:border-teal-400/50"
              />
            </label>

            <label className="block">
              <span className="block text-white/70 text-sm mb-2">Read time</span>
              <input
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 placeholder:text-white/30 focus:outline-none focus:border-teal-400/50"
                placeholder="5 min read"
              />
            </label>

            <label className="block">
              <span className="block text-white/70 text-sm mb-2">Author</span>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 placeholder:text-white/30 focus:outline-none focus:border-teal-400/50"
                placeholder="Author name"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="block text-white/70 text-sm mb-2">Tags (comma-separated)</span>
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 placeholder:text-white/30 focus:outline-none focus:border-teal-400/50"
                placeholder="Central Asia, Geopolitics, Energy"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="block text-white/70 text-sm mb-2">Content (Markdown supported)</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={14}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white/90 placeholder:text-white/30 focus:outline-none focus:border-teal-400/50 font-mono text-sm resize-y"
                placeholder={'# Heading\n\nWrite your article in Markdown…'}
              />
            </label>

            {error && (
              <div className="md:col-span-2 text-red-400 text-sm border border-red-500/30 bg-red-500/10 rounded px-3 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="md:col-span-2 text-teal-400 text-sm border border-teal-400/30 bg-teal-400/10 rounded px-3 py-2">
                {success}
              </div>
            )}

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-teal-400/20 border border-teal-400/50 text-teal-400 rounded hover:bg-teal-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Publishing…' : 'Publish article'}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-5 h-5 text-teal-400" />
            <h2 className="text-white/90">Existing articles</h2>
          </div>
          {deleteError && (
            <div className="admin-alert-error" style={{ marginBottom: '0.75rem' }}>
              {deleteError}
            </div>
          )}
          {articles.length === 0 ? (
            <p className="text-white/50 text-sm">No articles yet — be the first to publish.</p>
          ) : (
            <ul className="divide-y divide-white/10">
              {articles.map((a) => {
                const isConfirming = confirmDeleteId === a.id;
                const isDeleting = deletingId === a.id;
                return (
                  <li
                    key={a.id}
                    className="py-3 flex items-center justify-between"
                    style={{ gap: '1rem' }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        className="text-white/90"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {a.title}
                      </p>
                      <p className="text-white/40 text-xs">
                        #{a.id} · {a.category} · {a.date} · {a.author}
                      </p>
                    </div>

                    {isConfirming ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span
                          className="text-white/60"
                          style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                        >
                          Delete this article?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(a.id)}
                          disabled={isDeleting}
                          style={{
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.8rem',
                            background: 'rgba(248, 113, 113, 0.15)',
                            border: '1px solid rgba(248, 113, 113, 0.5)',
                            color: 'rgb(252, 165, 165)',
                            borderRadius: '6px',
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                            opacity: isDeleting ? 0.6 : 1,
                          }}
                        >
                          {isDeleting ? 'Deleting…' : 'Yes, delete'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          disabled={isDeleting}
                          aria-label="Cancel"
                          style={{
                            padding: '0.35rem',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                          }}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteError(null);
                          setConfirmDeleteId(a.id);
                        }}
                        aria-label={`Delete ${a.title}`}
                        title="Delete article"
                        style={{
                          padding: '0.4rem',
                          background: 'transparent',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'rgba(255, 255, 255, 0.55)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          transition: 'color 160ms ease, border-color 160ms ease, background 160ms ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = 'rgb(252, 165, 165)';
                          e.currentTarget.style.borderColor = 'rgba(248, 113, 113, 0.5)';
                          e.currentTarget.style.background = 'rgba(248, 113, 113, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}
