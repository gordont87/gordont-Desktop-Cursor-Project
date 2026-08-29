import { jwtVerify } from "jose";

export const SESSION_COOKIE = "ttg_owner_session";
export const TENANT_SESSION_COOKIE = "ttg_tenant_session";

export type SessionPayload = {
  ownerId: string;
  email: string;
  name: string;
};

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

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      typeof payload.ownerId !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string"
    ) {
      return null;
    }
    return {
      ownerId: payload.ownerId,
      email: payload.email,
      name: payload.name,
    };
  } catch {
    return null;
  }
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
