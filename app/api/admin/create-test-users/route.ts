import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAllUsers, saveUsers, getVerifiedUserCount } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const count = Math.min(Math.max(Number(body.count) || 1, 1), 10);

    const users = getAllUsers();
    const existingTestEmails = new Set(
      users.filter(u => u.email.endsWith('@uncleinc-test.com')).map(u => u.email)
    );

    const newUsers = [];
    for (let i = 1; newUsers.length < count; i++) {
      const email = `test-user-${i}@uncleinc-test.com`;
      if (existingTestEmails.has(email)) continue;
      newUsers.push({
        id: crypto.randomUUID(),
        email,
        name: `Test User ${i}`,
        companyName: `Test Company ${i}`,
        passwordHash: crypto.randomBytes(32).toString('hex'),
        verified: true,
        verificationToken: '',
        createdAt: new Date().toISOString(),
        verifiedAt: new Date().toISOString(),
      });
    }

    users.push(...newUsers);
    saveUsers(users);

    const totalVerified = getVerifiedUserCount();

    return NextResponse.json({
      created: newUsers.length,
      totalVerified,
      target: 10,
      users: newUsers.map(u => ({ email: u.email, name: u.name })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create test users' },
      { status: 500 }
    );
  }
}
