"use client";

import { loginTenant, type AuthState } from "@/app/actions/tenant-auth";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Form";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";

const initial: AuthState = {};

function LoginForm() {
  const searchParams = useSearchParams();
  const justReset = searchParams.get("reset") === "1";
  const [state, action, pending] = useActionState(loginTenant, initial);

  return (
    <>
      {justReset ? (
        <p className="mb-4 text-sm text-success bg-success-soft border border-success/20 rounded-xl px-3 py-2">
          Password updated. Sign in with your new password.
        </p>
      ) : null}
      <form action={action} className="mt-6 space-y-4">
        <Field label="Email" htmlFor="email" required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue="tenant@tandtgordon.example"
          />
        </Field>
        <Field label="Password" htmlFor="password" required>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            defaultValue="TenantDemo123!"
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

      <p className="mt-3 text-center text-sm">
        <Link href="/tenants/portal/forgot-password" className="text-navy hover:underline">
          Forgot password?
        </Link>
      </p>
    </>
  );
}

export default function TenantLoginPage() {
  return (
    <div className="min-h-dvh bg-navy-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl font-bold text-white">{siteConfig.brand.shortName}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-champagne mt-1">Tenant Portal</p>
        </div>
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[var(--shadow)]">
          <h1 className="font-heading text-2xl font-semibold text-navy">Resident sign in</h1>
          <p className="mt-2 text-sm text-slate">
            View your lease, pay rent, submit maintenance, and access documents.
          </p>

          <Suspense fallback={<p className="mt-6 text-sm text-slate">Loading…</p>}>
            <LoginForm />
          </Suspense>

          <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 px-3 py-3 text-xs text-amber-950">
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-1">tenant@tandtgordon.example</p>
            <p>TenantDemo123!</p>
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
