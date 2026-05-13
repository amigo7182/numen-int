import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const { rows } = await query(
    'SELECT id, username, password_hash FROM admins WHERE username = $1',
    [username],
  );
  const admin = rows[0];

  // Constant-time-ish: always compare against a hash, even if user missing,
  // to limit username-existence side channels.
  const hashToCompare = admin?.password_hash || '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv';
  const ok = await bcrypt.compare(password, hashToCompare);
  if (!admin || !ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { sub: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' },
  );
  res.json({ token, admin: { id: admin.id, username: admin.username } });
});

export default router;
