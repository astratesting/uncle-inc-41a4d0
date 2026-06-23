import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readJSON<T>(filename: string): Promise<T[]> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeJSON<T>(filename: string, data: T[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2)
  );
}

export async function appendJSONL(
  filename: string,
  record: Record<string, unknown>
): Promise<void> {
  await ensureDir();
  const line = JSON.stringify(record) + "\n";
  try {
    await fs.appendFile(path.join(DATA_DIR, filename), line);
  } catch {
    await fs.writeFile(path.join(DATA_DIR, filename), line);
  }
}

export async function readJSONL<T>(filename: string): Promise<T[]> {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, filename), "utf-8");
    return data
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

// --- User management ---

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface VerificationCode {
  email: string;
  code: string;
  createdAt: string;
  expiresAt: string;
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const { hashPassword } = await import("./auth");
  const users = await readJSON<User>("users.json");
  const normalizedEmail = email.toLowerCase().trim();

  if (users.find((u) => u.email === normalizedEmail)) {
    throw new Error("User already exists");
  }

  const passwordHash = await hashPassword(password);
  const user: User = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    name: name.trim(),
    passwordHash,
    emailVerified: false,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeJSON("users.json", users);
  return user;
}

export async function getUser(email: string): Promise<User | undefined> {
  const users = await readJSON<User>("users.json");
  return users.find((u) => u.email === email.toLowerCase().trim());
}

export async function verifyUser(
  email: string,
  code: string
): Promise<boolean> {
  const codes = await readJSON<VerificationCode>("verification_codes.json");
  const normalizedEmail = email.toLowerCase().trim();

  const validCode = codes.find(
    (c) =>
      c.email === normalizedEmail &&
      c.code === code &&
      new Date(c.expiresAt) > new Date()
  );

  if (!validCode) return false;

  const users = await readJSON<User>("users.json");
  const user = users.find((u) => u.email === normalizedEmail);
  if (user) {
    user.emailVerified = true;
    await writeJSON("users.json", users);
  }

  const remaining = codes.filter(
    (c) => !(c.email === normalizedEmail && c.code === code)
  );
  await writeJSON("verification_codes.json", remaining);

  return true;
}

export async function storeVerificationCode(
  email: string,
  code: string
): Promise<void> {
  const codes = await readJSON<VerificationCode>("verification_codes.json");
  const normalizedEmail = email.toLowerCase().trim();

  const filtered = codes.filter((c) => c.email !== normalizedEmail);

  filtered.push({
    email: normalizedEmail,
    code,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  });

  await writeJSON("verification_codes.json", filtered);
}

export async function getAllUsers(): Promise<User[]> {
  return readJSON<User>("users.json");
}

export async function getUserCount(): Promise<number> {
  const users = await readJSON<User>("users.json");
  return users.length;
}
