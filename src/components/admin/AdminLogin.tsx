import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck, User } from 'lucide-react';
import { login, setToken } from '../../lib/api';

export function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await login(username.trim(), password);
      setToken(res.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-page min-h-screen flex items-center justify-center px-6 py-32">
      <div className="admin-card">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="admin-back-link"
          style={{ marginBottom: '1.25rem' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to site</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-2xl"
          style={{ overflow: 'hidden' }}
        >
          <div
            aria-hidden
            style={{
              height: '1px',
              background:
                'linear-gradient(to right, rgba(45,212,191,0), rgba(45,212,191,0.55), rgba(45,212,191,0))',
            }}
          />

          <div style={{ padding: '2.25rem 2rem 2rem' }}>
            <div className="text-center" style={{ marginBottom: '1.75rem' }}>
              <div className="admin-badge" style={{ marginBottom: '1rem' }}>
                <Lock className="w-5 h-5 text-teal-400" />
              </div>
              <h1 className="text-white/90" style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>
                Admin Sign In
              </h1>
              <p className="text-white/50" style={{ fontSize: '0.85rem' }}>
                Restricted area · Numen Intelligence
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.1rem' }}>
                <label htmlFor="admin-username" className="admin-label">
                  Username
                </label>
                <div className="admin-input-wrap">
                  <User className="admin-input-icon w-4 h-4" />
                  <input
                    id="admin-username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="admin-input"
                    placeholder="admin"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="admin-password" className="admin-label">
                  Password
                </label>
                <div className="admin-input-wrap">
                  <Lock className="admin-input-icon w-4 h-4" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="admin-input"
                    placeholder="••••••••"
                    style={{ paddingRight: '2.75rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute',
                      right: '0.625rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 0,
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.4)',
                      padding: '0.25rem',
                      borderRadius: '4px',
                    }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="admin-alert-error" style={{ marginBottom: '1rem' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="admin-btn-primary" disabled={submitting}>
                {submitting ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div
              className="text-white/40"
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Encrypted session · verified server-side</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
