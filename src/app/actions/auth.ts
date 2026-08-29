"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  createSessionToken,
  setSessionCookie,
} from "@/lib/auth";
import { prisma } from "@/lib/db";

export type AuthState = {
  error?: string;
};

export async function loginOwner(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const owner = await prisma.owner.findUnique({ where: { email } });
  if (!owner) {
    return { error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, owner.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const token = await createSessionToken({
    ownerId: owner.id,
    email: owner.email,
    name: owner.name,
  });
  await setSessionCookie(token);
  redirect("/owners/portal");
}

export async function logoutOwner() {
  await clearSessionCookie();
  redirect("/owners/portal/login");
}
