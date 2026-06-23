import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface User {
  id: string;
  email: string;
  name: string;
  companyName: string;
  passwordHash: string;
  verified: boolean;
  verificationToken: string;
  createdAt: string;
  verifiedAt: string | null;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

interface Store {
  users: User[];
  sessions: Session[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

function readStore(): Store {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_PATH)) {
      const initial: Store = { users: [], sessions: [] };
      fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2));
      return initial;
    }
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw) as Store;
  } catch {
    return { users: [], sessions: [] };
  }
}

function writeStore(store: Store): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

export function createUser(email: string, name: string, companyName: string, passwordHash: string): User {
  const store = readStore();
  const existing = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('User already exists');
  }
  const user: User = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    name,
    companyName,
    passwordHash,
    verified: false,
    verificationToken: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    verifiedAt: null,
  };
  store.users.push(user);
  writeStore(store);
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  const store = readStore();
  return store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  const store = readStore();
  return store.users.find(u => u.id === id);
}

export function getUserByVerificationToken(token: string): User | undefined {
  const store = readStore();
  return store.users.find(u => u.verificationToken === token);
}

export function verifyUser(token: string): User | undefined {
  const store = readStore();
  const user = store.users.find(u => u.verificationToken === token);
  if (user && !user.verified) {
    user.verified = true;
    user.verifiedAt = new Date().toISOString();
    writeStore(store);
    return user;
  }
  return undefined;
}

export function getVerifiedUserCount(): number {
  const store = readStore();
  return store.users.filter(u => u.verified).length;
}

export function getTotalUserCount(): number {
  const store = readStore();
  return store.users.length;
}

export function getRecentSignups(limit: number = 10): Array<{ name: string; email: string; companyName: string; verified: boolean; createdAt: string }> {
  const store = readStore();
  return store.users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
    .map(u => ({
      name: u.name,
      email: u.email,
      companyName: u.companyName,
      verified: u.verified,
      createdAt: u.createdAt,
    }));
}

export function createSession(userId: string): Session {
  const store = readStore();
  store.sessions = store.sessions.filter(s => s.userId !== userId);
  const session: Session = {
    id: crypto.randomUUID(),
    userId,
    token: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
  store.sessions.push(session);
  writeStore(store);
  return session;
}

export function getSessionByToken(token: string): Session | undefined {
  const store = readStore();
  const session = store.sessions.find(s => s.token === token);
  if (session && new Date(session.expiresAt) > new Date()) {
    return session;
  }
  return undefined;
}

export function deleteSession(token: string): void {
  const store = readStore();
  store.sessions = store.sessions.filter(s => s.token !== token);
  writeStore(store);
}
