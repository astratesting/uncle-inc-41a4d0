import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

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
  await fs.writeFile(filePath(name), JSON.stringify(data, null, 2));
}

export async function appendToStore<T>(name: string, entry: T): Promise<void> {
  const store = await readStore<T>(name);
  store.push(entry);
  await writeStore(name, store);
}
