import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SignupRecord {
  email: string;
  name: string;
  company?: string;
  verified: boolean;
  verifiedAt?: string;
  createdAt: string;
}

function readSeedData(): SignupRecord[] {
  try {
    const seedPath = path.join(process.cwd(), 'data', 'signups.json');
    if (fs.existsSync(seedPath)) {
      const raw = fs.readFileSync(seedPath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

function readStoreData(): SignupRecord[] {
  try {
    const storePath = path.join(process.cwd(), 'data', 'store.json');
    if (fs.existsSync(storePath)) {
      const raw = fs.readFileSync(storePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

export async function GET() {
  const seedRecords = readSeedData();
  const storeRecords = readStoreData();
  
  // Merge: dedupe by email, seed records take priority
  const allEmails = new Set<string>();
  const merged: SignupRecord[] = [];
  
  // Add seed records first (priority)
  for (const r of seedRecords) {
    if (!allEmails.has(r.email.toLowerCase())) {
      allEmails.add(r.email.toLowerCase());
      merged.push(r);
    }
  }
  
  // Add store records (skip duplicates)
  for (const r of storeRecords) {
    if (!allEmails.has(r.email.toLowerCase())) {
      allEmails.add(r.email.toLowerCase());
      merged.push(r);
    }
  }
  
  const totalSignups = merged.length;
  const verifiedSignups = merged.filter(r => r.verified).length;
  
  return NextResponse.json({
    count: totalSignups,
    verified: verifiedSignups,
    target: 10
  });
}
