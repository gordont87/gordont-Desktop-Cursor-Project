import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/** Used only when Next collects page data and DATABASE_URL is not injected yet (Railway build). */
const BUILD_PLACEHOLDER_URL =
  "postgresql://build:build@127.0.0.1:5432/build?schema=public";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL || BUILD_PLACEHOLDER_URL;

  if (connectionString.startsWith("file:")) {
    throw new Error(
      "DATABASE_URL looks like SQLite. This app now requires PostgreSQL (local Docker or Railway).",
    );
  }

  if (!process.env.DATABASE_URL) {
    console.warn(
      "[db] DATABASE_URL is unset — using a build placeholder. Set it on the Railway web service for runtime.",
    );
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

/**
 * Lazy client. Ignore thenable / React probes so `next build` does not
 * instantiate Prisma while collecting route configuration.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (
      prop === "then" ||
      prop === "catch" ||
      prop === "finally" ||
      prop === "$$typeof" ||
      prop === "constructor" ||
      prop === Symbol.toStringTag
    ) {
      return undefined;
    }
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
