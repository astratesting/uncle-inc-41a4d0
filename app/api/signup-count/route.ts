import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SIGNUPS_PATH = path.join(process.cwd(), "data", "signups.json");

export async function GET() {
  try {
    const data = await fs.readFile(SIGNUPS_PATH, "utf-8");
    const signups = JSON.parse(data);
    const count = signups.filter((s: { verified: boolean }) => s.verified).length;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
