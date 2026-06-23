import { promises as fs } from "fs";
import path from "path";

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
