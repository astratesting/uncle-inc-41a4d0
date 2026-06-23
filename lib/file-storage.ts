import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Per-file mutex to serialize concurrent writes and prevent data loss
const locks = new Map<string, Promise<void>>();

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

export async function readStore<T>(name: string): Promise<T[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(filePath(name), "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export async function writeStore<T>(name: string, data: T[]): Promise<void> {
  await ensureDir();
  const tmp = filePath(name) + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2));
  await fs.rename(tmp, filePath(name));
}

export async function appendToStore<T>(name: string, entry: T): Promise<void> {
  const previous = locks.get(name) ?? Promise.resolve();
  const current = previous.then(async () => {
    const store = await readStore<T>(name);
    store.push(entry);
    await writeStore(name, store);
  });
  locks.set(name, current);
  await current;
}

export async function withStoreLock<T>(
  name: string,
  fn: (store: T[]) => T[] | Promise<T[]>
): Promise<void> {
  const previous = locks.get(name) ?? Promise.resolve();
  const current = previous.then(async () => {
    const store = await readStore<T>(name);
    const updated = await fn(store);
    await writeStore(name, updated);
  });
  locks.set(name, current);
  await current;
}
