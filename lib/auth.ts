export interface DemoUser {
  id: string;
  email: string;
  name: string;
}

export const DEMO_USER: DemoUser = {
  id: "demo-user-001",
  email: "demo@demo.app",
  name: "Demo User",
};

export function createDemoSession(): string {
  return Buffer.from(JSON.stringify(DEMO_USER)).toString("base64");
}

export function verifyDemoSession(token: string): DemoUser | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const user = JSON.parse(decoded);
    if (user && user.id && user.email) {
      return user as DemoUser;
    }
    return null;
  } catch {
    return null;
  }
}
