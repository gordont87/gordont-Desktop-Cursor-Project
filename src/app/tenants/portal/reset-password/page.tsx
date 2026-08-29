"use client";

import { resetTenantPasswordWithToken, type AuthState } from "@/app/actions/tenant-auth";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Form";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";

const initial: AuthState = {};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [state, action, pending] = useActionState(resetTenantPasswordWithToken, initial);

  if (!token) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          This reset link is missing or incomplete.
        </p>
        <Link href="/tenants/portal/forgot-password" className="text-sm text-navy hover:underline">
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="token" value={token} />
      <Field label="New password" htmlFor="newPassword" required hint="Min. 8 characters">
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </Field>
      <Field label="Confirm new password" htmlFor="confirmPassword" required>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </Field>
      {state.error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" variant="champagne" className="w-full" disabled={pending}>
        {pending ? "Updating…" : "Set new password"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-dvh bg-navy-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl font-bold text-white">{siteConfig.brand.shortName}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-champagne mt-1">Tenant Portal</p>
        </div>
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-[var(--shadow)]">
          <h1 className="font-heading text-2xl font-semibold text-navy">Choose a new password</h1>
          <p className="mt-2 text-sm text-slate">Enter a new password for your tenant account.</p>
          <Suspense fallback={<p className="mt-6 text-sm text-slate">Loading…</p>}>
            <ResetPasswordForm />
          </Suspense>
          <p className="mt-6 text-center text-sm text-slate">
            <Link href="/tenants/portal/login" className="text-navy hover:underline">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
