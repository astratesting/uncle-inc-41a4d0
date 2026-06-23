import { readStore, writeStore, withStoreLock } from "@/lib/file-storage";

export interface DbUser {
  id: string;
  email: string;
  name: string;
  company: string;
  passwordHash: string;
  verifiedAt: string | null;
  createdAt: string;
}

export async function findUserByEmail(email: string): Promise<DbUser | undefined> {
  const users = await readStore<DbUser>("users");
  return users.find((u) => u.email === email.toLowerCase().trim());
}

export async function findUserById(id: string): Promise<DbUser | undefined> {
  const users = await readStore<DbUser>("users");
  return users.find((u) => u.id === id);
}

export async function createUser(data: {
  email: string;
  name: string;
  company: string;
  passwordHash: string;
}): Promise<DbUser> {
  const user: DbUser = {
    id: crypto.randomUUID(),
    email: data.email.toLowerCase().trim(),
    name: data.name,
    company: data.company,
    passwordHash: data.passwordHash,
    verifiedAt: null,
    createdAt: new Date().toISOString(),
  };

  await withStoreLock<DbUser>("users", (store) => {
    const exists = store.find((u) => u.email === user.email);
    if (exists) throw new Error("User already exists");
    return [...store, user];
  });

  return user;
}

export async function markUserVerified(email: string): Promise<void> {
  await withStoreLock<DbUser>("users", (store) => {
    return store.map((u) =>
      u.email === email.toLowerCase().trim()
        ? { ...u, verifiedAt: new Date().toISOString() }
        : u
    );
  });
}

export async function getAllUsers(): Promise<DbUser[]> {
  return readStore<DbUser>("users");
}
