import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// In-memory user store for demo/fallback
const users = new Map<
  string,
  { id: string; email: string; password: string; name: string }
>();

// Seed demo account
users.set("demo@demo.app", {
  id: "demo-user-001",
  email: "demo@demo.app",
  password: "demo123",
  name: "Demo User",
});

export function addUser(email: string, password: string, name: string) {
  const id = `user-${Date.now()}`;
  users.set(email, { id, email, password, name });
  return { id, email, name };
}

export function getUserByEmail(email: string) {
  return users.get(email) ?? null;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "uncle-inc-dev-secret-change-in-production",
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Hardcoded demo account — always works
        if (
          credentials.email === "demo@demo.app" &&
          credentials.password === "demo123"
        ) {
          return {
            id: "demo-user-001",
            email: "demo@demo.app",
            name: "Demo User",
          };
        }

        // Check in-memory store
        const user = users.get(credentials.email);
        if (user && user.password === credentials.password) {
          return { id: user.id, email: user.email, name: user.name };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
};
