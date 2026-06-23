import { cookies } from "next/headers";
import { readJSON, writeJSON } from "./store";
import { generateToken } from "./password";

const COOKIE_NAME = "uncle_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  verificationToken?: string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface StoredSession {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export async function getUsers(): Promise<StoredUser[]> {
  return readJSON<StoredUser>("users.json");
}

export async function saveUsers(users: StoredUser[]): Promise<void> {
  await writeJSON("users.json", users);
}

export async function getSessions(): Promise<StoredSession[]> {
  return readJSON<StoredSession>("sessions.json");
}

export async function saveSessions(sessions: StoredSession[]): Promise<void> {
  await writeJSON("sessions.json", sessions);
}

export async function createSession(userId: string): Promise<string> {
  const token = generateToken(48);
  const now = new Date();
  const session: StoredSession = {
    token,
    userId,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + SESSION_DURATION_MS).toISOString(),
  };
  const sessions = await getSessions();
  sessions.push(session);
  await saveSessions(sessions);
  return token;
}

export async function getSessionUser(): Promise<StoredUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const sessions = await getSessions();
  const session = sessions.find(
    (s) => s.token === token && new Date(s.expiresAt) > new Date()
  );
  if (!session) return null;

  const users = await getUsers();
  return users.find((u) => u.id === session.userId) || null;
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function deleteSession(token: string): Promise<void> {
  const sessions = await getSessions();
  const filtered = sessions.filter((s) => s.token !== token);
  await saveSessions(filtered);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
