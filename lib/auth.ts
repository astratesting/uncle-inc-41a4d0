import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { createSession, getSessionByToken, getUserById, deleteSession } from './store';

const SALT_ROUNDS = 10;
const SESSION_COOKIE = 'uncle_session';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function setSessionCookie(userId: string): Promise<string> {
  const session = createSession(userId);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
  return session.token;
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    deleteSession(token);
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<{ id: string; email: string; name: string; companyName: string; verified: boolean } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  
  const session = getSessionByToken(token);
  if (!session) return null;
  
  const user = getUserById(session.userId);
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    companyName: user.companyName,
    verified: user.verified,
  };
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null && user.verified;
}
