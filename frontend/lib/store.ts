import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { randomUUID, randomInt } from "crypto";

const DATA_DIR = join(process.cwd(), "data");
const USERS_FILE = join(DATA_DIR, "users.json");
const FEEDBACK_FILE = join(DATA_DIR, "feedback.json");

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  passwordHash: string;
  verified: boolean;
  token: string;
  verificationCode: string | null;
  verificationExpiry: string | null;
  createdAt: string;
}

export interface FeedbackEntry {
  id: string;
  userId: string;
  email: string;
  response: string;
  createdAt: string;
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readUsers(): User[] {
  ensureDataDir();
  if (!existsSync(USERS_FILE)) {
    writeFileSync(USERS_FILE, "[]");
    return [];
  }
  try {
    return JSON.parse(readFileSync(USERS_FILE, "utf-8"));
  } catch {
    writeFileSync(USERS_FILE, "[]");
    return [];
  }
}

function writeUsers(users: User[]) {
  ensureDataDir();
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function readFeedback(): FeedbackEntry[] {
  ensureDataDir();
  if (!existsSync(FEEDBACK_FILE)) {
    writeFileSync(FEEDBACK_FILE, "[]");
    return [];
  }
  try {
    return JSON.parse(readFileSync(FEEDBACK_FILE, "utf-8"));
  } catch {
    writeFileSync(FEEDBACK_FILE, "[]");
    return [];
  }
}

function writeFeedback(entries: FeedbackEntry[]) {
  ensureDataDir();
  writeFileSync(FEEDBACK_FILE, JSON.stringify(entries, null, 2));
}

export function generateVerificationCode(): string {
  return String(randomInt(100000, 999999));
}

export function createUser(
  name: string,
  email: string,
  companyName: string,
  passwordHash: string = ""
): { user: User; code: string } {
  const users = readUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error("A user with this email already exists");
  }
  const code = generateVerificationCode();
  const user: User = {
    id: randomUUID(),
    name,
    email,
    companyName,
    passwordHash,
    verified: false,
    token: randomUUID(),
    verificationCode: code,
    verificationExpiry: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return { user, code };
}

export function verifyUserByToken(token: string): User | null {
  const users = readUsers();
  const user = users.find((u) => u.token === token);
  if (!user) return null;
  user.verified = true;
  user.verificationCode = null;
  user.verificationExpiry = null;
  writeUsers(users);
  return user;
}

export function verifyUser(email: string, code: string): User | null {
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  if (user.verificationCode !== code) return null;
  if (user.verificationExpiry && new Date(user.verificationExpiry) < new Date()) return null;
  user.verified = true;
  user.verificationCode = null;
  user.verificationExpiry = null;
  writeUsers(users);
  return user;
}

export function getUserByEmail(email: string): User | null {
  const users = readUsers();
  return users.find((u) => u.email === email) || null;
}

export function getVerifiedUserByEmail(email: string): User | null {
  const users = readUsers();
  return users.find((u) => u.email === email && u.verified) || null;
}

export function getUserById(id: string): User | null {
  const users = readUsers();
  return users.find((u) => u.id === id) || null;
}

export function getUserByToken(token: string): User | null {
  const users = readUsers();
  return users.find((u) => u.token === token) || null;
}

export function getStats() {
  const users = readUsers();
  return {
    totalSignups: users.length,
    verifiedUsers: users.filter((u) => u.verified).length,
  };
}

export function getVerifiedUsers(): Omit<User, "token" | "passwordHash" | "verificationCode" | "verificationExpiry">[] {
  const users = readUsers();
  return users
    .filter((u) => u.verified)
    .map(({ token: _token, passwordHash: _ph, verificationCode: _vc, verificationExpiry: _ve, ...rest }) => rest);
}

export function addFeedback(userId: string, email: string, response: string): FeedbackEntry {
  const entries = readFeedback();
  const entry: FeedbackEntry = {
    id: randomUUID(),
    userId,
    email,
    response,
    createdAt: new Date().toISOString(),
  };
  entries.push(entry);
  writeFeedback(entries);
  return entry;
}

export function getFeedback(): FeedbackEntry[] {
  return readFeedback();
}
