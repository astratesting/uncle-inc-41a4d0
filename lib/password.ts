import crypto from "crypto";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;
const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEY_LENGTH = 64;
const PBKDF2_DIGEST = "sha512";

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export function verifyPassword(password: string, stored: string): boolean {
  // bcrypt hashes start with $2
  if (stored.startsWith("$2")) {
    return bcrypt.compareSync(password, stored);
  }

  // Legacy PBKDF2 format (salt:hash)
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const verify = crypto
    .pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEY_LENGTH, PBKDF2_DIGEST)
    .toString("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(verify, "hex")
    );
  } catch {
    return false;
  }
}

export function generateToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}
