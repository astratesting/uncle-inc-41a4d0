import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Simple in-memory user store (replaced by a real DB in production)
interface InMemoryUser {
  id: string;
  email: string;
  name: string;
  company: string;
  passwordHash: string;
}

const users: Map<string, InMemoryUser> = new Map();

export async function createUser({
  email,
  password,
  name,
  company,
}: {
  email: string;
  password: string;
  name: string;
  company: string;
}): Promise<InMemoryUser> {
  if (users.has(email)) {
    throw new Error("A user with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user: InMemoryUser = {
    id: crypto.randomUUID(),
    email,
    name,
    company,
    passwordHash,
  };

  users.set(email, user);
  return user;
}

export async function getUserByEmail(
  email: string
): Promise<InMemoryUser | undefined> {
  return users.get(email);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const user = users.get(email);
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
