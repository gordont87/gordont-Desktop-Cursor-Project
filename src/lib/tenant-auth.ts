import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export const TENANT_SESSION_COOKIE = "ttg_tenant_session";
const SESSION_DURATION = 60 * 60 * 24 * 7;

export type TenantSessionPayload = {
  tenantId: string;
  email: string;
  name: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function createTenantSessionToken(payload: TenantSessionPayload) {
  return new SignJWT({ ...payload, role: "tenant" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecret());
}

export async function verifyTenantSessionToken(
  token: string,
): Promise<TenantSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      typeof payload.tenantId !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }
    return {
      tenantId: payload.tenantId,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export async function setTenantSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(TENANT_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function clearTenantSessionCookie() {
  const jar = await cookies();
  jar.delete(TENANT_SESSION_COOKIE);
}

export async function getTenantSession(): Promise<TenantSessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(TENANT_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyTenantSessionToken(token);
}

export async function requireTenant() {
  const session = await getTenantSession();
  if (!session) return null;
  const tenant = await prisma.tenant.findUnique({
    where: { id: session.tenantId },
    include: {
      lease: { include: { property: true } },
    },
  });
  if (!tenant) return null;
  return { session, tenant };
}
