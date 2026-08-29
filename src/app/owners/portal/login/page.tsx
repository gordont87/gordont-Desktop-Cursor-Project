"use client";

import { loginOwner, type AuthState } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Form";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { useActionState } from "react";

const initial: AuthState = {};

export default function OwnerLoginPage() {
  const [state, action, pending] = useActionState(loginOwner, initial);

  return (
    <div className="min-h-dvh bg-navy-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl font-bold text-white">{siteConfig.brand.shortName}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-champagne mt-1">Owner Portal</p>
        </div>
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[var(--shadow)]">
          <h1 className="font-heading text-2xl font-semibold text-navy">Sign in</h1>
          <p className="mt-2 text-sm text-slate">
            Access your properties, financials, maintenance, and statements.
          </p>

          <form action={action} className="mt-6 space-y-4">
            <Field label="Email" htmlFor="email" required>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue="owner@tandtgordon.example"
              />
            </Field>
            <Field label="Password" htmlFor="password" required>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                defaultValue="OwnerDemo123!"
              />
            </Field>
            {state.error ? (
              <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {state.error}
              </p>
            ) : null}
            <Button type="submit" variant="champagne" className="w-full" disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 px-3 py-3 text-xs text-amber-950">
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-1">owner@tandtgordon.example</p>
            <p>OwnerDemo123!</p>
          </div>

          <p className="mt-6 text-center text-sm text-slate">
            <Link href="/" className="text-navy hover:underline">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
